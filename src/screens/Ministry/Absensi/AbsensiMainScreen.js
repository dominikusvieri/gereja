import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { TextInput as LabeledInput } from "react-native-paper";

const AbsensiMainScreen = () => {
    const navigation = useNavigation()

    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                            <Text style={{ fontWeight: '500', fontSize: 20 }}>
                                Selamat Datang
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>
                                    Saudara/i
                                </Text>
                            </View>
                            <Text>
                                Silahkan memilih modul absensi sesuai kebutuhan katekisasi anda
                            </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: 20 }}>
                                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15 }} onPress={() => navigation.navigate('AbsensiBabtisan')}>
                                    <Text style={{ color: '#fff' }}>Pembaptisan</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15 }} onPress={() => navigation.navigate('AbsensiPraNikah')}>
                                    <Text style={{ color: '#fff' }}>Pra Nikah</Text>
                                </TouchableOpacity>
                            </View>

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
export default AbsensiMainScreen