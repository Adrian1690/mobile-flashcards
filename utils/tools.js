import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export const between = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(async (data) => {
      if (data === null) {
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          schedulePushNotification();

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      }
    });
}

export async function schedulePushNotification() {
  let trigger = new Date();
  trigger.setDate(trigger.getDate() + 1);
  trigger.setHours(20);
  trigger.setMinutes(0);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Resolve a quiz!',
      body: `👋 Don't forget resolve a quiz for today`,
      //data: { data: 'goes here' },
    },
    trigger,
    //trigger: { seconds: 2 }
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    //alert(existingStatus)

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      //alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    //alert('Must use physical device for Push Notifications');
    return;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const clearNotifications = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};
