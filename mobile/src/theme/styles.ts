import { StatusBar, StyleSheet, Dimensions } from "react-native";
import { SYS } from ".";

const window = Dimensions.get("window");

export const defaultStyles = StyleSheet.create({
  background: {
    backgroundColor: SYS.COLORS.PRIMARY,
    flex: 1,
  },
  interactionArea: {
    flex: 1,
    padding: "5%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: SYS.COLORS.WHITE,
    zIndex: -1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
  },
  headerDog: {
    height: window.height * 0.125,
    width: window.height * 0.125,
    resizeMode: "contain",
    position: "absolute",
    bottom: -10, // Pixels quantity related to content above brown line (paw)
    right: "5%",
    zIndex: 1,
  },
  finishButton: {
    height: 48,
    backgroundColor: SYS.COLORS.PRIMARY,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  finishButtonText: {
    color: SYS.COLORS.WHITE,
    fontFamily: SYS.FONT_FAMILY.BD,
    fontSize: SYS.FONT_SIZE.BD,
  },
  cancelButton: {
    height: 48,
    backgroundColor: SYS.COLORS.ERROR,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 12,
  },
});
