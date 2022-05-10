import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';

const Setting = () => {
  return (
    <View style={styles.container}>
      <Header imageCenter title="設定" />
      <View style={styles.viewContent}>
        <Text>Setting</Text>
      </View>
    </View>
  );
};

export {Setting};
