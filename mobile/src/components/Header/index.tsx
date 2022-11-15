import React from 'react';
import { Text, View, ViewProps, StyleSheet } from 'react-native';
import { SYS } from '../../theme';

import { styles } from './styles';

interface HeaderProps extends ViewProps {
    title: string;
    colorHex?: string;
}

export function Header({ title, colorHex, ...rest }: HeaderProps) {
    const selectedColor = colorHex ? colorHex : SYS.COLORS.WHITE
    return (
        <View style={styles.container} {...rest}>
            <Text style={[styles.title, { color: selectedColor }]}>
                {title}
            </Text>
        </View>
    );
}