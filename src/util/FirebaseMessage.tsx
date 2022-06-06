import messaging from '@react-native-firebase/messaging';
import {colors} from '@stylesCommon';
import {showMessage} from 'react-native-flash-message';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
import {getSystemVersion} from 'react-native-device-info';
import {registerToken} from '@services';
import {store} from '../redux/store';

function createAppNotification() {
  let fcmToken = '';
  let lastMessageId = '';

  const initFB = () => {
    requestUserPermisstion();
    messaging().onTokenRefresh((newFcmToken: string) => {
      saveDeviceToken(newFcmToken);
    });

    messaging()
      .getInitialNotification()
      .then(async notification => {
        if (!notification) {
          return;
        }
        if (notification.messageId !== lastMessageId) {
          lastMessageId = notification.messageId || '';
        }
        handleUserInteractionNotification(notification);
      })
      .catch(error => {
        throw error;
      });

    messaging().onMessage(notification => {
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
        handleNotiOnForeground(notification);
      }
    });

    messaging().setBackgroundMessageHandler(async notification => {
      if (notification.messageId !== lastMessageId) {
        lastMessageId = notification.messageId || '';
      }
      handleUserInteractionNotification(notification);
    });
  };

  const requestUserPermisstion = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const newFcmToken = await messaging().getToken();
      fcmToken = newFcmToken;
      saveDeviceToken(newFcmToken);
    }
  };

  const handleNotiOnForeground = async (message: any) => {
    let {notification, data} = message;
    let title = '';
    let bodyMessage = '';
    try {
      title = notification.title;
      bodyMessage = notification.body;
      showMessage({
        backgroundColor: 'rgba(139, 194, 39, 0.8)',
        duration: 5000,
        message: title,
        description: bodyMessage,
        color: '#FFFFFF',
        //@ts-ignore
        onPress: async () => {},
      });
    } catch (error) {}
  };

  const handleUserInteractionNotification = (message: any) => {
    let {notification, data} = message;
    let title = '';
    let bodyMessage = '';
    try {
      title = notification.title;
      bodyMessage = notification.title;
    } catch (error) {}
  };

  const saveDeviceToken = async (newFcmToken: string) => {
    try {
      const data = {
        token: newFcmToken,
        os_version: getSystemVersion(),
        os_name: Platform.OS,
      };
      const response = await registerToken(data);
    } catch (error) {}
  };

  return {
    requestUserPermisstion,
    fcmToken,
    initFB,
  };
}

export const AppNotification = createAppNotification();
