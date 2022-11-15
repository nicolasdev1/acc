import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Foundation, Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { SYS } from '../../theme';
import { PetCardProps } from '../../@types/navigation';
import { convertMonthsToYears } from '../../utils/default';
import { usePet } from '../../contexts/Pet';
import { useEffect } from 'react';
import ProgressiveImage from '../ProgressiveImage';

export function PetCard({pet, favorited, path,...rest }: PetCardProps) {
    const navigator = useNavigation()
    const { addFavorite, removeFavorite } = usePet()

    const [favorite, setFavorite] = useState<boolean>(favorited)

    async function handleFavorite() {
        !favorite == true ? addFavorite(pet._id) : removeFavorite(pet._id)
        await setFavorite(!favorite)
    }

    useEffect(() => {
        setFavorite(favorited)
    }, [favorited, pet])

    function openPetDetails() {
        path == 'solicitationdetail' ?
        navigator.navigate('solicitationdetail', {pet}) :
        navigator.navigate('petdetails', {pet, favorited: favorite})
    }

    return (
        <TouchableOpacity style={styles.container} onPress={openPetDetails} {...rest}>
            <View>
                <ProgressiveImage style={styles.image} source={pet.images[0] ? { uri: pet.images[0] } : require('../../../assets/pet-silhouette.png')} />
            </View>

            <View style={styles.info}>
                <View style={styles.petDetails}>
                    <Text
                        style={[styles.petDetailsText, {
                            fontSize: SYS.FONT_SIZE.BD,
                            fontFamily: SYS.FONT_FAMILY.BD,
                        }]}
                    >
                        {pet.name}
                    </Text>
                    <Text style={styles.petDetailsText}>{pet.breed}</Text>
                    <Text style={styles.petDetailsText}>{convertMonthsToYears(pet.age)}</Text>
                </View>

                <View style={styles.petConfig}>
                    <Foundation
                        name={pet.gender == 'M' ? 'male-symbol' : 'female-symbol'}
                        color={pet.gender == 'M' ? '#54B0DC' : '#F78B8B'}
                        size={20}
                    />

                    <TouchableOpacity onPress={handleFavorite}>
                        <Entypo
                            name={favorite ? 'heart' : 'heart-outlined'}
                            color={favorite ? '#FF6969' : SYS.COLORS.GRAY}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}