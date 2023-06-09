import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCardNews from '../../components/HomeScreen/ItemCardNews'
import { useNavigation } from '@react-navigation/native'
import { LOCAL_DEVICE_IP } from "@env"
import { Buffer } from 'buffer'
import moment from 'moment'

const NewsView = () => {
  const ip = LOCAL_DEVICE_IP
  const [newsData, setNewsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  const calculateReadTime = (text) => {
    const wpm = 225
    const words = text.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)
    return time
  }

  const getAllNews = async () => {
    setIsLoading(true)
    axios.get(`${ip}/news`)
      .then(function (res) {
        const resData = res.data.news
        const cleanedNewsData = []
        resData.map(data => {
          const base64Image = Buffer.from(data.image).toString('base64')
          const readTime = calculateReadTime(data.desc)
          cleanedNewsData.push({ ...data, image: base64Image, readTime: readTime })
        })
        setNewsData(cleanedNewsData)
      })
      .catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // setIsLoading(true)
    // axios.get('  https://fakestoreapi.com/products')
    //   .then(response => response.data)
    //   .then(res => setNewsData(res))
    //   .catch(error => console.error(error))
    //   .finally(() => setIsLoading(false))
    getAllNews()
  }, [])

  const tambahData = () => {
    {
      isLoading ?
        <View className="items-center justify-center">
          <ActivityIndicator size="large" color="#0885F8" />
        </View>
        :
        null
    }
  }

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
            keyExtractor={item => item.id}
            onEndReached={() => tambahData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailNews', { param: item })}
                style={{ flexDirection: 'row', marginBottom: 10, padding: 5, marginTop: 10 }}
              >

                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                  style={{ width: 110, height: 110, borderRadius: 8 }}
                />
                <View style={{ marginLeft: 12, flexWrap: 'wrap', alignItems: 'flex-start', flex: 1, justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }} numberOfLines={3}>
                    {/* {testString.length > 150 ? `${item.title.slice(0, 150)}..` : testString} */}
                    {item.title}
                  </Text>
                  <View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../../../assets/clock.png')}
                        style={{ width: 16, height: 16 }}
                      />
                      <Text style={{ color: 'black', fontSize: 12, marginLeft: 4 }}>
                        {item.readTime} menit baca
                      </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                      <Image
                        source={require('../../../assets/date.png')}
                        style={{ width: 16, height: 16 }}
                      />
                      <Text style={{ color: 'black', fontSize: 12, marginLeft: 4 }}>
                        {moment(item.modifiedAt).format('LLL')}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#BFBFBF"
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