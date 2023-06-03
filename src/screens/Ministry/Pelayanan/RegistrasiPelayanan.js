import React, { useEffect, useState } from "react"
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import * as SecureStore from 'expo-secure-store'
import axios from "axios"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import DropDownPicker from "react-native-dropdown-picker"
import { LOCAL_DEVICE_IP } from "@env"

export default function RegistrasiPelayanan({ navigation }) {
    const [dataPelayanIbadah, setDataPelayanIbadah] = useState({
        noJemaat: '',
        namaJemaat: '',
        kodePelayanan: '',
        statusApproval: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isValidating, setIsValidating] = useState(false)
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
    const [jenisPelayanan, setJenisPelayanan] = useState('')
    const [listJenisPelayanan, setListJenisPelayanan] = useState([])
    const [jenisPelayananOpen, setJenisPelayananOpen] = useState(false)

    const getDataPelayanIbadah = async () => {
        setIsValidating(true)
        const accessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }

        axios.get(`http://${LOCAL_DEVICE_IP}/jemaat`, header)
            .then(function (response) {
                if (response.data[0]) {
                    setDataPelayanIbadah({
                        ...dataPelayanIbadah,
                        noJemaat: response.data[0].noJemaat,
                        namaJemaat: response.data[0].nama
                    })

                    axios.get(`http://${LOCAL_DEVICE_IP}/jenis-pelayanan`, header)
                        .then(function (response) {
                            const cleanedDataPelayanan = []
                            if (response.data) {
                                response.data.map((pelayanan, index) => {
                                    cleanedDataPelayanan.push({
                                        id: index,
                                        label: pelayanan.namaPelayanan,
                                        value: pelayanan.kodePelayanan
                                    })
                                })
                            }
                            setListJenisPelayanan(cleanedDataPelayanan)
                        }).catch(function (error) {
                            console.log("Error getting list pelayanan: ", error)
                        })
                }
            })
            .catch(function (error) {
                console.log("Error getting data jemaat: ", error)
            })
            .finally(function () {
                setIsValidating(false)
            })
    }

    const handleInputChange = (e) => {
        setDataPelayanIbadah({
            ...dataPelayanIbadah,
            kodePelayanan: e
        })
    }

    const handleSubmit = async () => {
        if (dataPelayanIbadah.noJemaat && dataPelayanIbadah.kodePelayanan) {
            setIsValidating(true)
            const accessToken = await SecureStore.getItemAsync('accessToken')
            const header = {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            }
            let currentSubmitStatus = false

            await axios.post(`http://${LOCAL_DEVICE_IP}/pelayanan/register`, dataPelayanIbadah, header)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("Berhasil daftar pelayanan")
                        currentSubmitStatus = true
                    }
                    else {
                        currentSubmitStatus = false
                    }
                })
                .catch(function (error) {
                    console.log("Error registering: ", error)
                })
                .finally(function () {
                    setIsValidating(false)
                    navigation.navigate('StatusRegisterPelayanIbadah', { submitStatus: currentSubmitStatus })
                })

        }
    }

    useEffect(() => {
        getDataPelayanIbadah()
    }, [])

    useEffect(() => {
        setIsValidating(true)
        const inputDebounce = setTimeout(() => {
            if (dataPelayanIbadah.noJemaat && dataPelayanIbadah.kodePelayanan) {
                setIsNextButtonDisabled(false)
            }
            else {
                setIsNextButtonDisabled(true)
            }
            setIsValidating(false)
        }, 500)

        return () => clearTimeout(inputDebounce)
    }, [dataPelayanIbadah])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%' }}>
                <KeyboardAwareScrollView>
                    {/* <View style={styles.container}> */}
                    <Text style={styles.title}>Registrasi Pelayan Ibadah</Text>
                    <Text style={styles.description}>Masukkan data berikut</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nomor jemaat</Text>
                        <TextInput
                            // placeholder="Nomor jemaat"
                            style={styles.input}
                            value={dataPelayanIbadah.noJemaat}
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nama jemaat</Text>
                        <TextInput
                            // placeholder="Nama jemaat"
                            style={styles.input}
                            value={dataPelayanIbadah.namaJemaat}
                            editable={false}
                        />
                    </View>
                    {/* <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Jenis pelayanan</Text>
                        <TextInput
                            placeholder="Pilih jenis pelayanan"
                            style={styles.input}
                            onChangeText={(e) => handleInputChange(e)}
                        />
                    </View> */}
                    <View style={jenisPelayananOpen ? { ...styles.inputContainer, height: 280 } : styles.inputContainer}>
                        <Text style={styles.inputLabel}>Jenis pelayanan</Text>
                        <DropDownPicker
                            placeholder='Pilih jenis pelayanan'
                            value={jenisPelayanan}
                            items={listJenisPelayanan}
                            open={jenisPelayananOpen}
                            setOpen={setJenisPelayananOpen}
                            setValue={setJenisPelayanan}
                            onChangeValue={(e) => handleInputChange(e)}
                            style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: jenisPelayananOpen ? 94 : 12 }]}
                            placeholderStyle={{ color: 'grey' }}
                            listMode="SCROLLVIEW"
                        />
                    </View>

                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity
                            style={!isNextButtonDisabled && !isValidating ? styles.nextButton : { ...styles.nextButton, backgroundColor: '#E4DFDA' }}
                            onPress={handleSubmit}
                            disabled={isValidating || isNextButtonDisabled}
                        >
                            {isValidating ?
                                <ActivityIndicator size="small" color="white" />
                                :
                                <Text style={styles.nextText}>Daftar</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4281A4'
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 50
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
        paddingHorizontal: 48,
        width: '100%',
    },
    inputLabel: {
        fontSize: 15,
        marginBottom: 8,
        fontWeight: '500',
        color: '#4281A4'
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    nextText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    submitButtonContainer: {
        marginTop: 24,
        width: '100%',
        paddingHorizontal: 48
    }
})