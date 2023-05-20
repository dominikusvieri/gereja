import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { LOCAL_DEVICE_IP } from '@env'

const ProfileScreen = ({ route, navigation }) => {
  const localIp = LOCAL_DEVICE_IP
  const [authorized, setAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  })

  const getProfileData = async () => {
    let storedAccessToken = await SecureStore.getItemAsync('accessToken')
    const header = {
      headers: { 'Authorization': `Bearer ${storedAccessToken}` }
    }

    if (header) {
      setIsLoading(true)
      axios.get(`http://192.168.1.6:3001/jemaat`, header)
        .then(function (response) {
          setUser({
            ...user,
            name: response.data[0].nama,
            email: response.data[0].email,
            role: response.data[0].role === 'admin' ? 'Admin' : response.data[0].role === 'user' ? 'Jemaat' : ''
          })
          response.data[0] && setAuthorized(true)
        })
        .catch(function (error) {
          console.log("Error: ", error)
          setAuthorized(false)
        })
        .finally(function () {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    getProfileData()
  }, [useIsFocused()])

  useEffect(() => {
    if (!authorized) {
      navigation.navigate('login')
    }
  }, [authorized])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textHeaderTitle}>
            User Profile
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Isa Almasih Jemaat Purwodadi
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} style={styles.image} />
        <Text style={styles.profileNameText}>
          {authorized ?
            `${user.name}`
            :
            'Please log in to continue\n to the awesommess'}
        </Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Text style={styles.emailText}>{user.role}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.facebook]} onPress={() => navigation.navigate('UbahProfil')}>
          <Text style={styles.buttonText}>Lihat Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.google]} onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 39,
  },
  profileNameText: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  emailText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-around'
  },
  button: {
    width: '48%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  facebook: {
    backgroundColor: '#4267B2'
  },
  google: {
    backgroundColor: '#DB4437'
  }

})

export default ProfileScreen