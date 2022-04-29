import {StyleSheet} from 'react-native';
import {stylesCommon, colors} from '@stylesCommon';
import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    ...stylesCommon.viewContainer,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '16@s',
  },
  txtFontMedium: {
    marginTop: 10,
    ...stylesCommon.fontWeight500,
    fontSize: '14@ms'
  },
  txtFontBold: {
    marginVertical: 10,
    ...stylesCommon.fontWeight600,
    fontSize: '16@ms'
  },
});

export {styles};
