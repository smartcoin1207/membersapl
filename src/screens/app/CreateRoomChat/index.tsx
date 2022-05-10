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
import {debounce} from 'lodash';

import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getListUser, createRoom, GlobalService, inviteMember} from '@services';

const CreateRoomChat = (props: any) => {
  const navigation = useNavigation<any>();
  const {route} = props;

  const {typeScreen, idRoomchat} = route?.params;

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

  const debounceText = useCallback(
    debounce(text => onSearch(text), 500),
    [],
  );

  const onSearchName = (value: string) => {
    setKey(value);
    debounceText(value);
  };

  const onSearch = async (keySearch: any) => {
    try {
      if (keySearch?.length > 0) {
        const result = await getListUser({name: keySearch});
        setResultUser(result?.data?.users?.data);
      }
    } catch (error) {}
  };

  const onAddUser = (item: any) => {
    setListUser(listUser?.concat([item]));
    setResultUser([]);
    setKey(null);
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
    if (typeScreen === 'CREATE') {
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
    } else {
      try {
        GlobalService.showLoading();
        const body = {
          room_id: idRoomchat,
          user_id: renderIdUser(),
        };
        const result = await inviteMember(body);
        navigation.goBack();
        GlobalService.hideLoading();
      } catch (error) {
        GlobalService.hideLoading();
      }
    }
  };

  const validateDisabled = () => {
    if (typeScreen === 'CREATE') {
      if (name && name?.length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
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
        <View style={styles.linearGradient}>
          <KeyboardAwareScrollView
            style={styles.viewForm}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.txtTitle}>テキストテキストテキスト。</Text>
            {typeScreen === 'CREATE' && (
              <AppInput placeholder="名称" onChange={onChange} value={name} />
            )}
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
                onSubmitEditing={() => onSearch(key)}
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
              disabled={validateDisabled()}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export {CreateRoomChat};
