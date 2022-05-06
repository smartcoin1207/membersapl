import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {Header, AppInput, AppButton} from '@component';
import {iconClose} from '@images';
import {colors} from '@stylesCommon';

import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getListUser, createRoom, GlobalService} from '@services';

const CreateRoomChat = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState<any>(null);
  const [listUser, setListUser] = useState<any>([]);
  const [resultUser, setResultUser] = useState<any>([]);
  const [key, setKey] = useState<any>(null);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onChange = useCallback(
    (value: string) => {
      setName(value);
    },
    [name],
  );

  const onSearchName = (value: string) => {
    setKey(value);
  };

  const onSearch = async () => {
    try {
      const result = await getListUser({name: key});
      setResultUser(result?.data?.users?.data);
    } catch (error) {}
  };

  const onAddUser = (item: any) => {
    setListUser(listUser?.concat([item]));
    setResultUser([]);
  };

  const onDeleteItem = (item: any) => {
    let data = [...listUser];
    const index = data.findIndex((element: any) => element?.id == item?.id);
    if (index > -1) {
      data.splice(index, 1);
    }
    setListUser(data);
  };

  const renderIdUser = () => {
    let data = [];
    for (let i = 0; i < listUser?.length; i++) {
      data.push(listUser[i].id);
    }
    return data;
  };

  const handleSubmit = async () => {
    try {
      GlobalService.showLoading();
      const body = {
        name: name,
        user_id: renderIdUser(),
      };
      const result = await createRoom(body);
      navigation.goBack();
      GlobalService.hideLoading();
    } catch (error) {
      GlobalService.hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="新規グループ"
        imageCenter
        iconRightFirst={iconClose}
        onRightFirst={onBack}
      />
      <View style={styles.viewContent}>
        <LinearGradient
          colors={colors.colorGradient}
          style={styles.linearGradient}>
          <KeyboardAwareScrollView
            style={styles.viewForm}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.txtTitle}>テキストテキストテキスト。</Text>
            <AppInput placeholder="名称" onChange={onChange} value={name} />
            <View style={styles.viewSelectUser}>
              {listUser?.length > 0 && (
                <View style={styles.viewRow}>
                  {listUser?.map((item: any, index: any) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.viewTxtArray}
                        onPress={() => onDeleteItem(item)}>
                        <Text style={styles.txtArray}>
                          {item?.first_name} {item?.last_name}
                        </Text>
                        <Image source={iconClose} style={styles.iconClose} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <TextInput
                style={styles.input}
                onChangeText={onSearchName}
                value={key}
                placeholder="名称"
                placeholderTextColor={colors.placeholder}
                onSubmitEditing={onSearch}
                returnKeyType="search"
              />
            </View>
            <ScrollView style={styles.viewResultSearch}>
              {resultUser?.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.viewItemResultUser}
                    onPress={() => onAddUser(item)}>
                    <Text>
                      {item?.first_name} {item?.last_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <AppButton
              title="グループを追加"
              onPress={handleSubmit}
              styleButton={styles.button}
            />
          </KeyboardAwareScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};

export {CreateRoomChat};
