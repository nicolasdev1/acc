import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        marginVertical: '4%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: SYS.FONT_SIZE.LG,
        fontFamily: SYS.FONT_FAMILY.LG,
        color: SYS.COLORS.WHITE,
    },
});