import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import CardCommunityContainer from '../../components/Community/CardCommunityContainer'

const CommunityScreen = () => {
  const [commData, setCommData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    setIsLoading(true)
    axios.get('https://fakestoreapi.com/products')
      .then(response => response.data)
      .then(res => setCommData(res))
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
          Komunitas Gereja
        </Text>
      </View>
      {
        isLoading ?
          <View className="items-center justify-center">
            <ActivityIndicator size="large" color="#0885F8" />
          </View> :
          <ScrollView>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
              {commData.length > 0 ? (
                <>
                  {commData.map((data, i) => (
                    <CardCommunityContainer
                      key={i}
                      imageSrc={data.image}
                      title={data.title}
                      data={data}
                    />
                  ))}
                </>) :
                (<>
                  <View className="w-full h-[600px] items-center space-y-4 justify-center">

                    <Text>
                      Opps.. No Data Found
                    </Text>
                  </View>
                </>)
              }
            </View>
          </ScrollView>
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
  main: {
    padding: 20
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 16
  },

})
export default CommunityScreen