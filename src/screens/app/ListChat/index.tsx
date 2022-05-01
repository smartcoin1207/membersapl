import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {demoActionChange} from '@redux';

const ListChat = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(demoActionChange(0));
        }}>
        <Text>ListChat</Text>
      </TouchableOpacity>
    </View>
  );
};

export {ListChat};
