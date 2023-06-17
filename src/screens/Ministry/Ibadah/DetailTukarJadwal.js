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
                kodeJadwal: data?.kodeJadwal
            },
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        axios.get(`${LOCAL_DEVICE_IP}/jadwal/by-kode-jadwal`, config)
            .then(function (response) {
                const cleanedDetailJadwal = []
                if (response?.data) {
                    response.data.map(jadwal => {
                        cleanedDetailJadwal.push({
                            id: jadwal.kodePelayanan,
                            label: `${jadwal?.Jemaat?.nama} - ${jadwal?.JenisPelayanan?.namaPelayanan}`,
                            value: `${jadwal?.kodePelayanan} - ${jadwal?.noJemaat}`
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
                {destination && destPetugas &&
                    <View>
                        <TouchableOpacity
                            style={styles.buttonTukarJadwal}
                        // onPress={() =}
                        >
                            <Text style={styles.textButtonTukarJadwal}>Tukar</Text>
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