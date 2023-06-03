import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

const PenyerahanAnak = () => {
    const [jumlahAnak, setJumlahAnak] = useState(0)

    const navigation = useNavigation()

    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)
    const [listPelayanan, setListPelayanan] = useState([])

    const verifyAuth = async () => {
        setIsLoading(true)
        const accessToken = await SecureStore.getItemAsync('accessToken').finally(function () {
            setIsLoading(false)
        })
        if (accessToken) {
            setIsAuthorized(true)
        }
        else {
            setIsAuthorized(false)
        }
        console.log(accessToken)
    }

    useEffect(() => {
        verifyAuth()
    }, [isAuthorized, useIsFocused()])

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
            {isLoading ?
                <View style={styles.unauthorizedContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View>
                :
                (isAuthorized ?
                    <View>
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



                            <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15, marginTop: 50 }} onPress={() => navigation.navigate('DataPribadi')} >
                                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SELANJUTNYA</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    :
                    <View style={styles.unauthorizedContainer}>
                        <Text style={styles.unauthorizedTitle}>
                            Anda belum login
                        </Text>
                        <Text style={styles.unauthorizedDesc}>
                            Silahkan login untuk melanjutkan
                        </Text>
                        <TouchableOpacity
                            style={styles.unauthorizedButton}
                            onPress={() => navigation.navigate('login')}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
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
    }
})

export default PenyerahanAnak