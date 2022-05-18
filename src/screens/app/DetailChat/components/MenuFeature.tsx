import {colors, stylesCommon} from '@stylesCommon';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {iconEdit, like, happy, heart, great, smile, sad} from '@images';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const MenuFeature = React.memo(() => {
  const dataFeature = [
    {
      id: 1,
      sourceImage: iconEdit,
      name: 'コピー',
    },
    {
      id: 2,
      sourceImage: iconEdit,
      name: '編集',
    },
    {
      id: 3,
      sourceImage: iconEdit,
      name: '返信',
    },
    {
      id: 4,
      sourceImage: iconEdit,
      name: 'ブックマーク',
    },
    {
      id: 5,
      sourceImage: iconEdit,
      name: '削除',
    },
  ];

  const dataEmoji = [
    {
      id: 6,
      sourceImage: smile,
    },
    {
      id: 7,
      sourceImage: sad,
    },
    {
      id: 8,
      sourceImage: happy,
    },
    {
      id: 9,
      sourceImage: like,
    },
    {
      id: 10,
      sourceImage: heart,
      style: {
        width: scale(25),
        height: scale(22),
      },
    },
    {
      id: 11,
      sourceImage: great,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.viewFeature}>
        {dataFeature.map((item: any, index: any) => {
          return (
            <TouchableOpacity key={item?.id} style={styles.itemFeature}>
              <Image source={item?.sourceImage} style={styles.imageFeature} />
              <Text style={styles.txtNameFeature}>{item?.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.line} />
      <View style={styles.viewFeature}>
        {dataEmoji.map((item: any, index: any) => {
          return (
            <TouchableOpacity style={styles.itemFeature} key={item?.id}>
              <Image
                source={item?.sourceImage}
                style={item?.style ? item?.style : styles.imageEmoji}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(13),
    backgroundColor: colors.backgroundTab,
    borderRadius: moderateScale(8),
  },
  viewFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageFeature: {
    tintColor: '#FFFFFF',
    width: scale(20),
    height: scale(20),
  },
  itemFeature: {
    marginHorizontal: scale(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNameFeature: {
    marginTop: verticalScale(5),
    color: '#FFFFFF',
    ...stylesCommon.fontWeight500,
    fontSize: verticalScale(12),
  },
  line: {
    height: verticalScale(1),
    backgroundColor: '#FFFFFF',
    marginVertical: verticalScale(8),
  },
  imageEmoji: {
    width: scale(25),
    height: scale(25),
  },
});

export {MenuFeature};
