import { StyleSheet } from 'react-native';
import { SYS } from '../../theme';

export const styles = StyleSheet.create({
  container: {

  },
  imageArea: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  divider: {
    borderBottomColor: SYS.COLORS.DARK,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: '5%',
  },
  dividerText: {
      fontSize: SYS.FONT_SIZE.BD,
      fontFamily: SYS.FONT_FAMILY.BD,
      color: SYS.COLORS.PRIMARY,
  },
  fieldTitle: {
    fontSize: SYS.FONT_SIZE.RG,
    fontFamily: SYS.FONT_FAMILY.RG,
    color: SYS.COLORS.DARK,
  },
  fieldDescription: {
    fontSize: SYS.FONT_SIZE.BD,
    fontFamily: SYS.FONT_FAMILY.BD,
    color: SYS.COLORS.DARK,
    textAlign: 'justify',
    marginBottom: '2.5%',
  }
});