import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View, Image, Text, Dimensions, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LOCAL_DEVICE_IP } from "@env"
import IbadahCard from "../Ministry/Ibadah/IbadahCard";

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


const MediaScreen = () => {
  const ip = LOCAL_DEVICE_IP
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)
  const [listPelayanan, setListPelayanan] = useState([])
  const [isRequestTukar, setIsRequestTukar] = useState('')
  const [statusPenukaran, setStatusPenukaran] = useState('')
  const [listPenukaran, setListPenukaran] = useState([])

  // handle jenis notif
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

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

    return token;
  }


  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [listJadwal, setListJadwal] = useState([])

  const getMyJadwal = async () => {
    setIsLoading(true)
    const storedAccessToken = await SecureStore.getItemAsync('accessToken')
    const config = {
      headers: { 'Authorization': `Bearer ${storedAccessToken}` }
    }

    axios.get(`https://giapurwodadi.org/apiV1/jadwal/jadwal-user`, config)
      .then(function (response) {
        if (response?.data) {
          const sortedData = response.data.sort(function (a, b) {
            return new Date(a?.tanggal) - new Date(b?.tanggal)
          })
          setListJadwal(sortedData)
        }
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Anda Memiliki Jadwal Pelayanan',
            body: "Silahkan Cek MySchedule Pelayanan Anda",
          },
          trigger: null,
        })
      })
      .catch(function (error) {
        console.log("Error getting list of jadwal: ", error)
      })
      .finally(function () {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getMyJadwal()
  }, [])

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

  const verifyTerdaftarPelayanan = async () => {
    setIsLoading(true)
    const accessToken = await SecureStore.getItemAsync('accessToken')
    const header = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }

    axios.get(`https://giapurwodadi.org/apiV1/pelayanan/verify`, header)
      .then(function (response) {
        if (response.data.length > 0) {
          setIsTerdaftarPelayanan(true)
          setListPelayanan(response.data)
        }
        else {
          setIsTerdaftarPelayanan(false)
          setListPelayanan([])
        }

      })
      .catch(function (error) {
        console.log("Error verifying pelayanan: ", error)
      })
      .finally(function () {
        setIsLoading(false)
      })
  }

  const getNotifikasiJemaat = async () => {
    setIsLoading(true)
    const accessToken = await SecureStore.getItemAsync('accessToken')
    const header = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }

    axios.get(`https://giapurwodadi.org/apiV1/tukar-jadwal/status-penukaran`, config)
      .then(function (res) {
        if (res?.data) {
          const status = res.data.some(el => el.statusApproval === 'pending')
          setStatusPenukaran(status ? 'pending' : '')
          const isRequest = res.data.some(el => el.jemaatSrc === data?.detailjadwals[0]?.noJemaat && el.statusApproval === 'pending')
          setIsRequestTukar(isRequest)
          setListPenukaran(res.data)
        }
        else {
          setStatusPenukaran('')
        }
      })
      .catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    verifyAuth()
  }, [isAuthorized, useIsFocused()])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textHeaderTitle}>
            Pusat Media
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Isa Almasih Jemaat Purwodadi
          </Text>
        </View>
      </View>
      {isLoading ?
        <View style={styles.unauthorizedContainer}>
          <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
        </View>
        :
        (isAuthorized ?
          <View>
            {listJadwal.length > 0 ?
              <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MySchedule')}
                  style={{backgroundColor:'#fff', borderWidth: 1, flexDirection: 'row', marginBottom: 5, padding: 5, marginTop: 10, borderRadius: 10 }}
                >
                  <View style={{ marginLeft: 5, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      Anda Memiliki Jadwal Pelayanan
                    </Text>
                    <Text style={{ fontWeight: '500', color: '#b1b1b1', fontSize: 10, paddingBottom: 10 }}>
                      Silahkan klik pesan ini untuk melihat jadwal pelayanan
                    </Text>
                    {/* <Text style={{ fontWeight: '500', color: '#b1b1b1', fontSize: 10 }}>
                      {item.category} / {item.komsel_date}
                    </Text> */}
                  </View>
                </TouchableOpacity>
              </View>


              :
              <View style={{ display: 'flex', height: Dimensions.get('window').height - 120, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#adb5bd', marginTop: 12 }}>
                  Tidak Pesan
                </Text>
              </View>
            }
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
      }
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
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