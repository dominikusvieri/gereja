import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, useWindowDimensions, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Upcoming from './Upcoming';
import Past from './Past';
import axios from 'axios';
import { LOCAL_DEVICE_IP } from "@env";

const IbadahScreen = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'past', title: 'Past' }
  ])
  const [listBulan, setListBulan] = useState([])

  const renderScene = SceneMap({
    upcoming: Upcoming,
    past: Past
  })
  const layout = useWindowDimensions()

  const navigation = useNavigation()

  const getIbadahPerBulan = async () => {
    const storedAccessToken = await SecureStore.getItemAsync('accessToken')
    const config = {
      headers: { 'Authorization': `Bearer ${storedAccessToken}` }
    }

    axios.get(`${LOCAL_DEVICE_IP}/jadwal/groupby-monthyear`, config)
      .then(function (response) {
        if (response?.data) {
          setListBulan(response.data)
        }
      })
      .catch(function (error) {
        console.log("Error getting group jadwal by bulan", error)
      })
      .finally(function () {

      })
  }

  useEffect(() => {
    getIbadahPerBulan()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20, paddingTop: StatusBar.currentHeight }}>
      <View>
        <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 5 }}>
            Ibadah Gereja Isa Almasih
          </Text>

          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => navigation.navigate('MySchedule')}
          >
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>My Schedule</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 5 }}>
            Jadwal Ibadah Per Bulan
          </Text>

          {listBulan?.map((bulan, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.nextButton}
                onPress={() => navigation.navigate('DetailIbadah', { param: bulan })}
              >
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>{bulan?.monthYear}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

    </View>

    // <SafeAreaView style={styles.container}>
    //   <View style={styles.headerContainer}>
    //     <Text style={styles.headerText}>Jadwal ibadah</Text>
    //   </View>

    //   <TabView
    //     navigationState={{ index, routes }}
    //     renderScene={renderScene}
    //     onIndexChange={setIndex}
    //     initialLayout={{ width: layout.width }}
    //     renderTabBar={props => (
    //       <TabBar
    //         {...props}
    //         renderLabel={({ route }) => (
    //           <Text style={{ fontSize: 16, fontWeight: '500' }}>
    //             {route.title}
    //           </Text>
    //         )}
    //         style={{ backgroundColor: '#fff' }}
    //         indicatorStyle={{ backgroundColor: 'blue' }}
    //       />
    //     )}
    //   />
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  headerStyle: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#0885F8'
  },
  cardTextDesc: {
    fontSize: 14,
    color: 'white',
  },
  cardTextTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
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
  },
  nextButton: {
    height: 48,
    backgroundColor: '#4281A4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  changeButton: {
    height: 48,
    backgroundColor: '#DB4437',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  // UI redesign
  headerContainer: {
    display: 'flex',
    padding: 24,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500'
  }
})

export default IbadahScreen