import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AbsensiMainScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 20 }}>
                    Selamat Datang
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>
                        Saudara/i
                    </Text>
                    <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        Nama Orang
                    </Text>
                </View>
                <Text>
                    Silahkan memilih modul absensi sesuai kebutuhan katekisasi anda
                </Text>
                <View style={{ flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-evenly', marginTop:20 }}>
                    <TouchableOpacity style={{backgroundColor: '#0885F8', padding: 15}} onPress={()=>navigation.navigate('AbsensiBabtisan')}>
                        <Text style={{color:'#fff'}}>Pembaptisan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#0885F8', padding: 15}} onPress={()=>navigation.navigate('AbsensiPraNikah')}>
                        <Text style={{color:'#fff'}}>Pra Nikah</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

export default AbsensiMainScreen