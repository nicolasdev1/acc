import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import axios from "axios";

import { styles } from "../../screens/Profile/styles";
import { modalStyles } from './styles'
import { defaultStyles } from "../../theme/styles";
import { SYS } from "../../theme";

import { Entypo } from '@expo/vector-icons';
import { Select } from "../../components/Form/SelectList";
import { UserProps } from '../../@types/user';

interface AddressModalProps {
    getAddressFromModal: ({ street, number, zipCode, city, federativeUnit }: UserProps['address']) => void;
    closeModal: () => void;
    visible: boolean;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
        federativeUnit: string;
    }
}

export function AddressModal({ getAddressFromModal, closeModal, address, ...rest }: AddressModalProps) {
    const [federativeUnit, setFederativeUnit] = useState<string>(address.federativeUnit)
    const [federativeUnits, setFederativeUnits] = useState<[]>([])
    const [city, setCity] = useState<string>(address.city)
    const [cities, setCities] = useState<[]>([])

    const [street, setStreet] = useState<string>(address.street)
    const [number, setNumber] = useState<number>(address.number)
    const [zipCode, setZipCode] = useState<string>(address.zipCode)

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
                setCity('')
            }).catch((error) => {
                setCities([])
            })
    }, [federativeUnit])

    useEffect(() => {
        setTimeout(() => {setCity(address.city)}, 500);
    }, [])

    function handleFormAddress() {
        getAddressFromModal({ street, number, zipCode, city, federativeUnit })
        closeModal();
    }

    return (
        <Modal
            {...rest}
            transparent
            statusBarTranslucent
            animationType="fade"
        >
            <View style={modalStyles.container}>
                <View style={modalStyles.content}>
                    <TouchableOpacity onPress={closeModal} style={modalStyles.btn}>
                        <Entypo
                            name='chevron-with-circle-left'
                            color={SYS.COLORS.PRIMARY}
                            size={28}
                        />
                    </TouchableOpacity>

                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.item}>
                            <View style={styles.itemDetail}>
                                <Text style={styles.itemText}>Logradouro</Text>
                                <TextInput style={styles.itemTextValue} onChangeText={(val) => setStreet(val)}>{street}</TextInput>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <View style={styles.itemDetail}>
                                <Text style={styles.itemText}>Número</Text>
                                <TextInput
                                    style={styles.itemTextValue}
                                    keyboardType={'numeric'}
                                    onChangeText={(val) => (val == '' ? setNumber(null) : setNumber(parseInt(val)))}>
                                    {number}
                                </TextInput>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <View style={styles.itemDetail}>
                                <Text style={styles.itemText}>CEP</Text>
                                <TextInput style={styles.itemTextValue} keyboardType={'numeric'} onChangeText={(val) => setZipCode(val)}>{zipCode}</TextInput>
                            </View>
                        </View>

                        <View style={modalStyles.selectField}>
                            <Select
                                placeholder={federativeUnit ? federativeUnit : 'Estado'}
                                setSelected={setFederativeUnit}
                                data={federativeUnits}
                                search={false}
                            />
                        </View>

                        <View style={modalStyles.selectField}>
                            <Select
                                placeholder={city ? city : 'Cidade'}
                                setSelected={setCity}
                                data={cities}
                                search={true}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={[defaultStyles.finishButton, modalStyles.btnSubmit]} onPress={handleFormAddress}>
                        <Text style={defaultStyles.finishButtonText}>Salvar Endereço</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}