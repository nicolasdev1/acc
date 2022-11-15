import React from 'react';
import { View, ViewProps, Text } from 'react-native';

import { styles } from './styles';

interface MenuBarProps extends ViewProps {
    left?: any;
    right?: any;
    customStyleSheet?: any;
}

export function MenuBar({ left, right, customStyleSheet, ...rest }: MenuBarProps) {
    return (
        <View style={[styles.container, customStyleSheet]} {...rest}>
            {left}
            {right}
        </View>
    );
}