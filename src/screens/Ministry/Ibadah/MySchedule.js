import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import axios from "axios";
import { LOCAL_DEVICE_IP } from "@env"
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react";
import IbadahCard from "./IbadahCard";
import { useNavigation } from "@react-navigation/native";

export default function MySchedule() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [listJadwal, setListJadwal] = useState([])

    const getMyJadwal = async () => {
        setIsLoading(true)
        const storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const config = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        axios.get(`https://giapurwodadi.org/apiV1/jadwal/jadwal-user`, config)
            .then(function (response) {
                if (response?.data) {
                    const sortedData = response.data.sort(function (a, b) {
                        return new Date(a?.tanggal) - new Date(b?.tanggal)
                    })
                    setListJadwal(sortedData)
                }
            })
            .catch(function (error) {
                console.log("Error getting list of jadwal: ", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getMyJadwal()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {listJadwal.length > 0 ?
                <FlatList
                    data={listJadwal}
                    keyExtractor={item => item.kodeJadwal}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TukarJadwal', { param: item })}
                            >
                                <IbadahCard data={item} index={index} type="mySchedule" />
                            </TouchableOpacity>
                        )
                    }}
                />
                :
                <View style={{ display: 'flex', height: Dimensions.get('window').height - 120, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../../../assets/not_found.png')}
                        style={{ width: 70, height: 70 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#adb5bd', marginTop: 12 }}>
                        Tidak ada jadwal
                    </Text>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    headerContainer: {
        display: 'flex',
        padding: 24,
        backgroundColor: '#fff'
    },
    headerText: {
        fontSize: 22,
        fontWeight: '500'
    }
})