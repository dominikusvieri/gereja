import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import CardCommunityContainer from '../../components/Community/CardCommunityContainer'

const CommunityScreen = () => {
  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()


  useEffect(() => {
    setIsLoading(true)
    axios.get('https://fakestoreapi.com/products')
      .then(response => response.data)
      .then(res => setNewsData(res))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false))

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textHeaderTitle}>
            Pusat Komunitas
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Isa Almasih Jemaat Purwodadi
          </Text>
        </View>
      </View>

      <View style={styles.main}>
        <Text style={styles.sectionHeader}>
          Daftar Komunitas Gereja
        </Text>
        {
          isLoading ?
            <View className="items-center justify-center">
              <ActivityIndicator size="large" color="#0885F8" />
            </View> :
            <FlatList
              data={newsData}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailComm', { param: item })}
                  style={{ flexDirection: 'row', marginBottom: 5, padding: 5, marginTop: 10 }}
                >
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {item.title.length > 20 ? `${item.title.slice(0, 20)}..` : item.title}
                    </Text>
                    <Text style={{ fontWeight: '500', color: '#b1b1b1', fontSize: 10 }}>
                      {item.category} / 2023-10-12
                    </Text>
                    {/* <Text style={{ fontWeight: '500', color: '#b1b1b1', fontSize: 10 }}>
                      {item.category} / {item.komsel_date}
                    </Text> */}
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: "#000",
                    }}
                  />
                );
              }}
            />

        }

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
  main: {
    padding: 20
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 16
  },

})
export default CommunityScreen