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
  image: {
    width: '119@vs',
    height: '119@vs',
    marginTop: '30@vs',
  },
  linearGradient: {
    marginTop: '30@vs',
    borderRadius: '10@ms',
    padding: 1,
  },
  viewContent: {
    borderRadius: '10@ms',
    backgroundColor: colors.background,
    paddingHorizontal: '24@s',
    paddingVertical: '40@vs',
  },
  txtTitleLogin: {
    ...stylesCommon.fontWeight500,
    fontSize: '16@ms',
    color: colors.darkGrayText,
    marginBottom: '44@vs',
  },
  viewBottom: {
    marginTop: '20@vs',
    alignItems: 'center',
  },
  txtBottom: {
    color: colors.primary,
    fontSize: '16@ms',
  },
});

export {styles};
