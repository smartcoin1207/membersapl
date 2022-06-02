import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';
import {Header} from '@component';

const SearchMessage = () => {
  return (
    <View style={styles.container}>
      <Header title="メッセージ検索" back imageCenter />
    </View>
  );
};

export {SearchMessage};
