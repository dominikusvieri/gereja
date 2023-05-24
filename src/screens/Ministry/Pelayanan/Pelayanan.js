import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import TerdaftarPelayanan from "./TerdaftarPelayanan";

export default function Pelayanan({ navigation }) {
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
    }

    const verifyTerdaftarPelayanan = async () => {
        setIsLoading(true)
        const accessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }

        axios.get(`http://192.168.1.6:3001/pelayanan/verify`, header)
            .then(function (response) {
                if (response.data.length > 0) {
                    setIsTerdaftarPelayanan(true)
                    setListPelayanan(response.data)
                }
                else {
                    setIsTerdaftarPelayanan(false)
                    setListPelayanan([])
                }

            })
            .catch(function (error) {
                console.log("Error verifying pelayanan: ", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        verifyAuth()
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            verifyTerdaftarPelayanan()
        }
    }, [isAuthorized, useIsFocused()])

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <View style={styles.unauthorizedContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View>
                :
                (isAuthorized ?
                    (isTerdaftarPelayanan ?
                        <TerdaftarPelayanan
                            listPelayanan={listPelayanan}
                        />
                        :
                        <View style={styles.unauthorizedContainer}>
                            <Text style={{ ...styles.unauthorizedTitle, textAlign: 'center' }}>{"Anda belum terdaftar\nsebagai pelayan"}</Text>
                            <TouchableOpacity
                                style={styles.unauthorizedButton}
                                onPress={() => navigation.navigate('RegistrasiPelayanan')}
                            >
                                <Text style={styles.loginText}>Registrasi Pelayanan</Text>
                            </TouchableOpacity>
                        </View>
                    )
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
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