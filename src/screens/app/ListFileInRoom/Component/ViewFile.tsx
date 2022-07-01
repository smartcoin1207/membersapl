import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';
import {ItemFile} from './ItemFile';

const ViewFile = React.memo(() => {
  const data = [
    {
      id: 1,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 2,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 3,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
  ];
  const renderItem = ({item}: any) => <ItemFile item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
        // onEndReachedThreshold={0.01}
        // onEndReached={handleLoadMore}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtEmpty: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(18),
  },
  // centerRow: {justifyContent: ''},
});

export {ViewFile};
