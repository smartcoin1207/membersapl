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
import {updateInfoRoomchat, GlobalService} from '@services';

const EditRoomChat = (props: any) => {
  const navigation = useNavigation<any>();
  const {route} = props;

  const {idRoomChat, dataDetail} = route?.params;

  const [name, setName] = useState<any>(dataDetail?.name);
  const [content, setContent] = useState<any>(dataDetail?.summary_column);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onChangeName = useCallback(
    (value: string) => {
      setName(value);
    },
    [name],
  );

  const onChangeContent = useCallback(
    (value: string) => {
      setContent(value);
    },
    [content],
  );

  const handleSubmit = async () => {
    try {
      const body = {
        room_id: idRoomChat,
        description: content,
        name: name,
      };
      GlobalService.showLoading();
      const response = await updateInfoRoomchat(body);
      onBack();
      GlobalService.hideLoading();
    } catch {
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
        <View style={styles.linearGradient}>
          <KeyboardAwareScrollView
            style={styles.viewForm}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.txtTitle}>グループ名</Text>
            <AppInput placeholder="名称" onChange={onChangeName} value={name} />
            <Text style={styles.txtTitle}>説明</Text>
            <AppInput
              placeholder="名称"
              onChange={onChangeContent}
              value={content}
              multiline={true}
              styleContainer={styles.multiline}
              styleInput={styles.multiline}
            />
            <AppButton
              title="グループを追加"
              onPress={handleSubmit}
              styleButton={styles.button}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export {EditRoomChat};
