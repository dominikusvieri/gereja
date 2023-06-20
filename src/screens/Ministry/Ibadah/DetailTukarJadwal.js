import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import 'moment/locale/id'
import * as SecureStore from 'expo-secure-store'
import { LOCAL_DEVICE_IP } from "@env"
import axios from "axios";

export default function DetailTukarJadwal({ route, navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data] = useState(route?.params?.param)
    const [destination, setDestination] = useState('')
    const [destinationList, setDestinationList] = useState([])
    const [destinationListOpen, setDestinationListOpen] = useState(false)

    const [destPetugas, setDestPetugas] = useState('')
    const [destPetugasOpen, setDestPetugasOpen] = useState(false)
    const [destPetugasList, setDestPetugasList] = useState([])
    const [disabledTukar, setDisabledTukar] = useState(false)

    const getDestinationList = async () => {
        setIsLoading(true)
        const storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const config = {
            params: {
                kodeJadwal: data?.kodeJadwal
            },
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        axios.get(`${LOCAL_DEVICE_IP}/jadwal/tukar-jadwal/dest`, config)
            .then(function (response) {
                const cleanedDataDestination = []
                if (response?.data) {
                    response.data.map((jadwal) => {
                        cleanedDataDestination.push({
                            id: jadwal.kodeJadwal,
                            label: `${jadwal?.Ibadah?.namaIbadah} - ${moment(jadwal?.tanggal).format('LL')}`,
                            value: jadwal?.kodeJadwal
                        })
                    })
                }
                setDestinationList(cleanedDataDestination)
            })
            .catch(function (error) {
                console.log("Error getting destination jadwal list: ", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    const getDetailJadwal = async () => {
        setIsLoading(true)
        const storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const config = {
            params: {
                // sourceKodeJadwal: data?.DetailJadwals[0]?.kodeJadwal,
                destKodeJadwal: destination,
                kodePelayanan: data?.DetailJadwals[0]?.kodePelayanan
            },
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        axios.get(`${LOCAL_DEVICE_IP}/jadwal/tukar/dest-petugas`, config)
            .then(function (response) {
                const cleanedDetailJadwal = []
                if (response?.data && response?.data?.length > 0) {
                    response?.data.map(petugas => {
                        cleanedDetailJadwal.push({
                            id: `${petugas.kodeJadwal} ${petugas.kodePelayanan} ${petugas.noJemaat}`,
                            label: `${petugas.JenisPelayanan.namaPelayanan} - ${petugas.Jemaat.nama}`,
                            value: `${petugas.kodeJadwal} ${petugas.kodePelayanan} ${petugas.noJemaat}`
                        })
                    })
                }
                setDestPetugasList(cleanedDetailJadwal)
            })
            .catch(function (error) {
                console.log("Error getting destination list of petugas: ", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    const requestTukarJadwal = async () => {
        if (destPetugas) {
            setIsLoading(true)
            const storedAccessToken = await SecureStore.getItemAsync('accessToken')
            const config = {
                headers: { 'Authorization': `Bearer ${storedAccessToken}` }
            }
            const body = {
                kodeJadwalSrc: data.DetailJadwals[0].kodeJadwal,
                jemaatSrc: data.DetailJadwals[0].noJemaat,
                kodeJadwalDest: destPetugas.split(' ')[0],
                jemaatDest: destPetugas.split(' ')[2],
                kodePelayanan: destPetugas.split(' ')[1]
            }

            axios.post(`${LOCAL_DEVICE_IP}/tukar-jadwal/request`, body, config)
                .then(function (response) {
                    if (response?.status == 200) {
                        console.log(response?.data)
                        setDisabledTukar(true)
                    }
                })
                .catch(function (error) {
                    console.log("Error requesting tukar jadwal: ", error)
                })
                .finally(function () {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        getDestinationList()
    }, [])

    useEffect(() => {
        getDetailJadwal()
    }, [destination])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.headerText}>Tukar dengan</Text>
                </View>
                <View>
                    <Text style={styles.descTitle}>Pilih jadwal</Text>
                    <View style={destinationListOpen ? { ...styles.inputContainer, height: 300 } : styles.inputContainer}>
                        <DropDownPicker
                            placeholder="Jadwal yang ingin ditukar"
                            value={destination}
                            items={destinationList}
                            open={destinationListOpen}
                            setOpen={setDestinationListOpen}
                            setValue={setDestination}
                            // onChangeValue={() => }
                            style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: destinationListOpen ? 100 : 12 }]}
                            placeholderStyle={{ color: 'grey' }}
                            listMode="SCROLLVIEW"
                        />
                    </View>
                </View>
                {destination &&
                    <View>
                        <Text style={styles.descTitle}>Pilih petugas ibadah</Text>
                        <View style={destPetugasOpen ? { ...styles.inputContainer, height: 300 } : styles.inputContainer}>
                            <DropDownPicker
                                placeholder="Petugas yang ingin ditukar"
                                value={destPetugas}
                                items={destPetugasList}
                                open={destPetugasOpen}
                                setOpen={setDestPetugasOpen}
                                setValue={setDestPetugas}
                                // onChangeValue={() => }
                                style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: destPetugasOpen ? 100 : 12 }]}
                                placeholderStyle={{ color: 'grey' }}
                                listMode="SCROLLVIEW"
                            />
                        </View>
                    </View>
                }
                {destination && destPetugas && !disabledTukar &&
                    <View>
                        <TouchableOpacity
                            style={styles.buttonTukarJadwal}
                            onPress={requestTukarJadwal}
                        >
                            <Text style={styles.textButtonTukarJadwal}>Tukar</Text>
                        </TouchableOpacity>
                    </View>
                }
                {disabledTukar &&
                    <View>
                        <Text style={{ color: '#4281A4', fontWeight: '500', marginTop: 24 }}>
                            {`* Berhasil request tukar jadwal. \nMenunggu approval petugas yang ditukar`}
                        </Text>
                        <TouchableOpacity
                            style={{ ...styles.buttonTukarJadwal, marginTop: 4 }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.textButtonTukarJadwal}>Kembali</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%'
    },
    inputContainer: {
        width: '100%',
        marginTop: 12
    },
})