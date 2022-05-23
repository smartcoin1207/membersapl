import {StyleSheet} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewPinMessage: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: 14,
    color: colors.primary,
  },
  txtContent: {
    ...stylesCommon.fontWeight500,
    fontSize: 12,
    color: colors.darkGrayText,
    marginTop: verticalScale(3),
  },
  iconDelete: {
    tintColor: colors.darkGrayText,
  },
  viewContent: {
    width: '90%',
  },
  viewIcon: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export {styles};
