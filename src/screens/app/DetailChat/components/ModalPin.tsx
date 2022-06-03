import React, {useCallback} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {menuReply, iconClose, iconFile, iconDelete} from '@images';
import FastImage from 'react-native-fast-image';
import {colors, stylesCommon} from '@stylesCommon';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const ModalPin = React.memo((props: any) => {
  const {updateGimMessage} = props;
  const message_pinned = useSelector(
    (state: any) => state.chat?.message_pinned,
  );

  return (
    <View style={styles.viewPinMessage}>
      <View style={styles.viewContent}>
        <Text style={styles.txtTitle}>Pinned message</Text>
        {message_pinned?.message && (
          <Text style={styles.txtContent} numberOfLines={2}>
            {message_pinned?.message}
          </Text>
        )}
        <View style={styles.viewRow}>
          {message_pinned?.attachment_files?.map((item: any) => (
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
      </View>
      <TouchableOpacity
        style={styles.viewIcon}
        onPress={() => {
          updateGimMessage(message_pinned?.id, 0);
        }}>
        <Image source={iconDelete} style={styles.iconDelete} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
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
  viewPinMessage: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContent: {
    width: '90%',
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(14),
    color: colors.primary,
  },
  txtContent: {
    ...stylesCommon.fontWeight500,
    fontSize: moderateScale(12),
    color: colors.darkGrayText,
    marginTop: verticalScale(3),
  },
  viewIcon: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconDelete: {
    tintColor: colors.darkGrayText,
  },
});

export {ModalPin};
