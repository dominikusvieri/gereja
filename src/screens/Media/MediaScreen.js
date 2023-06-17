import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LOCAL_DEVICE_IP } from "@env"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import PushNotification from 'react-native-push-notification';


const MediaScreen = () => {
  const ip = LOCAL_DEVICE_IP
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()


  // const scheduleNotification = async () => {
  //   // Get the current date and time
  //   const now = 60 * 60 * 1000 * 24 * 7

  //   // Set the date for the desired notification
  //   const desiredDate = new Date('2023-06-23');

  //   // Calculate the time difference between the current date/time and the desired date/time
  //   const timeDiff = desiredDate.getTime() - now

  //   if (timeDiff <= 0) {
  //     console.log('Invalid date or time');
  //     return;
  //   }

  //   // Schedule the notification
  //   const notificationId = await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'Notification Title',
  //       body: 'Notification Body',
  //       data: { data: 'optionalData' },
  //     },
  //     trigger: { seconds: timeDiff / 1000 },
  //     channelId: 'your-channel-id', // You need to create a notification channel if using Android
  //   });

  //   console.log('Notification scheduled:', notificationId);
  // };

  // scheduleNotification();



  

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
        <Text>Mail</Text>
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