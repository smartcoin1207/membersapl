import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './styles';
import {Header, AppInput} from '@component';
import {iconSearch, iconAddListChat} from '@images';
import {Item} from './component/Item';

const ListChat = () => {
  const [value, setValue] = useState<string>('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const renderItem = ({item}: any) => <Item item={item} />;

  return (
    <View style={styles.container}>
      <Header
        title="チャットグループ一覧"
        imageCenter
        onRightFirst={() => {}}
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export {ListChat};
