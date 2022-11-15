import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    loginButton: {
        height: 48,
        backgroundColor: SYS.COLORS.PRIMARY,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    loginButtonText: {
        color: SYS.COLORS.WHITE,
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
    },
    registerButton: {
        height: 48,
        backgroundColor: 'rgba(173, 173, 173, 0.29)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    registerButtonText: {
        color: 'rgba(0, 0, 0, 0.38)',
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
    }
});