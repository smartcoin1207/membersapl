import {StyleSheet} from 'react-native';
const GREY = {
  50: '#F4F2EF',
  100: '#DFDFDF',
  150: '#DCDCDC',
  200: '#E7F6F6',
  250: '#D6D6D6',
  300: '#BDBDBD',
  350: '#999999',
  400: '#989898',
  450: '#8D8D8D',
  500: '#707070',
  550: '#777777',
  600: '#595757',
  700: '#787878',
  800: '#444444',
  A100: '#f2f2f2',
  A200: '#DDDDDD',
  A400: '#bbbbbb',
  A700: '#999999',
};

const YELLOW = {
  50: '#F7ECD7',
  100: '#FDF5E6',
  600: '#C2A557',
  700: '#F4A217',
};

const DEEP_ORANGE = {
  50: '#FDE3E3',
  100: '#F0C2B4',
  200: '#FDEEEA',
  550: '#D8643F',
  600: '#eb5a30',
  700: '#EA5A31',
};

const TEAL = {
  800: '#19a2aa',
};

const CYAN = {
  50: '#CBEEF0',
  100: '#BFD6D8',
};

const BLUE = {
  700: '##3366CC',
  800: '#0000ff',
  900: '#3071EB',
};

const colors = {
  primary: '#1AA1AA',
  lightPrimary: '#E1E8F4',
  secondPrimary: '#EA5A31',
  border: '#989898',
  background: '#F4F2EF',
  placeholder: '#BDBDBD',
  backgroundTab: '#595757',
  activeTab: '#82F7FF',
  inActiveTab: '#fff',
  darkGrayText: '#595757',
  colorGradient: ['#8BC227', '#1AA1AA', '#FCD000', '#F4A217', '#EA5A31'],
  active: '#8BC227',
  black: '#000',
  white: '#fff',
  grey: GREY,
  yellow: YELLOW,
  deepOrange: DEEP_ORANGE,
  teal: TEAL,
  blue: BLUE,
  cyan: CYAN,
};

//Font chữ được sử dụng trong app
const stylesCommon = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fontWeight500: {
    fontFamily: 'Inter-Medium',
  },
  fontWeight600: {
    fontFamily: 'Inter-SemiBold',
  },
});

export {colors, stylesCommon};
