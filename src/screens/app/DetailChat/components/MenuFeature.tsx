import {colors, stylesCommon} from '@stylesCommon';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  like,
  happy,
  heart,
  great,
  smile,
  sad,
  menuCopy,
  menuDelete,
  menuEdit,
  menuPinChat,
  menuReply,
} from '@images';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const MenuFeature = React.memo((props: any) => {
  const {onActionMenu} = props;
  const dataFeature = [
    {
      id: 1,
      sourceImage: menuCopy,
      name: 'コピー',
      style: {
        width: scale(18),
        height: scale(22),
      },
    },
    {
      id: 2,
      sourceImage: menuEdit,
      name: '編集',
      style: {
        width: scale(22),
        height: scale(22),
      },
    },
    {
      id: 3,
      sourceImage: menuReply,
      name: '返信',
      style: {
        width: scale(22),
        height: scale(22),
      },
    },
    {
      id: 4,
      sourceImage: menuPinChat,
      name: 'ブックマーク',
      style: {
        width: scale(22),
        height: scale(22),
      },
    },
    {
      id: 5,
      sourceImage: menuDelete,
      name: '削除',
      style: {
        width: scale(22),
        height: scale(22),
      },
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
      style: {
        width: scale(22),
        height: scale(25),
      },
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
            <TouchableOpacity
              key={item?.id}
              style={styles.itemFeature}
              onPress={() => onActionMenu(item?.id)}>
              <Image
                source={item?.sourceImage}
                style={item?.style ? item?.style : styles.imageFeature}
              />
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
