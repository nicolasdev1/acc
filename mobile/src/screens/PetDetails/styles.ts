import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';
import  Constants  from 'expo-constants';

const paddingImg = 14

export const styles = StyleSheet.create({
    customMenuBar: {
        position: 'absolute',
        zIndex: 5,
        paddingHorizontal: (paddingImg * 2),
        marginTop: Constants.statusBarHeight + (paddingImg * 2),
    },
    petContainer: {
        zIndex: 0,
        width: '100%',
        height: '40%',
        paddingHorizontal: paddingImg,
        paddingTop: paddingImg,
        marginTop: Constants.statusBarHeight
    },
    petImage: {
        zIndex: 0,
        width: '100%',
        height: '100%',
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
    },
    contentContainer: {
        width: '100%',
        height: '50%',
        paddingHorizontal: '4%',
        flex: 1,
    },
    petDetails: {
        height: '17.5%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: '5%',
    },
    petDetailsColumn: {
        width: '50%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    petDetailsText: {
        fontFamily: SYS.FONT_FAMILY.RG,
        fontSize: SYS.FONT_SIZE.BD,
        color: SYS.COLORS.GRAY,
    },
    petName: {
        fontSize: SYS.FONT_SIZE.LG,
        fontFamily: SYS.FONT_FAMILY.LG,
        color: SYS.COLORS.DARK,
    },
    ownerContainer: {
        height: '27.5%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ownerImage: {
        width: 52,
        height: 52,
        borderRadius: 100,
    },
    ownerDetails: {
        height: '100%',
        width: '75%',
        paddingLeft: '5%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    ownerText: {
        fontFamily: SYS.FONT_FAMILY.RG,
        fontSize: SYS.FONT_SIZE.RG,
        color: SYS.COLORS.GRAY,
    },
    description: {
        height: '30%',
        width: '100%',
    },
    descriptionText: {
        textAlign: 'justify',
    },
    footer: {
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        height: 52,
        width: '80%',
        backgroundColor: SYS.COLORS.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: SYS.COLORS.LIGHTGRAY,
        fontFamily: SYS.FONT_FAMILY.LG,
        fontSize: SYS.FONT_SIZE.LG,
        textAlign: 'center',
    }
});