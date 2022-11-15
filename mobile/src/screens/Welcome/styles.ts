import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: SYS.COLORS.SUCCESS,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        height: '70%',
        width: '100%'
    },
    fwdButton: {
        position: 'absolute',
        width: 200,
        height: 66,
        right: 0,
        bottom: 0,
        backgroundColor: SYS.COLORS.BUTTON,
        borderTopLeftRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fwdButtonText: {
        color: SYS.COLORS.WHITE,
        fontSize: SYS.FONT_SIZE.LG,
        fontFamily: SYS.FONT_FAMILY.LG
    },
})