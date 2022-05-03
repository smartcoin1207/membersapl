import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Header} from '@component';
import LinearGradient from 'react-native-linear-gradient';
import {
  defaultAvatar,
  iconCamera,
  iconDelete,
  iconEdit,
  iconEmail,
  iconPassword,
  iconLogout,
} from '@images';
import {ViewItem} from './components/ViewItem';

const User = () => {
  return (
    <View style={styles.container}>
      <Header title="個人設定" imageCenter />
      <View style={styles.container}>
        <ScrollView>
          <LinearGradient
            colors={['#595757', '#989898']}
            style={styles.viewHeader}>
            <View style={styles.viewAvatar}>
              <Image source={defaultAvatar} style={styles.avatar} />
              <TouchableOpacity style={styles.buttonCamera}>
                <Image source={iconCamera} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete}>
                <Image source={iconDelete} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <ViewItem
            sourceImage={iconEdit}
            title="表示名"
            content="サンプル名"
          />
          <ViewItem
            sourceImage={iconEmail}
            title="メールアドレス "
            content="user@email.com"
          />
          <ViewItem
            sourceImage={iconPassword}
            title="表示名"
            content="**********"
          />
          <ViewItem
            sourceImage={iconLogout}
            content="ログアウト"
            isLogout
            hideBorder
            hideNext
          />
        </ScrollView>
      </View>
    </View>
  );
};

export {User};
