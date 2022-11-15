import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { defaultStyles } from '../../theme/styles'
import { Heading } from '../../components/Heading'
import { useAuth } from '../../contexts/Auth';
import ProgressiveImage from '../../components/ProgressiveImage';

export function Welcome() {
    const [index, setIndex] = useState<number>(0)

    const { hasSeenFunction } = useAuth()

    const data = [
        { key: 1, title: 'Animal Care Center', subtitle: 'Seja muito bem vindo!', btnText: 'Próximo' },
        { key: 2, title: 'Seu melhor amigo está te esperando', subtitle: 'Deixe que seu amor mude o mundo', btnText: 'Próximo' },
        { key: 3, title: 'Adote, não compre', subtitle: 'Respeitar os animais é uma obrigação, amá-los é um privilégio.', btnText: 'Começar' },
    ]

    return (
        <View style={[defaultStyles.background, styles.container]}>
            {
                index >= 0 && index <= data.length - 1 &&
                <>
                    <ProgressiveImage
                        source={
                            index == 0 ? require("../../../assets/welcome/welcome-step-1.png")
                                : (index == 1) ? require("../../../assets/welcome/welcome-step-2.png")
                                    : require('../../../assets/welcome/welcome-step-3.png')
                        }

                        style={styles.image}
                    />

                    <Heading
                        title={data[index].title}
                        subtitle={data[index].subtitle}
                    />

                    <TouchableOpacity
                        onPress={
                            () => (index <= data.length - 2) ? setIndex(index + 1) : hasSeenFunction()
                        }
                        style={styles.fwdButton}
                    >
                        <Text style={styles.fwdButtonText}>{data[index].btnText}</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    );
}