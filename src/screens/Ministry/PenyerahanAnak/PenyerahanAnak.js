import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const PenyerahanAnak = () => {
    const [jumlahAnak, setJumlahAnak] = useState(0)

    const navigation = useNavigation()

    const handleIncrement = () => {
        setJumlahAnak(jumlahAnak + 1);
    };

    const handleDecrement = () => {
        if (jumlahAnak > 0) {
            setJumlahAnak(jumlahAnak - 1);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                    Syarat Penyerahan Anak
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>
                        1.
                    </Text>
                    <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        Orang tua sudah menjadi anggota GIA Jemaat Purwodadi.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>
                        2.
                    </Text>
                    <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        Bersedia dengan hati yang tulus iklas dan iman menyerahkan anak kepada Tuhan dalam ibadah penyerahan anak di GIA Purwodadi.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>
                        3.
                    </Text>
                    <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        Bersedia datang dan duduk ditempat yang sudah disediakan paling lambat 10 menit sebelum         ibadah dimulai.
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5 }}>
                        4.
                    </Text>
                    <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                        Berjanji akan mendidik anak ini sejak sekarang      dan seterusnya dalam percaya kepada Tuhan Yesus Kristus.
                    </Text>
                </View>

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Jumlah Anak yang Diserahkan:
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#0885F8',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 8,
                        }}
                        onPress={handleDecrement}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 10, fontSize: 20 }}>
                        {jumlahAnak}
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#0885F8',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 8,
                        }}
                        onPress={handleIncrement}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>+</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15, marginTop: 50 }} onPress={() => navigation.navigate('DataPribadi',{param: jumlahAnak})} >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SELANJUTNYA</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default PenyerahanAnak