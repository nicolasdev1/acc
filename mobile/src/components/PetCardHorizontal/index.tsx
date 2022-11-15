import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

import { PetCardProps } from '../../@types/navigation';
import { pets } from '../../static/pets';
import { Entypo, Foundation } from '@expo/vector-icons';
import { SYS } from '../../theme';
import { convertMonthsToYears } from '../../utils/default';
import { usePet } from '../../contexts/Pet';
import ProgressiveImage from '../ProgressiveImage';

export function PetCardHorizontal({ pet, favorited, ...rest }: PetCardProps) {
    const navigator = useNavigation()
    const { addFavorite, removeFavorite } = usePet()
    const [favorite, setFavorite] = useState<boolean>(favorited)

    async function handleFavorite() {
        !favorite == true ? addFavorite(pet._id) : removeFavorite(pet._id)
        await setFavorite(!favorite)
    }

    function openPetDetails() {
        navigator.navigate('petdetails', { pet, favorited: favorite })
    }

    useEffect(() => {
        setFavorite(favorited)
    }, [favorited, pet])

    return (
        <TouchableOpacity style={styles.container} onPress={openPetDetails} {...rest}>
            <View style={styles.imageContainer}>
                <ProgressiveImage style={styles.image} source={pet.images[0] ? { uri: pet.images[0] } : require('../../../assets/pet-silhouette.png')} />
            </View>

            <View style={styles.details}>
                <View>
                    <Text style={[styles.detailsText, { fontFamily: SYS.FONT_FAMILY.BD, fontSize: SYS.FONT_SIZE.BD }]}>{pet.name}</Text>
                    <Text style={styles.detailsText}>{pet.breed}</Text>
                </View>
                <Text style={styles.detailsText}>{convertMonthsToYears(pet.age)}</Text>
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
        </TouchableOpacity>
    );
}