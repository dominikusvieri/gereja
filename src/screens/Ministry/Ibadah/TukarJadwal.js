import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import axios from "axios";
import * as SecureStore from "expo-secure-store"
import { LOCAL_DEVICE_IP } from "@env"
import { useIsFocused } from "@react-navigation/native";

export default function TukarJadwal({ route, navigation }) {
    const data = route.params.param
    const [isRequestTukar, setIsRequestTukar] = useState('')
    const [statusPenukaran, setStatusPenukaran] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [listPenukaran, setListPenukaran] = useState([])

    const getStatusPenukaran = async () => {
        const detailJadwal = data?.DetailJadwals[0]
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

            axios.get(`${LOCAL_DEVICE_IP}/tukar-jadwal/status-penukaran`, config)
                .then(function (res) {
                    if (res?.data) {
                        const status = res.data.some(el => el.statusApproval === 'pending')
                        setStatusPenukaran(status ? 'pending' : '')
                        const isRequest = res.data.some(el => el.jemaatSrc === data?.DetailJadwals[0]?.noJemaat && el.statusApproval === 'pending')
                        setIsRequestTukar(isRequest)
                        setListPenukaran(res.data)
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

    const cancelTukarJadwal = async () => {
        const detailJadwal = data?.DetailJadwals[0]
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

            axios.delete(`${LOCAL_DEVICE_IP}/tukar-jadwal/delete`, config)
                .then(function (res) {
                    if (res?.data) {
                        console.log(res?.data)
                        setStatusPenukaran('')
                        getStatusPenukaran()
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

    const confirmTukarJadwal = async (confirmStatus) => {
        const detailJadwal = data?.DetailJadwals[0]
        if (confirmStatus && detailJadwal) {
            setIsLoading(true)
            let storedAccessToken = await SecureStore.getItemAsync('accessToken')
            const config = {
                headers: { 'Authorization': `Bearer ${storedAccessToken}` }
            }
            const body = {
                kodeJadwal: detailJadwal.kodeJadwal,
                noJemaat: detailJadwal.noJemaat,
                kodePelayanan: detailJadwal.kodePelayanan,
                confirmStatus: confirmStatus
            }

            axios.put(`${LOCAL_DEVICE_IP}/tukar-jadwal/update-status`, body, config)
                .then(function (res) {
                    if (res?.data) {
                        console.log(res?.data)
                        setStatusPenukaran('')
                        getStatusPenukaran()
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
        getStatusPenukaran()
    }, [useIsFocused()])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.headerText}>Tukar Jadwal</Text>

                <View>
                    <Text style={styles.descTitle}>Kode jadwal</Text>
                    <Text>{data?.kodeJadwal}</Text>
                </View>
                <View>
                    <Text style={styles.descTitle}>Nama ibadah</Text>
                    <Text>{data?.Ibadah?.namaIbadah}</Text>
                </View>
                <View>
                    <Text style={styles.descTitle}>Tanggal</Text>
                    <Text>{moment(data?.tanggal).format('LL')}</Text>
                </View>
                <View>
                    {statusPenukaran !== 'pending' ?
                        <TouchableOpacity
                            style={styles.buttonTukarJadwal}
                            onPress={() => navigation.navigate('DetailTukarJadwal', { param: data })}
                        >
                            <Text style={styles.textButtonTukarJadwal}>Tukar jadwal</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ marginTop: 24 }}>
                            <Text style={styles.textRed}>{isRequestTukar ? '* Jadwal ini dalam proses penukaran' : '* Anda mendapat permintaan tukar jadwal'}</Text>
                            {isRequestTukar ?
                                <TouchableOpacity
                                    style={{ ...styles.buttonTukarJadwal, backgroundColor: 'red', marginTop: 16 }}
                                    onPress={cancelTukarJadwal}
                                >
                                    <Text style={styles.textButtonTukarJadwal}>Batalkan tukar jadwal</Text>
                                </TouchableOpacity>
                                :
                                <View>
                                    <TouchableOpacity
                                        style={{ ...styles.buttonTukarJadwal, marginTop: 4, marginBottom: 0 }}
                                        onPress={() => confirmTukarJadwal('approved')}
                                    >
                                        <Text style={styles.textButtonTukarJadwal}>Terima</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.buttonTukarJadwal, backgroundColor: 'red', marginTop: 16, marginBottom: 0 }}
                                        onPress={() => confirmTukarJadwal('denied')}
                                    >
                                        <Text style={styles.textButtonTukarJadwal}>Tolak</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    }
                </View>
                <Text style={{ ...styles.descTitle, marginBottom: 8, marginTop: 24 }}>Pengajuan tukar jadwal</Text>
                <View style={styles.riwayatCard}>
                    {!listPenukaran || listPenukaran.length === 0 ?
                        <Text style={styles.textRed}>Tidak ada pengajuan tukar jadwal</Text>
                        :
                        listPenukaran.map(tukarJadwal => {
                            if (tukarJadwal.statusApproval === 'pending') {
                                return (
                                    <View key={tukarJadwal.id}>
                                        <Text style={{ ...styles.riwayatCardAttribute, marginTop: 0 }}>Jenis pelayanan:</Text>
                                        <Text>{tukarJadwal?.JenisPelayanan?.namaPelayanan}</Text>
                                        <Text style={styles.riwayatCardAttribute}>Jadwal asal:</Text>
                                        <Text>
                                            Ibadah: {tukarJadwal?.KodeJadwalSrc?.Ibadah?.namaIbadah} - {moment(tukarJadwal?.KodeJadwalSrc?.tanggal).format('LL')}
                                        </Text>
                                        <Text>Nama petugas: {tukarJadwal.JemaatSrc.nama} - {tukarJadwal.jemaatSrc}</Text>
                                        <Text style={styles.riwayatCardAttribute}>Jadwal tujuan:</Text>
                                        <Text>
                                            Ibadah: {tukarJadwal?.KodeJadwalDest?.Ibadah?.namaIbadah} - {moment(tukarJadwal?.KodeJadwalSrc?.tanggal).format('LL')}
                                        </Text>
                                        <Text>Nama petugas: {tukarJadwal.JemaatDest.nama} - {tukarJadwal.jemaatDest}</Text>
                                        <Text style={styles.riwayatCardAttribute}>Status:</Text>
                                        <Text>{tukarJadwal.statusApproval.toString().charAt(0).toUpperCase()}{tukarJadwal.statusApproval.slice(1)}</Text>
                                        <Text style={styles.riwayatCardAttribute}>Diajukan pada:</Text>
                                        <Text>{moment(tukarJadwal.createdAt).format('LLL')}</Text>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 20
    },
    scrollView: {
        paddingHorizontal: 24,
        paddingTop: 24
    },
    headerText: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 24
    },
    descTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4281A4'
    },
    buttonTukarJadwal: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 30
    },
    textButtonTukarJadwal: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textRed: {
        color: 'red',
        fontWeight: '500',
        fontSize: 15
    },
    riwayatCard: {
        backgroundColor: '#E5E4E2',
        borderRadius: 12,
        padding: 12,
        marginBottom: 24
    },
    riwayatCardAttribute: {
        fontSize: 17,
        fontWeight: '500',
        paddingRight: 110,
        marginTop: 4
    }
})