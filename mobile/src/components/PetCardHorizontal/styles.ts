import { StyleSheet } from 'react-native';
import { SYS } from './../../theme/index';

export const styles = StyleSheet.create({
    container: {
        height: 96,
        width: '100%',
        backgroundColor: SYS.COLORS.WHITE,
        marginVertical: '2.5%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 18,
        paddingVertical: 4,
    },
    imageContainer: {
        paddingHorizontal: 4,
        height: '100%',
        width: '28%',
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 18,
        paddingHorizontal: 40,
    },
    details: {
        width: '36%',
        height: '100%',
        paddingLeft: '5%',
        paddingVertical: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    detailsText: {
        fontFamily: SYS.FONT_FAMILY.RG,
        fontSize: SYS.FONT_SIZE.RG,
        color: SYS.COLORS.GRAY,
    },
    petConfig: {
        width: '36%',
        height: '100%',
        paddingVertical: 10,
        paddingRight: '5%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
});