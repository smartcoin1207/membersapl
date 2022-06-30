import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, stylesCommon} from '@stylesCommon';
import {Header} from '@component';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {iconNetWorkErr} from '@images';

const NetworkErr = () => {
  return (
    <View style={styles.container}>
      <Header back imageCenter title="通知する" />
      <View style={styles.viewContent}>
        <Image source={iconNetWorkErr} style={styles.icon}/>
        <Text style={styles.txtTitle}>サーバーはメンテナンス中です</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
    color: colors.darkGrayText,
    marginTop: verticalScale(30),
  },
  icon:{
    width: moderateScale(300),
    height: moderateScale(300),
  }
});

export {NetworkErr};
