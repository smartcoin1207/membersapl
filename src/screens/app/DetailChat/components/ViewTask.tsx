import {colors, stylesCommon} from '@stylesCommon';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

const ViewTask = React.memo((props: any) => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.txtTitle} numberOfLines={2}>
          タスクにアサインされました
        </Text>
      </View>
      <View style={styles.viewContent}>
        <Text style={styles.txtTitle}>タスク名</Text>
        <Text style={styles.txtContent}>{data?.name}</Text>
      </View>
      <View style={styles.viewBottom}>
        <Text style={styles.txtTitle}>期日</Text>
        <Text style={styles.txtTime}>
          {data?.actual_start_date} {data?.actual_start_time}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
  },
  viewHeader: {
    flex: 1,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    backgroundColor: '#DDDDDD',
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  txtTitle: {
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(14),
    color: colors.darkGrayText,
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(16),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DDDDDD',
  },
  viewBottom: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    backgroundColor: '#DDDDDD',
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    alignItems: 'center',
  },
  txtTime: {
    marginLeft: scale(7),
    color: colors.darkGrayText,
    fontSize: moderateScale(12),
  },
  txtContent: {
    color: colors.primary,
    fontSize: moderateScale(12),
    marginTop: verticalScale(6),
  },
});

export {ViewTask};
