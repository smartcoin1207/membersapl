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
import {useSelector} from 'react-redux';

const MenuFeature = React.memo((props: any) => {
  const {onActionMenu, onActionReaction, userId} = props;
  const user_id = useSelector((state: any) => state.auth.userInfo.id);
  const dataFeature = [
    {
      id: 7,
      sourceImage: menuCopy,
      name: 'コピー',
      style: {
        width: scale(18),
        height: scale(22),
      },
      isShow: true,
    },
    {
      id: 8,
      sourceImage: menuEdit,
      name: '編集',
      style: {
        width: scale(22),
        height: scale(22),
      },
      isShow: userId == user_id ? true : false,
    },
    {
      id: 9,
      sourceImage: menuReply,
      name: '返信',
      style: {
        width: scale(22),
        height: scale(22),
      },
      isShow: true,
    },
    {
      id: 10,
      sourceImage: menuPinChat,
      name: 'ブックマーク',
      style: {
        width: scale(22),
        height: scale(22),
      },
      isShow: true,
    },
    {
      id: 11,
      sourceImage: menuDelete,
      name: '削除',
      style: {
        width: scale(22),
        height: scale(22),
      },
      isShow: userId == user_id ? true : false,
    },
  ];

  const dataEmoji = [
    {
      id: 4,
      sourceImage: smile,
    },
    {
      id: 5,
      sourceImage: sad,
    },
    {
      id: 2,
      sourceImage: happy,
    },
    {
      id: 6,
      sourceImage: like,
      style: {
        width: scale(22),
        height: scale(25),
      },
    },
    {
      id: 1,
      sourceImage: heart,
      style: {
        width: scale(25),
        height: scale(22),
      },
    },
    {
      id: 3,
      sourceImage: great,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.viewFeature}>
        {dataFeature.map((item: any, index: any) => {
          return (
            <>
              {item?.isShow === true ? (
                <TouchableOpacity
                  key={item?.id}
                  style={styles.itemFeature}
                  onPress={() => onActionMenu(item?.id)}>
                  <Image
                    source={item?.sourceImage}
                    style={item?.style ? item?.style : styles.imageFeature}
                  />
                  <Text style={styles.txtNameFeature} numberOfLines={1}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </>
          );
        })}
      </View>
      <View style={styles.line} />
      <View style={styles.viewFeature}>
        {dataEmoji.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              style={styles.itemFeature}
              key={item?.id}
              onPress={() => onActionReaction(item?.id)}>
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
