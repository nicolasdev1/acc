import { StyleSheet } from "react-native";
import { SYS } from "../../theme";

export const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    content: {
        width: '80%',
        height: '80%',
        backgroundColor: SYS.COLORS.WHITE,
        borderRadius: 8,
        borderWidth: 4,
        borderColor: SYS.COLORS.PRIMARY,
        justifyContent: 'flex-start',
        padding: '5%',
    },
    selectField: {
        width: '100%',
        marginBottom: '4%',
    },
    btn: {
        marginBottom: '5%',
    },
    btnSubmit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        marginHorizontal: '5%',
    },
})