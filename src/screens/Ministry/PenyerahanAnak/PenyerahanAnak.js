import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { TextInput as LabeledInput } from "react-native-paper";

const PenyerahanAnak = () => {
    const [jumlahAnak, setJumlahAnak] = useState(0)

    const navigation = useNavigation()

    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)
    const [listPelayanan, setListPelayanan] = useState([])

    const [formCount, setFormCount] = useState(1);

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



    const handleInputChange = (text) => {
        // konversi input menjadi bilangan bulat
        const count = parseInt(text);
        if (isNaN(count)) {
            // jika input bukan angka, set jumlah form menjadi 1
            setFormCount(1);
        } else {
            // jika input angka, set jumlah form sesuai input
            setFormCount(count);
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
                            <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 5 }}>
                                Syarat Penyerahan Anak
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>
                                    1.
                                </Text>
                                <Text style={{ marginBottom: 5 }}>
                                    Orang tua sudah menjadi anggota GIA Jemaat Purwodadi.
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>
                                    2.
                                </Text>
                                <Text style={{ marginBottom: 5 }}>
                                    Bersedia dengan hati yang tulus iklas dan iman menyerahkan anak kepada Tuhan dalam ibadah penyerahan anak di GIA Purwodadi.
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>
                                    3.
                                </Text>
                                <Text style={{ marginBottom: 5 }}>
                                    Bersedia datang dan duduk ditempat yang sudah disediakan paling lambat 10 menit sebelum ibadah dimulai.
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>
                                    4.
                                </Text>
                                <Text style={{ marginBottom: 5 }}>
                                    Berjanji akan mendidik anak ini sejak sekarang dan seterusnya dalam percaya kepada Tuhan Yesus Kristus.
                                </Text>
                            </View>

                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Jumlah Anak yang Diserahkan:
                            </Text>
                            <LabeledInput
                                label='Jumlah Anak'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleInputChange}
                                keyboardType='numeric'
                            />


                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={() => navigation.navigate('DataPribadi', { param: formCount })}
                            >
                                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Selanjutnya</Text>
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
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
})

export default PenyerahanAnak