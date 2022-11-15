import { StyleSheet, Dimensions } from 'react-native';
import { SYS } from '../../theme';

const window = Dimensions.get('window')

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
        marginBottom: 20,
    },
    imageOptions: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBtn: {
        height: 48,
        width: '45%',
        backgroundColor: SYS.COLORS.WHITE,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
    },
    imageBtnText: {
        color: SYS.COLORS.PRIMARY,
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
    },
    item: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '4%',
    },
    itemDetail: {
        flex: 1,
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginRight: '2.5%',
    },
    itemText: {
        color: SYS.COLORS.PRIMARY,
        fontFamily: SYS.FONT_FAMILY.RG,
        fontSize: SYS.FONT_SIZE.RG,
    },
    itemTextValue: {
        color: SYS.COLORS.PRIMARY,
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
        textAlign: 'auto',
        width: '100%',
    },
    itemIcon: {
        color: SYS.COLORS.PRIMARY,
    },
});