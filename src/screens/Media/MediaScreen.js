import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useIsFocused,useNavigation } from "@react-navigation/native";
import { LOCAL_DEVICE_IP } from "@env"


const MediaScreen = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)
  const [listPelayanan, setListPelayanan] = useState([])

  const navigation = useNavigation()

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

    axios.get(`${LOCAL_DEVICE_IP}/pelayanan/verify`, header)
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
            <Text>Mail</Text>
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