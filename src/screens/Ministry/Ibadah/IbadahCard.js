import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import { useNavigation } from '@react-navigation/native'
import axios from "axios";
import { LOCAL_DEVICE_IP } from "@env"
import * as SecureStore from 'expo-secure-store'

export default function IbadahCard({ data, index, type }) {
    const navigation = useNavigation()
    const [title] = useState('Ibadah Raya Pagi')
    const [fullDate, setFullDate] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [statusPenukaran, setStatusPenukaran] = useState('')

    const getStatusPenukaran = async (detailJadwal) => {
        if (detailJadwal) {
            setIsLoading(true)
            let storedAccessToken = await SecureStore.getItemAsync('accessToken')
            const config = {
                params: {
                    kodeJadwal: detailJadwal.kodeJadwal,
                    noJemaat: detailJadwal.noJemaat,
                    kodePelayanan: detailJadwal.kodePelayanan
                },
                headers: { 'Authorization': `Bearer ${storedAccessToken}` }
            }

            axios.get(`https://giapurwodadi.org/apiV1/tukar-jadwal/status-penukaran`, config)
                .then(function (res) {
                    if (res.data) {
                        setStatusPenukaran(res.data.statusApproval)
                    }
                    else {
                        setStatusPenukaran('')
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
                .finally(function () {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        if (data) {
            setDay(moment(data?.tanggal).format('D'))
            setMonth(moment(data?.tanggal).format('MMMM'))
            setYear(moment(data?.tanggal).format('YYYY'))
            setFullDate(moment(data?.tanggal).format('LL'))
            getStatusPenukaran(data?.detailjadwals[0])
        }
    }, [])

    return (
        <View style={{ ...styles.container, marginTop: index === 0 ? 24 : 0 }}>
            {type === 'mySchedule' ?
                <View style={styles.cardContainer}>
                    {/* <Image
                        source={require('../../../../assets/jadwal_thumbnail.jpg')}
                        style={styles.cardThumbnail}
                    /> */}
                    <View style={styles.descContainer}>
                        <Text style={styles.jadwalTitle}>
                            {data?.ibadah?.namaIbadah}
                        </Text>
                        <Text style={styles.dateText}>
                            {fullDate}
                        </Text>
                        {/* <Text style={{ ...styles.jadwalTitle, paddingTop: 4 }}>
                            Posisi pelayanan
                        </Text>
                        <Text style={styles.jadwalDesc}>
                            {data?.detailjadwals[0]?.jenispelayanan.namaPelayanan}
                        </Text> */}
                        <Text style={{ ...styles.timeText, paddingTop: 4 }}>
                            Pukul {data?.kodeIbadah && (data.kodeIbadah === 'IRP-001') ? '07.00' : '17.00'}
                        </Text>
                        {statusPenukaran &&
                            <View>
                                <Text style={{ ...styles.jadwalTitle, paddingTop: 4 }}>
                                    Status penukaran
                                </Text>
                                <Text style={styles.jadwalDesc}>
                                    {statusPenukaran.charAt(0).toUpperCase() + statusPenukaran.slice(1)}
                                </Text>
                            </View>
                        }
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.pelayananText}>{data?.detailjadwals[0]?.jenispelayanan.namaPelayanan}</Text>
                        {/* <Text style={styles.monthYearText}>
                            {month}
                        </Text>
                        <Text style={styles.monthYearText}>
                            {year}
                        </Text> */}
                    </View>
                </View>
                :
                <View style={styles.cardContainer}>
                    <Image
                        source={require('../../../../assets/jadwal_thumbnail.jpg')}
                        style={styles.cardThumbnail}
                    />
                    <View style={styles.descContainer}>
                        <Text style={styles.jadwalTitle}>
                            {data?.ibadah?.namaIbadah}
                        </Text>
                        <Text style={styles.jadwalDesc}>
                            {data?.kodeIbadah}
                        </Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{day}</Text>
                        <Text style={styles.monthYearText}>
                            {month}
                        </Text>
                        <Text style={styles.monthYearText}>
                            {year}
                        </Text>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginBottom: 24
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        height: 120,
        // elevation: 10,
        borderRadius: 16,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    cardThumbnail: {
        height: '25%',
        width: '100%'
    },
    descContainer: {
        // height: '100%',
        // width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        flex: 3,
        justifyContent: 'center'
    },
    jadwalTitle: {
        fontSize: 16,
        fontWeight: '500',
        // paddingRight: 110,
        color: 'red'
    },
    timeText: {
        fontSize: 16,
        color: '#646464',
        fontWeight: '500',
        marginTop: 2
    },
    jadwalDesc: {
        fontSize: 14
    },
    dateContainer: {
        // position: 'absolute',
        flex: 2,
        // backgroundColor: 'red',
        // borderRadius: 8,
        // elevation: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 2
    },
    pelayananText: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 24,
        paddingRight: 24,
        fontWeight: '500',
        color: '#646464'
    },
    monthYearText: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#1034A6'
    }
})