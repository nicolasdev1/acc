import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useForm, Controller} from 'react-hook-form'

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { SYS } from '../../theme';
import { styles } from './styles';
import { defaultStyles } from '../../theme/styles';

import { FloatingInput } from '../../components/Form/FloatingInput';
import { Select } from '../../components/Form/SelectList'
import { Header } from '../../components/Header';
import { MenuBar } from '../../components/MenuBar';

import { genders } from '../../static/genders'
import { RootStackScreenProps } from '../../@types/navigation';
import { UserProps } from '../../@types/user'
import { useAuth } from '../../contexts/Auth';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker'
import { Loading } from '../../components/Loading';
import ProgressiveImage from '../../components/ProgressiveImage';

export function Register() {
    const route = useRoute<RootStackScreenProps<'register'>['route']>();
    const navigation = useNavigation<RootStackScreenProps<'register'>['navigation']>();

    const { register } = useAuth()

    const {control, handleSubmit, watch, setValue, formState: {errors}} = useForm<UserProps>()
    
    
    const [federativeUnit, setFederativeUnit] = useState<string>('')
    const [federativeUnits, setFederativeUnits] = useState<[]>([])
    const [showCities, setShowCities] = useState<Boolean>(false)
    const [cities, setCities] = useState<[]>([])
    const [avatar, setAvatar] = useState<ImagePicker.ImageInfo>()
    
    const [showAddressForm, setShowAddressForm] = useState<Boolean>(false)
    const [isValidating, setIsValidating] = useState(false)

    async function openGalery() {
        let selectedImage = await ImagePicker.launchImageLibraryAsync()
        selectedImage.cancelled ? setAvatar(undefined) : setAvatar(selectedImage)
    }

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then((response) => {
                let data = response.data.map((item: { id: number | string, sigla: string }) => {
                    return { key: item.sigla, value: item.sigla }
                })
                setFederativeUnits(data)
            }).catch((error) => {
                setFederativeUnits([])
            })
    }, [])

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${federativeUnit}/municipios?orderby=nome`)
            .then((response) => {
                let data = response.data.map((item: { id: number | string, nome: string }) => {
                    return { key: item.nome, value: item.nome }
                })
                setCities(data)
            }).catch((error) => {
                setCities([])
            })
    }, [federativeUnit])

    function handleGoBack() {
        showAddressForm ? setShowAddressForm(false) : navigation.navigate('login')
    }

    async function handleForm(data: UserProps) {
        setIsValidating(true)
        if (Object.keys(errors).length === 0) {
            if (!showAddressForm) {
                setShowAddressForm(true)
            } else {
                const {name, email, password, cpfCnpj, gender, birthday, phone, address} = data
                await register({ name, email, password, cpfCnpj, gender, birthday, phone, address, avatar })
            }
        } else {
            return false
        }
        setIsValidating(false)
    }

    return (
        <KeyboardAvoidingView
            style={defaultStyles.background}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <MenuBar
                left={
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name='chevron-with-circle-left'
                            color={SYS.COLORS.WHITE}
                            size={28}
                        />
                    </TouchableOpacity>
                }
                right={null}
            />

            <View>
                <Header title='Cadastre-se' />
                <Image style={defaultStyles.headerDog} source={require('../../../assets/login/dog.png')} />
            </View>

            <View style={[defaultStyles.interactionArea, {
                borderTopWidth: 4,
                borderColor: '#683931',
            }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        !showAddressForm &&
                        <>
                            <Header title='Informações Pessoais'
                                colorHex={SYS.COLORS.PRIMARY}
                                style={{ paddingVertical: '2.5%' }}
                            />

                            <View style={styles.imageContainer}>
                                <ProgressiveImage
                                    style={styles.userImage}
                                    source={
                                        avatar ? { uri: avatar.uri } :
                                            require('../../../assets/user-silhouette-male.png')
                                    }
                                />
                            </View>

                            <View style={styles.avatarOptionsContainer}>
                                <TouchableOpacity style={[defaultStyles.finishButton, { flex: 1, marginHorizontal: '2%' }]} onPress={openGalery}>
                                    <Text style={defaultStyles.finishButtonText}> {
                                        avatar ?
                                            <> <Entypo name='cycle' size={20} /> Alterar </> :
                                            <> <MaterialCommunityIcons name='image-search' size={20} /> Selecionar Imagem </>
                                    } </Text>
                                </TouchableOpacity>

                                {
                                    avatar ?
                                        <TouchableOpacity style={[defaultStyles.finishButton, { flex: 1, marginHorizontal: '2%' }]} onPress={() => setAvatar(undefined)}>
                                            <Text style={defaultStyles.finishButtonText}>
                                                <MaterialCommunityIcons name='delete' size={20} /> Remover
                                            </Text>
                                        </TouchableOpacity>
                                        : null
                                }
                            </View>

                            <Controller
                                control={control}
                                name='userType'
                                defaultValue='user'
                                rules={{ required: "Você é uma ONG ou pessoa?"}}
                                render={({field: {value, onChange}}) => (
                                    <Select 
                                        placeholder='Perfil de usuário'
                                        setSelected={onChange}
                                        data={[
                                            { key: 'user', value: 'Usuário'},
                                            { key: 'ong', value: 'Ong'}
                                        ]}
                                        search={false}
                                        errors={errors.userType}
                                        handleSelect={
                                            () => (setValue('cpfCnpj', ''), setValue('birthday', ''), setValue('gender', ''))
                                        }
                                    />
                                )}
                            />
                            
                            <Controller
                                control={control}
                                name='name'
                                rules={{ required: "Informe seu nome" }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='Nome' type={'string'} value={value} onChange={onChange} errors={errors.name} />
                                )}
                            />

                            <Controller
                                control={control}
                                name='email'
                                rules={{
                                    required: "Informe seu e-mail",
                                    pattern: {
                                        message: "Informe o e-mail corretamente",
                                        value: /^\b[A-Z0-9._%-]+@[A-Z0-9_%-]+\.[A-Z]{2,4}\b$/i 
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='E-mail' type={'email-address'} value={value} onChange={onChange} errors={errors.email} />
                                )}
                            />
                            
                            <Controller
                                control={control}
                                name='password'
                                rules={{ required: "Informe sua senha" }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='Senha' type={'password'} value={value} onChange={onChange} errors={errors.password} secureTextEntry />
                                )}
                            />

                            <Controller
                                control={control}
                                name='phone'
                                rules={{ required: "Informe seu celular" }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='Celular' type={'numeric'} value={value} onChange={onChange} errors={errors.phone} mask={'(99) 99999-9999'}/>
                                )}
                            />

                            {
                                watch('userType') == 'user' ?    
                                    <Controller
                                        control={control}
                                        name='birthday'
                                        rules={{ required: "Informe sua data de nascimento" }}
                                        render={({field: {value, onChange}}) => (
                                            <FloatingInput label='Data de nascimento' type={'numeric'} value={value} onChange={onChange} errors={errors.birthday} mask={'99/99/9999'}/>
                                        )}
                                    />
                                : null
                            }

                            <Controller
                                control={control}
                                name='cpfCnpj'
                                rules={{ required: watch('userType') == 'user' ? "Informe o CPF" : 'Informe o CNPJ'}}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label={watch('userType') == 'user' ? 'CPF' : 'CNPJ'} type={'numeric'} value={value} onChange={onChange} errors={errors.cpfCnpj} mask={watch('userType') == 'user' ? '999.999.999/99' : '99.999.999/9999-99'}/>
                                )}
                            />

                            {
                                watch('userType') == 'user' ?  
                                    <Controller
                                        control={control}
                                        name='gender'
                                        rules={{ required: "Informe seu sexo" }}
                                        render={({field: {value, onChange}}) => (
                                            <Select
                                                placeholder='Sexo'
                                                setSelected={onChange}
                                                data={genders}
                                                search={false}
                                                errors={errors.gender}
                                            />
                                        )}
                                    />
                                : null
                            }

                            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleForm)}>
                                <Text style={styles.buttonText}>Avançar</Text>
                            </TouchableOpacity>
                        </>
                    }

                    {
                        showAddressForm &&
                        <>
                            <Header title='Endereço'
                                colorHex={SYS.COLORS.PRIMARY}
                                style={{ paddingVertical: '2.5%' }}
                            />

                            <Controller
                                control={control}
                                name='address.street'
                                rules={{ required: "Informe o logradouro" }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='Logradouro' type={'string'} value={value} onChange={onChange} errors={errors.address?.street} />
                                )}
                            />

                            <Controller
                                control={control}
                                name='address.number'
                                rules={{ required: "Informe o número" }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='Nº' type={'numeric'} value={value} onChange={onChange} errors={errors.address?.number} />
                                )}
                            />

                            <Controller
                                control={control}
                                name='address.zipCode'
                                rules={{ required: "Informe o CEP" }}
                                render={({field: {value, onChange}}) => (
                                    <FloatingInput label='CEP' type={'numeric'} value={value} onChange={onChange} errors={errors.address?.zipCode} mask={'99999-999'}/>
                                )}
                            />

                            <Controller
                                control={control}
                                name='address.federativeUnit'
                                rules={{ required: 'Informe seu estado'}}
                                render={({field: {value, onChange}}) => (
                                    <Select
                                        placeholder={'Estado'}
                                        setSelected={onChange}
                                        data={federativeUnits}
                                        search={false}
                                        errors={errors.address?.federativeUnit}
                                        handleSelect={() => {
                                            setFederativeUnit(value), setShowCities(true)
                                        }}
                                    />
                                )}
                            />

                            {showCities && cities.length > 0 &&

                                <Controller
                                    control={control}
                                    name='address.city'
                                    rules={{ required: 'Informe sua cidade'}}
                                    render={({field: {value, onChange}}) => (
                                        <Select
                                            placeholder={'Cidade'}
                                            setSelected={onChange}
                                            data={cities}
                                            search={true}
                                            errors={errors.address?.city}
                                        />
                                    )}
                                />
                                
                            }

                            <TouchableOpacity style={!isValidating ? defaultStyles.finishButton : [defaultStyles.finishButton, { backgroundColor: SYS.COLORS.GRAY }]} disabled={isValidating} onPress={handleSubmit(handleForm)}>
                                {isValidating ? <Loading /> : <Text style={defaultStyles.finishButtonText}>Finalizar</Text>}
                            </TouchableOpacity>
                        </>
                    }
                </ScrollView>
            </View>

            <Toast
                position='top'
                topOffset={40}
            />
        </KeyboardAvoidingView>
    );
}