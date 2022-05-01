import {StyleSheet, Platform} from 'react-native';

const colors = {
  primary: '#1AA1AA',
  secondPrimary: '#EA5A31',
  border: '#989898',
  background: '#E5E5E5',
  placeholder: '#BDBDBD',
  backgroundTab: '#595757',
  activeTab: '#1AA1AA',
  inActiveTab: '#FFFFFF',
  darkGrayText: '#595757',
  colorGradient: ['#8BC227', '#1AA1AA', '#FCD000', '#F4A217', '#EA5A31'],
};

const stylesCommon = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fontWeight500: {
    fontFamily: 'Inter-Medium',
  },
  fontWeight600: {
    fontFamily: 'Inter-SemiBold',
  },
});

export {colors, stylesCommon};
