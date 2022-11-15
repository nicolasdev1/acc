import { StyleSheet } from "react-native";
import { SYS } from "../../../theme";

export const styles = StyleSheet.create({
    errorView: {
    },
    errorRequired: {
        color: SYS.COLORS.ERROR,
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,        
    },
    errorAlert: {
        color: SYS.COLORS.ALERT,
        fontFamily: SYS.FONT_FAMILY.BD,
        fontSize: SYS.FONT_SIZE.BD,
    }
})