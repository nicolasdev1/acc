import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/Header';

import { styles } from './styles';

export function Info() {
    return (
        <View style={styles.container}>
            <Header title='Info' />
        </View>
    );
}