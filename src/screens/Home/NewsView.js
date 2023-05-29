import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCardNews from '../../components/HomeScreen/ItemCardNews'
import { useNavigation } from '@react-navigation/native'




const NewsView = () => {
  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()


  useEffect(() => {
    setIsLoading(true)
    axios.get('  https://0c94-2001-448a-2020-8c4a-5cfb-2199-ac6e-123d.ngrok-free.app/news')
      .then(response => response.data.news)
      .then(res => setNewsData(res))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false)) 
      
  }, [])

  return (
    <View style={styles.main}>
      <Text style={styles.sectionHeader}>
        Kabar Terkini Gereja
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
                onPress={() => navigation.navigate('DetailNews', { param: item })}
                style={{ flexDirection: 'row', marginBottom: 5, padding: 5, marginTop: 10 }}
              >
                
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 50, height: 50 }}
                />
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {item.title.length > 20 ? `${item.title.slice(0, 20)}..` : item.title}
                  </Text>
                  <Text style={{ fontWeight: '500', color: '#b1b1b1', fontSize: 10 }}>
                    {item.penulis} / {item.createdAt}
                  </Text>
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
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10
  },
  itemCard: {
    marginTop: 10,

  }

})

export default NewsView