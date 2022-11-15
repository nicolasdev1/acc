import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerBarScreenProps } from '../../@types/navigation';
import * as imagePicker from 'expo-image-picker'

import { Header } from '../../components/Header';
import { Select } from '../../components/Form/SelectList';
import { FloatingInput } from '../../components/Form/FloatingInput';
import { MenuBar } from '../../components/MenuBar';

import { styles } from './styles';
import { SYS } from '../../theme';
import { defaultStyles } from '../../theme/styles';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { genders } from '../../static/genders';
import { Controller, useForm} from 'react-hook-form'
import { PetProps } from './../../@types/pet.d';
import { petService } from '../../services/petService';
import { Loading } from '../../components/Loading';
import Toast from 'react-native-toast-message';
import ProgressiveImage from '../../components/ProgressiveImage';

export function PetForm() {
    const route = useRoute<DrawerBarScreenProps<'petform'>['route']>()
    const navigator = useNavigation<DrawerBarScreenProps<'petform'>['navigation']>()

    const [image, setImage] = useState<imagePicker.ImageInfo>()

    const { control, handleSubmit, formState: {errors}, reset, setValue} = useForm<PetProps>()
    const [isValidating, setIsValidating] = useState(false)

    async function handleForm(data: PetProps) {
        setIsValidating(true)
        const {age, breed, description, gender, name } = data
        let status = 'adoption'

        try {
            await petService.createPet({age, breed, description, gender, image, name, status})
            Toast.show({
                type: 'success',
                text1: 'Pet criado com sucesso!',
                autoHide: true,
                visibilityTime: 2500,
            })
            reset() //Limpa o state do controller
            setImage(undefined)
            setValue('gender', '')

            navigator.goBack()
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: error.message,
                autoHide: true,
                visibilityTime: 2500,
            })
        }
        setIsValidating(false)
    }

    let openGalery = async () => {
        let imageSelected = await imagePicker.launchImageLibraryAsync()
        setImage(imageSelected.cancelled ? undefined : imageSelected)
    }

    return (
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

            <Header title='Adicionar Pet' />

            <View style={defaultStyles.interactionArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                        <ProgressiveImage
                            style={styles.petImage}
                            source={
                                image ? { uri: image.uri } :
                                    require('../../../assets/pet-silhouette.png')
                            }
                        />
                    </View>

                    <View style={styles.avatarOptionsContainer}>
                        <TouchableOpacity style={[defaultStyles.finishButton, { flex: 1, marginHorizontal: '2%' }]} onPress={openGalery}>
                            <Text style={defaultStyles.finishButtonText}> {
                                image ?
                                    <> <Entypo name='cycle' size={20} /> Alterar </> :
                                    <> <MaterialCommunityIcons name='image-search' size={20} /> Selecionar Imagem </>
                            } </Text>
                        </TouchableOpacity>

                        {
                            image ?
                                <TouchableOpacity style={[defaultStyles.finishButton, { flex: 1, marginHorizontal: '2%' }]} onPress={() => setImage(undefined)}>
                                    <Text style={defaultStyles.finishButtonText}>
                                        <MaterialCommunityIcons name='delete' size={20} /> Remover
                                    </Text>
                                </TouchableOpacity>
                                : null
                        }
                    </View>


                    <Controller
                        control={control}
                        name='name'
                        rules={{required: "Informe o nome"}}
                        render={({field: {value, onChange}}) => (
                            <FloatingInput label='Nome' type='string' value={value} onChange={onChange} errors={errors.name}/>
                        )}
                    />

                    <Controller
                        control={control}
                        name='gender'
                        rules={{ required: "Informe o sexo" }}
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

                    <Controller
                        control={control}
                        name='age'
                        rules={{
                            required: "Informe a idade",
                            pattern: {
                                value: /^\d+$/,
                                message: "Idade deve conter somente números"
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <FloatingInput label='Idade (meses)' type='numeric' value={value} onChange={onChange} errors={errors.age}/>
                        )}
                    />

                    <Controller
                        control={control}
                        name='breed'
                        rules={{required: "Informe a raça do pet"}}
                        render={({field: {value, onChange}}) => (
                            <FloatingInput label='Raça' type='string' value={value} onChange={onChange} errors={errors.breed}/>
                        )}
                    />

                    <Controller
                        control={control}
                        name='description'
                        rules={{required: "Por favor, descreva o seu pet"}}
                        render={({field: {value, onChange}}) => (
                            <FloatingInput label='Descrição' type='string' value={value} onChange={onChange} errors={errors.description}/>
                        )}
                    />

                    <TouchableOpacity style={!isValidating ? defaultStyles.finishButton : [defaultStyles.finishButton, { backgroundColor: SYS.COLORS.GRAY }]} disabled={isValidating} onPress={handleSubmit(handleForm)}>
                        {isValidating ? <Loading /> : <Text style={defaultStyles.finishButtonText}>Finalizar</Text>}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}