import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    container: {

    },
    item: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2%',
    },
    itemText: {
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
        color: SYS.COLORS.PRIMARY,
    },
    itemIcon: {
        color: SYS.COLORS.PRIMARY,
    },
});