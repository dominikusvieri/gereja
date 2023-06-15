import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LOCAL_DEVICE_IP } from "@env"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


const MediaScreen = () => {
  const ip = LOCAL_DEVICE_IP
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // handle jenis notif
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority:true
    }),
  });

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
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

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const verifyAuth = async () => {
    setIsLoading(true)
    const accessToken = await SecureStore.getItemAsync('accessToken').finally(function () {
      setIsLoading(false)
    })
    if (accessToken) {
      setIsAuthorized(true)
    }
    else {
      setIsAuthorized(false)
    }
    console.log(accessToken)
  }



  useEffect(() => {
    verifyAuth()
  }, [isAuthorized, useIsFocused()])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textHeaderTitle}>
            Pusat Mail
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Isa Almasih Jemaat Purwodadi
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>
      {/* {isLoading ?
        <View style={styles.unauthorizedContainer}>
          <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
        </View>
        :
        (isAuthorized ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>Title: {notification && notification.request.content.title} </Text>
              <Text>Body: {notification && notification.request.content.body}</Text>
              <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
              title="Press to Send Notification"
              onPress={async () => {
                await sendPushNotification(expoPushToken);
              }}
            />
          </View>
          :
          <View style={styles.unauthorizedContainer}>
            <Text style={styles.unauthorizedTitle}>
              Anda belum login
            </Text>
            <Text style={styles.unauthorizedDesc}>
              Silahkan login untuk melanjutkan
            </Text>
            <TouchableOpacity
              style={styles.unauthorizedButton}
              onPress={() => navigation.navigate('login')}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        )
      } */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#0885F8'
  },
  textHeaderTitle: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16
  },
  unauthorizedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unauthorizedTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4281A4'
  },
  unauthorizedDesc: {
    fontSize: 16,
    color: '#4281A4',
    marginBottom: 12,
  },
  unauthorizedButton: {
    paddingVertical: 12,
    paddingHorizontal: 56,
    backgroundColor: '#4281A4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  loginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500'
  }
})

export default MediaScreen