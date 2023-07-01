import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import IbadahCard from './IbadahCard'
import axios from 'axios'
import { LOCAL_DEVICE_IP } from "@env"
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'

export default function Upcoming() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [authorized, setAuthorized] = useState(false)

    const [listJadwal, setListJadwal] = useState([])

    const getListJadwal = async () => {
        setIsLoading(true)
        const storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const config = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        axios.get(`https://giapurwodadi.org/apiV1/jadwal`, config)
            .then(function (response) {
                console.log(JSON.stringify(response.data, null, 2))
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
        getListJadwal()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={listJadwal}
                keyExtractor={item => item.kodeJadwal}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailIbadah', { param: item })}
                            activeOpacity={0.8}
                        >
                            <IbadahCard data={item} index={index} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})