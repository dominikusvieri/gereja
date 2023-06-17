import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { LOCAL_DEVICE_IP } from "@env"
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react";
import IbadahCard from "./IbadahCard";

export default function MySchedule() {
    const [isLoading, setIsLoading] = useState(false)
    const [listJadwal, setListJadwal] = useState([])

    const getMyJadwal = async () => {
        setIsLoading(true)
        const storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const config = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        axios.get(`${LOCAL_DEVICE_IP}/jadwal/jadwal-user`, config)
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
            <FlatList
                data={listJadwal}
                keyExtractor={item => item.kodeJadwal}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <IbadahCard data={item} index={index} type="mySchedule" />
                    )
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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