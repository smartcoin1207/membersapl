import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {colors, stylesCommon} from '@stylesCommon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: scale(11),
    marginVertical: verticalScale(6),
  },
  containerCurrent: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: scale(11),
    marginVertical: verticalScale(6),
  },
  viewCenter: {
    width: '100%',
    paddingHorizontal: scale(11),
    alignItems: 'center',
  },
  containerChat: {
    maxWidth: '70%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: verticalScale(16),
  },
  chat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txtTime: {
    marginLeft: scale(7),
    color: colors.border,
    fontSize: moderateScale(10),
  },
  image: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(7),
    borderRadius: scale(26 / 2),
    marginTop: verticalScale(15),
  },
  txtTimeCurent: {
    marginRight: scale(7),
    color: colors.border,
    fontSize: moderateScale(10),
  },
  viewAvatar: {
    // borderWidth: 1,
  },
  containerMenu: {
    marginTop: verticalScale(5),
  },
  viewReaction: {
    marginTop: verticalScale(-10),
    marginLeft: scale(26) + scale(7),
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },
  reaction: {
    flexDirection: 'row',
    paddingHorizontal: scale(5),
    paddingVertical: scale(3),
    borderRadius: moderateScale(16),
    backgroundColor: '#DDDDDD',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLengthReaction: {
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(10),
    marginLeft: scale(2),
  },
  txtMessage: {
    fontSize: moderateScale(14),
    ...stylesCommon.fontWeight500,
    color: colors.darkGrayText,
  },
  txtCenter: {
    fontSize: moderateScale(10),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginVertical: verticalScale(8),
    textAlign: 'center',
  },
  viewReply: {
    flexDirection: 'row',
    marginBottom: verticalScale(5),
  },
  viewColumn: {
    width: 2,
    height: '100%',
    backgroundColor: 'green',
    marginRight: scale(6),
  },
  txtTitleReply: {
    fontSize: moderateScale(10),
    ...stylesCommon.fontWeight500,
    color: colors.border,
  },
  txtContentReply: {
    fontSize: moderateScale(12),
    ...stylesCommon.fontWeight500,
    color: colors.backgroundTab,
    marginTop: verticalScale(8),
  },
  imageSmall: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
  },
  viewRowEdit: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  imageStamp: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: scale(5),
  },
  txtNameFile: {
    fontSize: moderateScale(12),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginLeft: scale(5),
  },
  viewRowFile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtDateCenter: {
    fontSize: moderateScale(14),
    color: colors.border,
    ...stylesCommon.fontWeight600,
    marginVertical: verticalScale(8),
    textAlign: 'center',
  },
  txtBold:{fontWeight: 'bold', fontSize: moderateScale(16)}
});

export {styles};
