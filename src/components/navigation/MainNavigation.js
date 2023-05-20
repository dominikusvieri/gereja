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
import DetailCommunity from '../../screens/Community/DetailCommunity'
import PernikahanDetail from '../../screens/Ministry/Pernikahan/PernikahanDetail'
import PembabtisanDetail from '../../screens/Ministry/PembabtisanDetail'
import PenyerahanAnak from '../../screens/Ministry/PenyerahanAnak/PenyerahanAnak'
import DataPribadi from '../../screens/Ministry/PenyerahanAnak/DataPribadi'
import AbsensiBabtisan from '../../screens/Ministry/AbsensiBabtisan'
import AbsensiPranikah from '../../screens/Ministry/AbsensiPranikah'
import ProfileScreen from '../../screens/Profile/ProfileScreen'
import PernikahanDetail2 from '../../screens/Ministry/Pernikahan/PernikahanDetail2'
import TandaTanganPria from '../../screens/Ministry/Pernikahan/TandaTanganPria'
import TandaTanganWanita from '../../screens/Ministry/Pernikahan/TandaTanganWanita'

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="profile" component={ProfileScreen} />
                <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='register' component={RegisterScreen} options={{ title: 'Register', headerShown: false }} />
                <Stack.Screen name='forgetPass' component={ForgetMain} options={{ title: 'Forget Password' }} />
                <Stack.Screen name='DetailNews' component={DetailNewsScreen} options={{ title: 'Berita Terkini' }} />
                <Stack.Screen name='DetailEvent' component={DetailEventScreen} options={{ title: 'Event Terkini' }} />
                <Stack.Screen name='DetailComm' component={DetailCommunity} options={{ title: 'Komunitas Gereja' }} />
                <Stack.Screen name='PernikahanDetail' component={PernikahanDetail} options={{ title: 'Pernikahan' }} />
                <Stack.Screen name='PernikahanDetailWanita' component={PernikahanDetail2} options={{ title: 'Pernikahan' }} />
                <Stack.Screen name='PembabtisanDetail' component={PembabtisanDetail} options={{ title: 'Pembabtisan' }} />
                <Stack.Screen name='PenyerahanAnak' component={PenyerahanAnak} options={{ title: 'Penyerahan Anak' }} />
                <Stack.Screen name='DataPribadi' component={DataPribadi} options={{ title: 'Data Pribadi' }} />
                <Stack.Screen name='AbsensiBabtisan' component={AbsensiBabtisan} options={{ title: 'Absensi Babtisan' }} />
                <Stack.Screen name='AbsensiPraNikah' component={AbsensiPranikah} options={{ title: 'Absensi Ketekisasi Pra Nikah' }} />
                <Stack.Screen name='TTDPria' component={TandaTanganPria} options={{ title: 'Pernikahan' }} />
                <Stack.Screen name='TTDWanita' component={TandaTanganWanita} options={{ title: 'Pernikahan' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation