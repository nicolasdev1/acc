import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        height: 232,
        width: 172,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 24,
        backgroundColor: SYS.COLORS.WHITE,
    },
    image: {
        width: 152,
        height: 152,
        marginBottom: 5,
        borderRadius: 24,
    },
    info: {
        height: 60,
        width: 152,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    petDetails: {
        height: 60,
        width: '85%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    petDetailsText: {
        fontFamily: SYS.FONT_FAMILY.RG,
        fontSize: SYS.FONT_SIZE.RG,
        textAlign: 'left',
    },
    petConfig: {
        height: 60,
        width: '15%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});