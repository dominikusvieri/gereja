import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const AbsensiPranikah = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>
                        Nama :
                    </Text>
                    <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        Nama Orang
                    </Text>
                </View>
                <View style={{borderRadius:5, borderColor:'black', borderWidth:1, padding:5}}>
                    <Text style={{ fontWeight: '500', fontSize: 18 }}>
                        Modul Pranikah
                    </Text>
                    <View style={{ flexDirection: 'row', flex: 2, marginTop:5 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Tujuan Pernikahan</Text>
                            <Text>Tanggal</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 5, borderWidth: 1, borderColor: 'black', padding: 5, marginRight:10 }}>
                                <Text style={{color:'red'}}>Absen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 2, marginTop:5 }}>
                        <View style={{ flex: 1 }}>
                            <Text>Tujuan Pernikahan</Text>
                            <Text>Tanggal</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ borderRadius: 5, borderWidth: 1, borderColor: 'black', padding: 5, marginRight:10 }}>
                                <Text style={{color:'green'}}>Absen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default AbsensiPranikah