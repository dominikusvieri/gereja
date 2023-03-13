import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/Login/LoginScreen'
import RegisterScreen from '../../screens/Register/RegisterScreen'
import BottomNavigation from './BottomNavigation'
import DetailNewsScreen from '../../screens/Home/DetailNewsScreen'
import DetailEventScreen from '../../screens/Home/DetailEventScreen'
import ForgetMain from '../../screens/ForgetPass/ForgetMain'

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{ headerShown: false }} />
                <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='register' component={RegisterScreen} options={{ title: 'Register' }} />
                <Stack.Screen name='forgetPass' component={ForgetMain} options={{ title: 'Forget Password' }}/>
                <Stack.Screen name='DetailNews' component={DetailNewsScreen} options={{ title: 'Berita Terkini' }} />
                <Stack.Screen name='DetailEvent' component={DetailEventScreen} options={{ title: 'Event Terkini' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation