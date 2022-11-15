import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { useEffect } from 'react';

export interface PetContextProps {
    favoritedPets: string[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    removeAllFavs: () => void;
}

export const PetContext = React.createContext<PetContextProps>(
    {} as PetContextProps
)

export const PetProvider: React.FC = ({ children }: any) => {
    const [favoritedPets, setFavorites] = React.useState<string[]>([])
    
    const callbackTime = 2500

    useEffect(() => {
        loadFromStorage()
    }, [])
    
    async function loadFromStorage() {
        let data = await AsyncStorage.getItem('@FavoritedPets')
        data ? setFavorites(JSON.parse(data) as PetContextProps['favoritedPets']) : null
        console.log('LOADED FAVS =>', data)
    }

    async function addFavorite(id: string) {
        let favoritedIds: PetContextProps['favoritedPets'] = []
        let data = await AsyncStorage.getItem('@FavoritedPets')
        data ? favoritedIds = JSON.parse(data) as PetContextProps['favoritedPets'] : null

        console.log(`adding ${id}`)
        !favoritedIds.includes(id) ? favoritedIds.push(id) : null
        AsyncStorage.setItem('@FavoritedPets', JSON.stringify(favoritedIds))
        await setFavorites(favoritedIds)
    }

    async function removeFavorite(id: string) {
        let favoritedIds: PetContextProps['favoritedPets'] = []
        let data = await AsyncStorage.getItem('@FavoritedPets')
        data ? favoritedIds = JSON.parse(data) as PetContextProps['favoritedPets'] : null

        console.log(`removing ${id}`)
        favoritedIds.includes(id) ? favoritedIds.splice(favoritedIds.indexOf(id), 1) : null
        AsyncStorage.setItem('@FavoritedPets', JSON.stringify(favoritedIds))
        await setFavorites(favoritedIds)
    }

    async function removeAllFavs() {
        await AsyncStorage.removeItem('@FavoritedPets')
        setFavorites([])

        console.log('Pets favoritos removidos após logout')
        return
    }

    return (
        <PetContext.Provider value={{ favoritedPets, addFavorite, removeFavorite, removeAllFavs }}>
            {children}
        </PetContext.Provider>
    )
}

export function usePet() {
    const context = React.useContext(PetContext)

    return context
}