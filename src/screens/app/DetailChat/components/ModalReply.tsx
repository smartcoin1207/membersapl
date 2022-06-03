import React, {useCallback} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {menuReply, iconClose, iconFile} from '@images';
import FastImage from 'react-native-fast-image';
import {colors, stylesCommon} from '@stylesCommon';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {saveMessageReply} from '@redux';

const ModalReply = React.memo(() => {
  const dispatch = useDispatch();
  const messageReply = useSelector((state: any) => state.chat?.messageReply);

  const removeReplyMessage = useCallback(() => {
    dispatch(saveMessageReply(null));
  }, []);

  return (
    <View style={styles.viewRepMessage}>
      <View style={styles.viewIconRepMessage}>
        <Image source={menuReply} style={styles.iconReply} />
      </View>
      <View style={styles.viewTxtRepMessage}>
        <Text style={styles.name}>Reply message</Text>
        {messageReply?.text ? (
          <Text style={styles.content} numberOfLines={2}>
            {messageReply?.text}
          </Text>
        ) : (
          <View style={styles.viewRow}>
            {messageReply?.attachment_files?.map((item: any) => (
              <>
                {item?.type == 4 ? (
                  <FastImage
                    source={{uri: item?.path}}
                    style={styles.imageSmall}
                    key={item?.id}
                  />
                ) : (
                  <Image
                    source={iconFile}
                    style={styles.imageFile}
                    key={item?.id}
                  />
                )}
              </>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.viewIconRepMessage}
        onPress={removeReplyMessage}>
        <Image source={iconClose} style={styles.iconClose} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  viewRepMessage: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  viewIconRepMessage: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconReply: {
    width: moderateScale(25),
    height: moderateScale(25),
    tintColor: colors.primary,
  },
  viewTxtRepMessage: {
    width: '70%',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  name: {
    fontSize: 14,
    color: colors.primary,
    ...stylesCommon.fontWeight600,
    marginBottom: verticalScale(5),
  },
  content: {
    fontSize: 12,
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight500,
  },
  viewRow: {
    flexDirection: 'row',
  },
  imageSmall: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(4),
    marginHorizontal: moderateScale(2),
  },
  iconClose: {
    tintColor: colors.darkGrayText,
  },
  imageFile: {
    width: moderateScale(25),
    height: moderateScale(25),
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
});

export {ModalReply};
