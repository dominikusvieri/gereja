import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { LOCAL_DEVICE_IP } from "@env"
import axios from "axios";
import UnauthorizedView from "../../../components/UnauthorizedView";
import IbadahScreen from "./IbadahScreen";

export default function OnboardingJadwal() {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)

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

        axios.get(`${LOCAL_DEVICE_IP}/pelayanan/verify`, header)
            .then(function (response) {
                if (response.data.length > 0) {
                    const terdaftar = response.data.some(el => el.statusApproval === 'approved')
                    if (terdaftar) {
                        setIsTerdaftarPelayanan(true)
                    }
                }
                else {
                    setIsTerdaftarPelayanan(false)
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
    }, [isAuthorized])

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View>
                :
                (isAuthorized ?
                    (isTerdaftarPelayanan ?
                        <IbadahScreen />
                        :
                        <View style={styles.belumTerdaftarContainer}>
                            <UnauthorizedView type='terdaftarPelayanan' />
                        </View>
                    )
                    :
                    <UnauthorizedView />
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    },
    belumTerdaftarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 48
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})