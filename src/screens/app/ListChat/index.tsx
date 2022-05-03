import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {demoActionChange} from '@redux';
import {Header} from '@component';

const ListChat = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header title="チャットグループ一覧" imageCenter />
      <View style={styles.viewContent}>
        <TouchableOpacity
          onPress={() => {
            dispatch(demoActionChange(0));
          }}>
          <Text>ListChat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {ListChat};
