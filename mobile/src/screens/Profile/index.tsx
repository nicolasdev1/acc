import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, KeyboardAvoidingView, Keyboard, ScrollView, Platform, StatusBar, Dimensions  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerBarScreenProps } from '../../@types/navigation';
import { UserProps } from '../../@types/user';

import { defaultStyles } from '../../theme/styles';
import { styles } from './styles';
import { SYS } from '../../theme';

import { MenuBar } from '../../components/MenuBar';
import { Header } from '../../components/Header';
import { AddressModal } from '../../modals/Address';

import { phoneMask } from '../../utils/masks';
import { useAuth } from '../../contexts/Auth';
import Toast from 'react-native-toast-message'
import { Loading } from '../../components/Loading';
import * as imagePicker from 'expo-image-picker'
import ProgressiveImage from './../../components/ProgressiveImage/index';

export function Profile() {
    const route = useRoute<DrawerBarScreenProps<'profile'>['route']>()
    const navigator = useNavigation<DrawerBarScreenProps<'profile'>['navigation']>()

    const { auther, updateUser } = useAuth()
    const user = auther.user

    const [avatar, setAvatar] = useState<imagePicker.ImageInfo | undefined>(user.avatar != '' ? {
        uri: user.avatar,
        width: 100,
        height: 100,
        cancelled: false
    } : undefined)
    const [userChangedDefaultAvatar, setChangedDefaultAvatar] = useState<boolean>(false)

    const [name, setName] = useState<string>(user.name)
    const [editableName, setEditableName] = useState(false)
    const [email, setEmail] = useState<string>(user.email)
    const [editableEmail, setEditableEmail] = useState(false)
    const [phone, setPhone] = useState<string>(phoneMask(user.phone))
    const [editablePhone, setEditablePhone] = useState(false)

    const [street, setStreet] = useState<string>(user.address.street)
    const [number, setNumber] = useState<number>(user.address.number)
    const [zipCode, setZipCode] = useState<string>(user.address.zipCode)
    const [city, setCity] = useState<string>(user.address.city)
    const [federativeUnit, setFederativeUnit] = useState<string>(user.address.federativeUnit)

    const [editableAddress, setEditableAddress] = useState(false)

    const [isValidating, setIsValidating] = useState(false)

    async function handleForm() {
        setIsValidating(true)
        let msg
        const emailRegex = new RegExp(/^\b[A-Z0-9._%-]+@[A-Z0-9_%-]+\.[A-Z]{2,4}\b$/i);

        (name == '') ? msg = 'Informe o seu nome' :
        (email == '') ? msg = 'Informe o seu e-mail' :
        (!emailRegex.test(email)) ? msg = 'Informe o e-mail corretamente' :
        (phone == '') ? msg = 'Informe o seu contato' :
        (email == '') ? msg = 'Informe o seu e-mail' :
        (street == '' || number == null || zipCode == '' || city == '' || federativeUnit == '' ) ? msg = 'Informe seu endereço corretamente' :
        msg = null

        if (msg == null) {
            try {
                await updateUser({name, email, phone, address: {city, federativeUnit, number, street, zipCode}, avatar, userChangedDefaultAvatar}) 
                Toast.show({
                    type: 'success',
                    text1: 'Perfil alterado com succeso!',
                    autoHide: true,
                    visibilityTime: 2500,
                })
                navigator.goBack()
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    autoHide: true,
                    visibilityTime: 2500,
                })
            }
        } else {
            Toast.show({
                type: 'error',
                text1: msg,
                visibilityTime: 2500,
                autoHide: true
            })
        }
        setIsValidating(false)
    }

    function updateAddress({ street, number, zipCode, city, federativeUnit }: UserProps['address']) {
        setStreet(street)
        setNumber(number)
        setZipCode(zipCode)
        setCity(city)
        setFederativeUnit(federativeUnit)
    }

    let openGalery = async () => {
        let imageSelected = await imagePicker.launchImageLibraryAsync()
        imageSelected.cancelled ? setAvatar(avatar) : setAvatar(imageSelected), setChangedDefaultAvatar(true)
    }

    const w = Dimensions.get('window');

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <KeyboardAvoidingView
                style={defaultStyles.background}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <MenuBar
                    left={
                        <TouchableOpacity onPress={() => navigator.goBack()}>
                            <Entypo
                                name='chevron-with-circle-left'
                                color={SYS.COLORS.WHITE}
                                size={28}
                            />
                        </TouchableOpacity>
                    }
                    right={null}
                />

                <Header title='Perfil' />

                <View style={styles.imageArea}>
                    <ProgressiveImage
                        style={styles.image}
                        thumbnailSource={avatar?.uri ? { uri: avatar?.uri } : user.gender == 'F' ? require('../../../assets/user-silhouette-female.png') : require('../../../assets/user-silhouette-male.png')}
                        source={avatar?.uri ? { uri: avatar?.uri } : user.gender == 'F' ? require('../../../assets/user-silhouette-female.png') : require('../../../assets/user-silhouette-male.png')}
                    />

                    <View style={styles.imageOptions}>
                        <TouchableOpacity style={styles.imageBtn} onPress={openGalery}>
                            <Text style={styles.imageBtnText}> {
                                avatar?.uri ? <> <Entypo name='cycle' size={20} /> Alterar </>
                                : <> <MaterialCommunityIcons name='image-search' size={20} /> Adicionar Imagem </>
                            }</Text>
                        </TouchableOpacity>

                        {
                            avatar?.uri ?
                                <TouchableOpacity style={[styles.imageBtn, {width: 48}]} onPress={() => (setAvatar(undefined), setChangedDefaultAvatar(true))}>
                                    <MaterialCommunityIcons name='delete' size={20} color={SYS.COLORS.PRIMARY}/>
                                </TouchableOpacity>
                            : null
                        }
                    </View>
                </View>

                <ScrollView style={defaultStyles.interactionArea}>
                    <View style={styles.item}>
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemText}>Nome</Text>
                            <TextInput editable={editableName} value={name} onChangeText={(val) => setName(val)} style={styles.itemTextValue} returnKeyType='next' onSubmitEditing={() => { setEditableName(!editableName), Keyboard.dismiss }} />
                        </View>
                        <TouchableOpacity onPress={() => setEditableName(!editableName)}>
                            {editableName ? <FontAwesome name='check-circle' size={20} style={styles.itemIcon} /> : <FontAwesome name='edit' size={20} style={styles.itemIcon} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemText}>Email</Text>
                            <TextInput editable={editableEmail} autoCapitalize="none" value={email} onChangeText={(val) => setEmail(val)} style={styles.itemTextValue} returnKeyType='next' onSubmitEditing={() => { setEditableEmail(!editableEmail), Keyboard.dismiss }} />
                        </View>
                        <TouchableOpacity onPress={() => setEditableEmail(!editableEmail)}>
                            {editableEmail ? <FontAwesome name='check-circle' size={20} style={styles.itemIcon} /> : <FontAwesome name='edit' size={20} style={styles.itemIcon} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemText}>Contato</Text>
                            <TextInput editable={editablePhone} value={phoneMask(phone)}
                                onChangeText={(val) => setPhone(val)} style={styles.itemTextValue}
                                returnKeyType='next' onSubmitEditing={() => { setEditablePhone(!editablePhone), Keyboard.dismiss }} />
                        </View>
                        <TouchableOpacity onPress={() => setEditablePhone(!editablePhone)} >
                            {editablePhone ? <FontAwesome name='check-circle' size={20} style={styles.itemIcon} /> : <FontAwesome name='edit' size={20} style={styles.itemIcon} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.item}>
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemText}>Endereço</Text>
                            <Text style={styles.itemTextValue}>{street}, Nº {number} - {zipCode}, {city} - {federativeUnit}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setEditableAddress(!editableAddress)} >
                            <FontAwesome name='edit' size={20} style={styles.itemIcon} />
                        </TouchableOpacity>
                    </View>

                    <AddressModal
                        visible={editableAddress}
                        address={user.address}
                        getAddressFromModal={
                            ({ street, number, zipCode, city, federativeUnit }: UserProps['address']) => updateAddress({ street, number, zipCode, city, federativeUnit })
                        }
                        closeModal={() => setEditableAddress(!editableAddress)}
                    />

                    <View>
                        <TouchableOpacity style={!isValidating ? defaultStyles.finishButton : [defaultStyles.finishButton, { backgroundColor: SYS.COLORS.GRAY }]} disabled={isValidating} onPress={() => handleForm()}>
                            {isValidating ? <Loading /> : <Text style={defaultStyles.finishButtonText}>Salvar</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}