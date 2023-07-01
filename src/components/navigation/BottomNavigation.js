import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../../screens/Home/HomeScreen'
import CommunityScreen from '../../screens/Community/CommunityScreen'
import MinistryScreen from '../../screens/Ministry/MinistryScreen'
import MediaScreen from '../../screens/Media/MediaScreen'
import ProfileScreen from '../../screens/Profile/ProfileScreen'

const Tab = createBottomTabNavigator()

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused ?
              require('../../../assets/HomeActive.png') :
              require('../../../assets/HomeInactive.png');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'contain' }} source={iconSource} />
              </View>
            )
          }
        }}
      />

      <Tab.Screen
        name='Community'
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused ?
              require('../../../assets/CommunityActive.png') :
              require('../../../assets/CommunityInactive.png');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'contain' }} source={iconSource} />
              </View>
            )
          }
        }}
      />

      <Tab.Screen
        name='Ministry'
        component={MinistryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused ?
              require('../../../assets/MinistryActive.png') :
              require('../../../assets/MinistryInactive.png');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'contain' }} source={iconSource} />
              </View>
            )
          }
        }}
      />

      <Tab.Screen
        name='Notification'
        component={MediaScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused ?
              require('../../../assets/MediaActive.png') :
              require('../../../assets/MediaInactive.png');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'contain' }} source={iconSource} />
              </View>
            )
          }
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused ?
              require('../../../assets/ProfileActive.png') :
              require('../../../assets/ProfileInactive.png');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'contain' }} source={iconSource} />
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation