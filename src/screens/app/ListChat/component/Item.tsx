import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {colors, stylesCommon} from '@stylesCommon';
import {iconNext, defaultAvatar, iconPin} from '@images';

const Item = React.memo((props: any) => {
  const {item} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={styles.viewContent}>
        <View style={styles.viewImage}>
          <View style={styles.image}>
            <Image
              source={item?.icon_image ? item?.icon_image : defaultAvatar}
              style={styles.image}
            />
            {/* <View style={styles.viewActive}>
              <View style={styles.active} />
            </View> */}
          </View>
        </View>
        <View style={styles.viewTxt}>
          <>
            <Text style={styles.txtContent} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={styles.txtTitle} numberOfLines={2}>
              {item?.last_message}
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

      <LinearGradient
        colors={colors.colorGradient}
        style={styles.linearGradient}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {},
  viewContent: {
    paddingVertical: verticalScale(16),
    flexDirection: 'row',
  },
  linearGradient: {
    width: '100%',
    height: 1,
  },
  viewImage: {
    width: '23%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewTxt: {
    width: '62%',
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
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
    color: colors.backgroundTab,
  },
  txtContentLogout: {
    color: '#EA5A31',
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(16),
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
  },
  viewActive: {
    width: moderateScale(14),
    height: moderateScale(14),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(14 / 2),
    position: 'absolute',
    top: 0,
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
