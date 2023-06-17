import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import ItemCardNews from '../../components/HomeScreen/ItemCardNews'
import { useNavigation } from '@react-navigation/native'
import { LOCAL_DEVICE_IP } from "@env"
import { Buffer } from 'buffer'
import moment from 'moment'

const EventView = () => {
  const [eventData, setEventData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()

  const getAllEvents = async () => {
    axios.get(`${LOCAL_DEVICE_IP}/event`)
      .then(function (res) {
        const resData = res.data.event
        let cleanedEventData = []
        resData.map(data => {
          const base64Image = data.image ? Buffer.from(data?.image).toString('base64') : null
          cleanedEventData.push({ ...data, image: base64Image })
        })
        cleanedEventData.sort(function (a, b) {
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
        setEventData(cleanedEventData)
      })
      .catch(function (err) {
        console.log(err)
      })
      .finally(function () {
        setIsLoading(false)
        setRefreshing(false)
      })
  }

  useEffect(() => {
    // setIsLoading(true)
    // axios.get('https://fakestoreapi.com/products')
    //   .then(response => response.data)
    //   .then(res => setNewsData(res))
    //   .catch(error => console.error(error))
    //   .finally(() => setIsLoading(false))
    setIsLoading(true)
    getAllEvents()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getAllEvents()
  }, [])

  return (
    <View style={styles.main}>
      <Text style={styles.sectionHeader}>
        Event Terkini Gereja
      </Text>
      {
        isLoading ?
          <View>
            <ActivityIndicator size="large" color="#0885F8" />
          </View>
          :
          <FlatList
            data={eventData}
            keyExtractor={item => item.id}
            style={{ paddingBottom: 44, paddingHorizontal: 24 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0885F8"]} />
            }
            ListEmptyComponent={
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 220 }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 96, height: 96, backgroundColor: '#ced4da', borderRadius: 110 / 2 }}>
                  <Image
                    source={require('../../../assets/not_found.png')}
                    style={{ width: 70, height: 70 }}
                  />
                </View>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#adb5bd', marginTop: 12 }}>Tidak ada event</Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailEvent', { param: item })}
                style={{ flexDirection: 'row', marginBottom: 10, paddingVertical: 5, marginTop: 10 }}
              >
                {item?.image ?
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                    style={{ width: 110, height: 110, borderRadius: 8 }}
                  />
                  :
                  <Image
                    source={require('../../../assets/noimage_news.png')}
                    style={{ width: 110, height: 110, borderRadius: 8, resizeMode: 'contain', backgroundColor: '#e9ecef' }}
                  />
                }
                <View style={{ marginLeft: 12, flexWrap: 'wrap', alignItems: 'flex-start', flex: 1, justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: '500', fontSize: 16 }} numberOfLines={3}>
                    {item?.title}
                  </Text>
                  <View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={require('../../../assets/date.png')}
                        style={{ width: 16, height: 16 }}
                      />
                      <Text style={{ color: 'black', fontSize: 12, marginLeft: 4 }}>
                        Diselenggarakan: {moment(item?.schedule).format('LL')}
                      </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                      <Image
                        source={require('../../../assets/form.png')}
                        style={{ width: 16, height: 16 }}
                      />
                      <Text style={{ color: 'black', fontSize: 12, marginLeft: 4 }}>
                        Registrasi: {moment(item?.regisration_date).format('LL')}
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
                    backgroundColor: "#BFBFBF",
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
    paddingTop: 20,
    paddingBottom: 44
  },
  sectionHeader: {
    padding: 5,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 24
  },
  itemCard: {
    marginTop: 10,

  }

})

export default EventView