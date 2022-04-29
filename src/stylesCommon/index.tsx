import {StyleSheet, Platform} from 'react-native';

const colors = {
  primary: '#1AA1AA',
  secondPrimary: '#EA5A31',
  border: '#989898',
  background: '#F4F2EF',
  placeholder: '#BDBDBD',
};

const stylesCommon = StyleSheet.create({
  viewContainer: {
    flex: 1,
    background: colors.background,
  },
  fontWeight500: {
    fontFamily: 'Inter-Medium',
  },
  fontWeight600: {
    fontFamily: 'Inter-SemiBold',
  },
});

export {colors, stylesCommon};
