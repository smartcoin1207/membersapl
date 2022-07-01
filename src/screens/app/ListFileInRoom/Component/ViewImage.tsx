import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {stylesCommon, colors} from '@stylesCommon';
import {ItemImage} from './ItemImage';

const ViewImage = React.memo(() => {
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
    {
      id: 4,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 5,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 6,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 7,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 8,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 9,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 10,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 11,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 12,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 13,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 14,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 15,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 16,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 17,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
    {
      id: 18,
      source:
        'https://member-chat-api.adamo.tech/storage/member/146/a6b51049-1e50-4c41-b347-4c88c774fb15/1655709539-icon_image.JPG',
    },
  ];
  const renderItem = ({item}: any) => <ItemImage item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={<Text style={styles.txtEmpty}>データなし</Text>}
        // onEndReachedThreshold={0.01}
        // onEndReached={handleLoadMore}
        key={5}
        numColumns={5}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(4),
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

export {ViewImage};
