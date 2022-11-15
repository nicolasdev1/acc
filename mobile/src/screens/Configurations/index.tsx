import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MenuBar } from '../../components/MenuBar';
import { Header } from '../../components/Header';

import { SYS } from '../../theme';
import { defaultStyles } from '../../theme/styles';
import { styles } from './styles';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { DrawerBarScreenProps } from '../../@types/navigation';
import { useAuth } from '../../contexts/Auth';
import { handleUserAvatar } from '../../utils/avatar';
import { usePet } from '../../contexts/Pet';

export function Configurations() {
    const route = useRoute<DrawerBarScreenProps<'configurationstab'>['route']>()
    const navigator = useNavigation<DrawerBarScreenProps<'configurationstab'>['navigation']>()

    const { signOut, auther } = useAuth()
    const { removeAllFavs } = usePet()

    function logOutAll() {
        signOut()
        removeAllFavs()
    }

    const user = auther?.user

    return (
        <View style={defaultStyles.background}>
            <MenuBar
                left={
                    <TouchableOpacity onPress={() => navigator.dispatch(DrawerActions.openDrawer)}>
                        <Ionicons
                            name='md-list-circle-sharp'
                            color={SYS.COLORS.WHITE}
                            size={28}
                        />
                    </TouchableOpacity>
                }
                right={
                    <TouchableOpacity onPress={() => navigator.navigate('profile')}>
                        {handleUserAvatar()}
                    </TouchableOpacity>
                }
            />

            <Header title='Configurações' />

            <View style={defaultStyles.interactionArea}>
                <TouchableOpacity style={styles.item} onPress={() => navigator.navigate('profile')}>
                    <Text style={styles.itemText}>Editar Perfil</Text>
                    <FontAwesome name='edit' size={20} style={styles.itemIcon} />
                </TouchableOpacity>

                {/*
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Notificações</Text>
                    <Ionicons name='md-notifications' size={20} style={styles.itemIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Info</Text>
                    <Ionicons name='md-information-circle-outline' size={20} style={styles.itemIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Ajuda</Text>
                    <Ionicons name='md-help-circle-outline' size={20} style={styles.itemIcon} />
                </TouchableOpacity>
                */}

                <TouchableOpacity style={styles.item} onPress={logOutAll}>
                    <Text style={styles.itemText}>Sair</Text>
                    <MaterialIcons name='logout' size={20} style={styles.itemIcon} />
                </TouchableOpacity>
            </View>
        </View >
    );
}