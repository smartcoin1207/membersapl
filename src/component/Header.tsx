import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, stylesCommon} from '@stylesCommon';
import {getStatusBarHeight, ifIphoneX} from 'react-native-iphone-x-helper';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {iconBack, iconDetail, iconSearch} from '@images';
import {HITSLOP} from '@util';

const Header = React.memo(() => {
  return (
    <LinearGradient
      colors={colors.colorGradient}
      style={styles.linearGradient}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}>
      <View style={styles.viewHeader}>
        <View style={styles.viewLeft}>
          <TouchableOpacity hitSlop={HITSLOP} style={styles.buttonBack}>
            <Image source={iconBack} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewCenter}>
          <Text style={styles.txtTitle} numberOfLines={1}>
            チャットグループ名
          </Text>
        </View>
        <View style={styles.viewRight}>
          <TouchableOpacity
            hitSlop={{...HITSLOP, right: 10}}
            style={styles.buttonRightSecond}>
            <Image source={iconSearch} />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={{...HITSLOP, left: 0}}>
            <Image source={iconDetail} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  linearGradient: {
    paddingBottom: verticalScale(1),
  },
  viewHeader: {
    ...ifIphoneX(
      {
        paddingTop: verticalScale(50),
      },
      {
        paddingTop: getStatusBarHeight() + verticalScale(20),
      },
    ),
    backgroundColor: '#FFFFFF',
    paddingBottom: verticalScale(15),
    flexDirection: 'row',
    paddingHorizontal: scale(16),
  },
  viewLeft: {
    width: '25%',
    justifyContent: 'center',
  },
  viewCenter: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonBack: {
    width: 13,
  },
  txtTitle: {
    fontSize: moderateScale(16),
    ...stylesCommon.fontWeight600,
  },
  buttonRightSecond: {
    marginRight: scale(14),
  },
});

export {Header};
