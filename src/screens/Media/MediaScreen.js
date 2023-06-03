import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { LOCAL_DEVICE_IP } from "@env"

const MediaScreen = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)
  const [listPelayanan, setListPelayanan] = useState([])

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

    axios.get(`http://${LOCAL_DEVICE_IP}/pelayanan/verify`, header)
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



  console.log(isAuthorized)
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

})

export default MediaScreen