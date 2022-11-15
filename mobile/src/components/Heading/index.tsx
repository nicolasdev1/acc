import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { SYS } from '../../theme';

import { styles } from './styles';

interface Props extends ViewProps {
    title: string;
    subtitle?: string;
    colorHex?: string;
}

export function Heading({ title, subtitle, colorHex, ...rest }: Props) {
    const selectedColor = colorHex ? colorHex : SYS.COLORS.WHITE

    return (
        <View style={styles.container} {...rest}>
            {title &&
                <Text style={[styles.title, { color: selectedColor }]}>
                    {title}
                </Text>
            }

            {subtitle &&
                <Text style={[styles.subtitle, { color: selectedColor }]}>
                    {subtitle}
                </Text>
            }
        </View>
    );
}