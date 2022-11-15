import React from 'react';
import { ActivityIndicator, View, ViewProps, ViewStyle } from 'react-native';
import { SYS } from '../../theme'
import { styles } from './styles';

interface LoadingProps extends ViewProps{
    customStyle?: any
    indicatorStyle?: any
}

export function Loading(props: LoadingProps, {...rest}: LoadingProps) {
    return (
        <View style={[styles.container, props.customStyle ? props.customStyle : null]} {...rest}>
            <ActivityIndicator color={(props.indicatorStyle && props.indicatorStyle.color) ? props.indicatorStyle.color : SYS.COLORS.WHITE} />
        </View>
    );
}