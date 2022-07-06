import {colors, stylesCommon} from '@stylesCommon';
import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Linking, TouchableOpacity} from 'react-native';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

const ViewTask = React.memo((props: any) => {
  const {data, mess, task_link} = props;

  const onLinkTask = useCallback(() => {
    Linking.openURL(task_link);
  }, [task_link]);

  return (
    <TouchableOpacity style={styles.container} onPress={onLinkTask}>
      <View style={styles.viewHeader}>
        <Text style={styles.txtTitle} numberOfLines={2}>
          {mess}
        </Text>
      </View>
      <View style={styles.viewContent}>
        <Text style={styles.txtTitle}>タスク名</Text>
        <Text style={styles.txtContent}>{data?.name}</Text>
      </View>
      <View style={styles.viewBottom}>
        <Text style={styles.txtTitle}>期日</Text>
        <Text style={styles.txtTime}>
          {data?.plans_end_date} {data?.plans_end_time}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '65%',
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
