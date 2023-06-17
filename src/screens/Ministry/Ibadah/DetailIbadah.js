import { View, Text, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Week1 from './Week1';
import Week2 from './Week2';
import Week3 from './Week3';
import Week4 from './Week4';
import Week5 from './Week5';
import moment from 'moment';
import axios from 'axios';
import { LOCAL_DEVICE_IP } from "@env"
import * as SecureStore from 'expo-secure-store'

const DetailIbadah = ({ route }) => {
    const data = route.params.param
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'week1', title: 'Minggu ke-1' },
        { key: 'week2', title: 'Minggu ke-2' },
        { key: 'week3', title: 'Minggu ke-3' },
        { key: 'week4', title: 'Minggu ke-4' },
        { key: 'week5', title: 'Minggu ke-5' },
    ])
    // const [weekCount] = useState(function () {
    //     // const year = moment(data?.tanggal).year()
    //     // const month = moment(data?.tanggal).month() + 1
    //     // var firstOfMonth = new Date(year, month - 1, 1);
    //     // var lastOfMonth = new Date(year, month, 0);

    //     // var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    //     // console.log(Math.ceil(used / 7))
    //     // return Math.ceil(used / 7);

    //     console.log(moment(data?.tanggal).week())
    //     return moment(data?.tanggal).week()
    // })
    const [listJadwal, setListJadwal] = useState([])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'week1': return <Week1 week={1} data={listJadwal} />
            case 'week2': return <Week1 week={2} data={listJadwal} />
            case 'week3': return <Week1 week={3} data={listJadwal} />
            case 'week4': return <Week1 week={4} data={listJadwal} />
            case 'week5': return <Week1 week={5} data={listJadwal} />
        }
    };

    const layout = useWindowDimensions();

    const getJadwalByMonthYear = async () => {
        const storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const month = moment(data?.tanggal).month() + 1
        const year = moment(data?.tanggal).year()
        const config = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` },
            params: {
                month: month,
                year: year
            }
        }

        axios.get(`${LOCAL_DEVICE_IP}/jadwal/bydate`, config)
            .then(function (response) {
                if (response?.data) {
                    let data = response.data
                    if (response.data.length > 0) {
                        const newData = data.map(el => {
                            const firstDayOfMonth = moment(el?.tanggal).clone().startOf('month');
                            const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');

                            const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');

                            return {
                                ...el,
                                'week': Math.ceil((moment(el?.tanggal).date() + offset) / 7)
                            }
                        })
                        setListJadwal(newData)
                    }
                }
            })
            .catch(function (error) {
                console.log("Error getting list of jadwal: ", error)
            })
    }

    useEffect(() => {
        getJadwalByMonthYear()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.textHeaderTitle}>
                        Jadwal Ibadah Gereja
                    </Text>
                    <Text style={styles.textHeaderTitle}>
                        {data?.monthYear}
                    </Text>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color }) => (
                            <Text style={{ color: '#fff' }}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: '#0885F8' }}
                    />
                )}
            />
        </SafeAreaView>

        // <SafeAreaView>
        //     <Text>Detail ibadah</Text>
        // </SafeAreaView>
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
        backgroundColor: '#0885F8'
    },
    textHeaderTitle: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16
    },

})

export default DetailIbadah