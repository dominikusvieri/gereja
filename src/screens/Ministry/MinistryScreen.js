import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const MinistryScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textHeaderTitle}>
            Pusat Ministry
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Isa Almasih Jemaat Purwodadi
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{ marginVertical: 20, paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('PernikahanDetail')}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 150, height: 150, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>
              Pernikahan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PembabtisanDetail')}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 150, height: 150, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>
              Babtis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PenyerahanAnak')}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 150, height: 150, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>
              Penyerahan Anak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AbsensiBabtisan')}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 150, height: 150, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>
              Absensi Babtisan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AbsensiPraNikah')}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 150, height: 150, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>
              Absensi Pra Nikah
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PendaftaranPelayanan')}
          >
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 150, height: 150, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', }}>
              Pendaftaran {"\n"} Pelayanan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

export default MinistryScreen