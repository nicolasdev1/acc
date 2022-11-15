import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5%',
    },
    avatarOptionsContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    petImage: {
        width: 100,
        height: 100,
        margin: 'auto',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 100,
        zIndex: 100,
    }
});