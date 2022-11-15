import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    button: {
        height: 48,
        backgroundColor: SYS.COLORS.PRIMARY,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: SYS.COLORS.WHITE,
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5%',
    },
    userImage: {
        width: 100,
        height: 100,
        margin: 'auto',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 100,
    },
    avatarOptionsContainer: {
        flexDirection: 'row',
        width: '100%',
    }
});