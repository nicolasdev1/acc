import * as React from "react";
import Toast from 'react-native-toast-message'
import { authService } from "../services/auth";

import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserProps } from "../@types/user";
import { ImageInfo } from "expo-image-picker";
import { httpService } from "../services/httpService";
import { userService } from "../services/userService";
import { usePet } from "./Pet";

export interface AuthData {
    token: string;
    user: UserProps;
}

interface updateUserProps {
    name: UserProps['name'],
    email: UserProps['email'],
    phone: UserProps['phone'],
    address: UserProps['address'],
    avatar: UserProps['avatar'],
    userChangedDefaultAvatar: boolean
}
export interface AuthContextProps {
    isLoading: boolean;
    hasSeenWelcomeScreen: boolean;
    hasSeenFunction: () => void;
    auther: AuthData;
    signIn: (email: string, password: string) => Promise<void>;
    register: (props: UserProps) => Promise<void>;
    signOut: () => Promise<void>;
    updateUserAvatar: (avatar: ImageInfo | undefined) => void;
    updateUser: (props: updateUserProps) => void;
}

export const AuthContext = React.createContext<AuthContextProps>(
    {} as AuthContextProps
);

export const AuthProvider: React.FC = ({ children }: any) => {
    const [auther, setAuther] = React.useState<AuthData | any>()
    const [isLoading, setLoading] = React.useState(true)
    const [hasSeenWelcomeScreen, setWelcomeScreenBool] = React.useState<boolean>(false)

    const callbackTime = 2500

    React.useEffect(() => {
        setTimeout(() => loadFromStorage(), 1500)
    }, [])

    async function loadFromStorage() {
        const hasSeenWelcomeScreen = await AsyncStorage.getItem('@WelcomeBool')
        hasSeenWelcomeScreen == 'true' ? setWelcomeScreenBool(true) : setWelcomeScreenBool(false)

        const auth = await AsyncStorage.getItem('@AuthData')
        auth ? setAuther(JSON.parse(auth) as AuthData) : null

        setLoading(false)
    }

    async function hasSeenFunction() {
        await AsyncStorage.setItem('@WelcomeBool', 'true')
        await setWelcomeScreenBool(true)
    }

    async function signIn(email: string, password: string) {
        try {
            const authSuccess = await authService.login(email, password)
            Toast.show({
                type: 'success',
                text1: 'Bem vindo!',
                autoHide: true,
                visibilityTime: callbackTime,
            })
            await AsyncStorage.setItem('@AuthData', JSON.stringify(authSuccess))
            setAuther(authSuccess)
        } catch (error: any) {
            const msg = error.message
            Toast.show({
                type: 'info',
                text1: 'Oops..',
                text2: msg,
                autoHide: true,
                visibilityTime: callbackTime,
            })
        }
    }

    async function register({ name, email, password, cpfCnpj, gender, birthday, phone, address, avatar }: UserProps) {
        try {
            const createdUser = await authService.register({ name, email, password, cpfCnpj, gender, birthday, phone, address, avatar })
            Toast.show({
                type: 'success',
                text1: 'Sucesso, seja bem vindo!',
                autoHide: true,
                visibilityTime: callbackTime,
            })
            await AsyncStorage.setItem('@AuthData', JSON.stringify(createdUser))
            setAuther(createdUser)
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.message,
                autoHide: true,
                visibilityTime: callbackTime,
            })
        }
    }

    async function signOut(): Promise<void> {
        await AsyncStorage.removeItem('@AuthData')
        setAuther(undefined)
        return
    }

    async function updateUserAvatar(avatar: ImageInfo | undefined) {
        try {
            const { newUri } = await userService.updateAvatar(avatar)

            const auth = await AsyncStorage.getItem('@AuthData')
            if (auth) {
                let userData = JSON.parse(auth) as AuthData
                userData.user.avatar = newUri
                await AsyncStorage.setItem('@AuthData', JSON.stringify(userData))
                await setAuther(userData)
            }
        } catch (error: any) {
            Toast.show({
                type: 'info',
                text1: 'Oops..',
                text2: error.message,
                autoHide: true,
                visibilityTime: 2500,
            })
        }
    }

    async function updateUser(props: updateUserProps) {
        const auth = await AsyncStorage.getItem('@AuthData')

        if (auth) {
            let userData = JSON.parse(auth) as AuthData
            
            const { name, email, phone, address, avatar, userChangedDefaultAvatar } = props

            return new Promise((resolve, reject) => {
                const form = new FormData()
                form.append('name', name)
                form.append('email', email)
                form.append('phone', phone)
                form.append('address[city]', address.city)
                form.append('address[federativeUnit]', address.federativeUnit)
                form.append('address[number]', address.number)
                form.append('address[street]', address.street)
                form.append('address[zipCode]', address.zipCode)
                avatar != undefined && userChangedDefaultAvatar ?
                    form.append('avatar', {
                        name: avatar?.fileName ? avatar.fileName + '_user.jpg' : "_user.jpg",
                        uri: avatar?.uri,
                        type: 'image/jpg'
                    })
                : null
                
                const config = { headers: { Authorization: `Bearer ${userData.token}`, 'Content-Type': 'multipart/form-data' } }
        
                httpService.put('/users/', form, config
                ).then((response) => {
                    resolve({
                        user: response.data,
                        token: userData.token
                    })

                    userData.user.name = response.data.name
                    userData.user.email = response.data.email
                    userData.user.phone = response.data.phone
                    userData.user.address = response.data.address
                    userData.user.avatar = response.data.avatar
                    AsyncStorage.setItem('@AuthData', JSON.stringify(userData))
                    setAuther(userData)
                }).catch((error) => {
                    reject(new Error('Desculpe, não foi possível atualizar seu usuário'))
                    console.log('updateUser error:')
                    console.log(error)
                })
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoading, hasSeenWelcomeScreen, hasSeenFunction, auther, signIn, register, signOut, updateUserAvatar, updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)

    return context
}