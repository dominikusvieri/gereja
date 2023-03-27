import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation = useNavigation()
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
        <Text style={styles.desc}>{'Please log in to continue\n to the awesommess'}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.facebook]}>
          <Text style={styles.buttonText}>Ganti Profile</Text>
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
  desc: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    color: '#808080'
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