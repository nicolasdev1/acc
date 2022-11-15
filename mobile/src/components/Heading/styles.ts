import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: '4%',
    },
    title: {
        fontSize: SYS.FONT_SIZE.LG,
        fontFamily: SYS.FONT_FAMILY.LG,
    },
    subtitle: {
        fontSize: SYS.FONT_SIZE.BD,
        fontFamily: SYS.FONT_FAMILY.BD,
    }
});