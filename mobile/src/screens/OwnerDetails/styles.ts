import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    imageArea: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '2.5%',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    divider: {
        borderBottomColor: SYS.COLORS.DARK,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: '5%',
    },
    dividerText: {
        fontSize: SYS.FONT_SIZE.BD,
        fontFamily: SYS.FONT_FAMILY.BD,
        color: SYS.COLORS.PRIMARY,
    },
    text: {
        fontSize: SYS.FONT_SIZE.BD,
        fontFamily: SYS.FONT_FAMILY.RG,
        color: SYS.COLORS.DARK,
        textAlign: 'justify',
        marginBottom: '2.5%',
    }
});