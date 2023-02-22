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
              require('../../../assets/HomeActive.svg') :
              require('../../../assets/HomeInactive.svg');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'stretch' }} source={iconSource} />
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
              require('../../../assets/CommunityActive.svg') :
              require('../../../assets/CommunityInactive.svg');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'stretch' }} source={iconSource} />
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
              require('../../../assets/MinistryActive.svg') :
              require('../../../assets/MinistryInactive.svg');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'stretch' }} source={iconSource} />
              </View>
            )
          }
        }}
      />

      <Tab.Screen
        name='Media'
        component={MediaScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            const iconSource = focused ?
              require('../../../assets/MediaActive.svg') :
              require('../../../assets/MediaInactive.svg');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'stretch' }} source={iconSource} />
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
              require('../../../assets/ProfileActive.svg') :
              require('../../../assets/ProfileInactive.svg');
            return (
              <View>
                <Image style={{ width: 24, height: 20, resizeMode: 'stretch' }} source={iconSource} />
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNavigation