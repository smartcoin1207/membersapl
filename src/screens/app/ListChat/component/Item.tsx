import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {colors, stylesCommon} from '@stylesCommon';
import {iconNext, defaultAvatar, iconPin} from '@images';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';
import FastImage from 'react-native-fast-image';

const Item = React.memo((props: any) => {
  const navigation = useNavigation<any>();
  const {item} = props;

  const navigateDetail = () => {
    navigation.navigate(ROUTE_NAME.DETAIL_CHAT, {idRoomChat: item?.id});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateDetail}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <View style={styles.image}>
            <FastImage
              style={styles.image}
              source={
                item?.icon_image ? {uri: item?.icon_image} : defaultAvatar
              }
            />
            <View style={styles.viewActive}>
              <View style={styles.active} />
            </View>
          </View>
        </View>
        <View style={styles.viewTxt}>
          <>
            <Text style={styles.txtContent} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={styles.txtTitle} numberOfLines={2}>
              {item?.lastMessageJoin?.message}
            </Text>
          </>
        </View>
        <View
          style={[
            styles.viewImageNext,
            {
              justifyContent:
                item?.pin_flag == 1 ? 'space-between' : 'flex-end',
            },
          ]}>
          {item?.pin_flag == 1 && <Image source={iconPin} />}
          <Image source={iconNext} />
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: scale(10),
    paddingRight: scale(8),
  },
  viewContent: {
    paddingBottom: verticalScale(12),
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
  },
  viewImage: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    width: '65%',
    justifyContent: 'center',
  },
  viewImageNext: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtTitle: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.border,
  },
  txtContent: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
    color: colors.backgroundTab,
  },
  txtContentLogout: {
    color: '#EA5A31',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
  },
  image: {
    width: moderateScale(51),
    height: moderateScale(51),
    borderRadius: moderateScale(51) / 2,
  },
  viewActive: {
    width: moderateScale(14),
    height: moderateScale(14),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(14 / 2),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  active: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(12 / 2),
    backgroundColor: colors.active,
  },
});

export {Item};
