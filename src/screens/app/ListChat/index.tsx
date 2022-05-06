import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat} from '@images';
import {Item} from './component/Item';
import {useFocusEffect} from '@react-navigation/native';

import {getRoomList} from '@redux';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAME} from '@routeName';

const ListChat = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listRoom = useSelector((state: any) => state.chat.roomList?.data);
  const [value, setValue] = useState<string>('');
  const [key, setKey] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      dispatch(getRoomList({key: key}));
    }, []),
  );

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const renderItem = ({item}: any) => <Item item={item} />;

  const onCreate = useCallback(() => {
    navigation.navigate(ROUTE_NAME.CREATE_ROOM_CHAT);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="チャットグループ一覧"
        imageCenter
        onRightFirst={onCreate}
        iconRightFirst={iconAddListChat}
      />
      <View style={styles.viewContent}>
        <AppInput
          placeholder="チャット名、メッセージ内容を検索"
          onChange={onChangeText}
          value={value}
          styleContainer={styles.containerSearch}
          styleInput={styles.input}
          icon={iconSearch}
          styleIcon={styles.icon}
        />
        <FlatList
          data={listRoom}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export {ListChat};
