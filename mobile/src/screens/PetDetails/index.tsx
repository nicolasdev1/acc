import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { SYS } from '../../theme';
import { styles } from './styles';
import { FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { MenuBar } from '../../components/MenuBar';
import { RootStackScreenProps } from '../../@types/navigation';
import moment from 'moment'
import { convertMonthsToYears } from '../../utils/default';
import { useAuth } from '../../contexts/Auth';
import { petService } from '../../services/petService';

import Toast from 'react-native-toast-message'
import { Loading } from '../../components/Loading'

import Constants from 'expo-constants';
import { usePet } from '../../contexts/Pet';
import {defaultStyles} from './../../theme/styles';
import ProgressiveImage from '../../components/ProgressiveImage';

export function PetDetails() {
    const route = useRoute<RootStackScreenProps<'petdetails'>['route']>()
    const navigator = useNavigation<RootStackScreenProps<'petdetails'>['navigation']>()

    const { pet, favorited } = route.params
    const [favorite, setFavorite] = useState<boolean>(favorited)

    const { addFavorite, removeFavorite, favoritedPets } = usePet()
    const { auther } = useAuth()
    const [isValidating, setIsValidating] = useState(false)

    console.log('PET_DETAILS > pet.interested_users:', pet.interested_users)
    const visitRequested = pet.interested_users.some(_id => _id === auther.user._id)

    async function handleFavorite() {
        !favorite == true ? addFavorite(pet._id) : removeFavorite(pet._id)
        await setFavorite(!favorite)
    }

    function handleOpenOwner() {
        auther.user._id == pet.owner._id ? navigator.navigate('profiledrawer') : navigator.navigate('ownerdetails', {owner: pet.owner})
    }

    useEffect(() => {
        setFavorite(favoritedPets.includes(pet._id))
    }, [favorited, favoritedPets])

    async function handlePet() {
        setIsValidating(true)
        if (auther.user._id == pet.owner._id) {
            try {
                await petService.removePet(pet._id)
                Toast.show({
                    type: 'success',
                    text1: 'Pet removido com sucesso',
                    autoHide: true,
                    visibilityTime: 2500
                })
                navigator.goBack()
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    autoHide: true,
                    visibilityTime: 2500
                })
            }
        }

        if (auther.user._id != pet.owner._id) {
            try {
                await petService.requestPetVisit(pet._id)
                Toast.show({
                    type: 'success',
                    text1: 'Solicitação enviada com sucesso',
                    autoHide: true,
                    visibilityTime: 2500
                })
                navigator.goBack()
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    autoHide: true,
                    visibilityTime: 2500
                })
            }
        }

        setIsValidating(false)
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={[defaultStyles.background, {backgroundColor: SYS.COLORS.LIGHTGRAY}]}>
                <TouchableOpacity style={styles.customMenuBar} onPress={() => navigator.goBack()}>
                    <FontAwesome5
                        name='arrow-circle-left'
                        color={pet.images[0] ? SYS.COLORS.LIGHTGRAY : SYS.COLORS.DARK}
                        size={34}
                    />
                </TouchableOpacity>

                <View style={styles.petContainer}>
                    <ProgressiveImage source={pet.images[0] ? { uri: pet.images[0] } : require('../../../assets/pet-silhouette.png')} style={pet.images[0] ? styles.petImage : [styles.petImage, {resizeMode: 'contain'}]} />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.petDetails}>
                        <View style={[styles.petDetailsColumn, { alignItems: 'flex-start' }]}>
                            <Text style={[styles.petDetailsText, styles.petName]}>{pet.name}</Text>
                            <Text style={styles.petDetailsText}>{pet.breed}</Text>
                        </View>
                        <View style={[styles.petDetailsColumn, { alignItems: 'flex-end' }]}>
                            <Foundation
                                name={pet.gender == 'M' ? 'male-symbol' : 'female-symbol'}
                                color={pet.gender == 'M' ? '#54B0DC' : '#F78B8B'}
                                size={40}
                            />
                            <Text style={styles.petDetailsText}>{convertMonthsToYears(pet.age)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.ownerContainer} onPress={handleOpenOwner}>
                        <ProgressiveImage style={styles.ownerImage} source={ pet.owner.avatar ? {uri: pet.owner.avatar} : require('../../../assets/user-silhouette-male.png')} />

                        <View style={styles.ownerDetails}>
                            <Text style={[styles.ownerText, { fontSize: SYS.FONT_SIZE.BD, fontFamily: SYS.FONT_FAMILY.BD }]}> {pet.owner.name} </Text>
                            <Text style={styles.ownerText}>
                                <Ionicons size={14} color={SYS.COLORS.PRIMARY} name='location-sharp' /> {pet.owner.address.city} - {pet.owner.address.federativeUnit}
                            </Text>
                            <Text style={styles.ownerText}>
                                <><Ionicons size={14} color={SYS.COLORS.PRIMARY} name='time-sharp' /> {moment(pet.updatedAt).format("L")} - {moment(pet.updatedAt).format('LTS')}</>
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>
                            {pet.description}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity disabled={isValidating} onPress={handleFavorite}>
                            <MaterialCommunityIcons
                                name={'heart-box'}
                                color={isValidating ? SYS.COLORS.GRAY : favorite ? '#FF6969' : SYS.COLORS.PRIMARY}
                                size={68}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={(!isValidating && !visitRequested) ? pet.owner._id == auther.user._id ? [styles.button, {backgroundColor: SYS.COLORS.ERROR}] : styles.button : [styles.button, {backgroundColor: SYS.COLORS.GRAY}]} disabled={isValidating || visitRequested} onPress={handlePet}>
                            <Text style={styles.buttonText}>
                                {isValidating ? <Loading /> :
                                pet.owner._id == auther.user._id ? <><MaterialCommunityIcons name='delete' size={20} /> Remover</> : visitRequested ? 'Solicitado' : 'Solicitar visita'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}