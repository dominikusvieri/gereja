import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { LOCAL_DEVICE_IP } from '@env'

export default function BiodataRegister({ nextPage, prevPage, data, handleInputChange, isLoading, setLoading, countries, countriesIdd }) {
    const localIp = LOCAL_DEVICE_IP
    const [wargaNegaraOpen, setWargaNegaraOpen] = useState(false);
    const [wargaNegara, setWargaNegara] = useState(data?.wargaNegara);
    const [kodeTeleponOpen, setKodeTeleponOpen] = useState(false);
    const [kodeTelepon, setKodeTelepon] = useState(data?.kodeTelepon);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [isValidating, setIsValidating] = useState(false);
    const [isNikAlreadyRegistered, setIsNikAlreadyRegistered] = useState(false);
    const [dropdownLoading, setDropdownLoading] = useState(false);

    useEffect(() => {

    }, [isNikAlreadyRegistered])

    useEffect(() => {
        setIsValidating(true);

        const checkNikAvailability = setTimeout(() => {
            axios.get(`http://192.168.1.6:3001/jemaat/account-validation`, { params: { nik: data?.nik || '' } })
                .then(function (response) {
                    setIsNikAlreadyRegistered(!response.data.isAvailable)
                    if (data.nik && response.data.isAvailable && data.noKk & data.noJemaat && data.nama && data.wargaNegara && data.alamat && data.kodeTelepon && data.telepon) {
                        setIsNextButtonDisabled(false)
                    }
                    else {
                        setIsNextButtonDisabled(true)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
                .finally(function () {
                    setIsValidating(false)
                })
        }, 500);

        // const inputDebounce = setTimeout(() => {
        //     // All fields validation
        //     checkNikAvailability()
        //     setIsValidating(false);
        // }, 500);

        return () => clearTimeout(checkNikAvailability);
    }, [data])

    function validateInput() {
        if (data.nik && !isNikAlreadyRegistered && data.noKk && data.nama && data.wargaNegara && data.alamat && data.kodeTelepon && data.telepon) {
            nextPage()
        }
        // nextPage()
    }

    return (
        <View>
            <KeyboardAwareScrollView>
                <Text style={styles.title}>
                    Data Diri
                </Text>
                <Text style={styles.description}>
                    Masukkan data diri Anda
                </Text>
                <TextInput
                    placeholder='NIK'
                    style={[!isNikAlreadyRegistered ? styles.input : styles.inputError, { marginBottom: isNikAlreadyRegistered ? 4 : 12 }]}
                    keyboardType="numeric"
                    value={data.nik}
                    onChangeText={(e) => handleInputChange(e, 'nik')}
                />
                {isNikAlreadyRegistered &&
                    <Text style={styles.nikValidation}>
                        NIK sudah terdaftar
                    </Text>
                }
                <TextInput
                    placeholder='Nomor KK'
                    style={styles.input}
                    keyboardType="numeric"
                    value={data.noKk}
                    onChangeText={(e) => handleInputChange(e, 'noKk')}
                />
                <TextInput
                    placeholder='Nomor Jemaaat'
                    style={styles.input}
                    keyboardType="numeric"
                    value={data.noJemaat}
                    onChangeText={(e) => handleInputChange(e, 'noJemaat')}
                />
                <TextInput
                    placeholder='Nama'
                    style={styles.input}
                    value={data.nama}
                    onChangeText={(e) => handleInputChange(e, 'nama')}
                />
                <DropDownPicker
                    placeholder="Warga Negara"
                    searchPlaceholder="Warga negara..."
                    value={wargaNegara}
                    items={countries}
                    searchable
                    open={wargaNegaraOpen}
                    setOpen={setWargaNegaraOpen}
                    setValue={setWargaNegara}
                    onChangeValue={(e) => handleInputChange(e, 'wargaNegara')}
                    listMode="MODAL"
                    language="ID"
                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18 }]}
                    placeholderStyle={{ color: 'grey' }}
                />
                <TextInput
                    placeholder='Alamat'
                    style={styles.input}
                    value={data.alamat}
                    onChangeText={(e) => handleInputChange(e, 'alamat')}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 2, marginRight: 5 }}>
                        <DropDownPicker
                            placeholder=''
                            searchPlaceholder="Kode telepon..."
                            value={kodeTelepon}
                            items={countriesIdd}
                            searchable
                            open={kodeTeleponOpen}
                            setOpen={setKodeTeleponOpen}
                            setValue={setKodeTelepon}
                            onChangeValue={(e) => handleInputChange(e, 'kodeTelepon')}
                            listMode="MODAL"
                            language="ID"
                            itemKey="id"
                            style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18 }]}
                            placeholderStyle={{ color: 'grey' }}
                        />
                    </View>
                    <View style={{ flex: 4, marginLeft: 5 }}>
                        <TextInput
                            placeholder='Telepon'
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={data.telepon}
                            onChangeText={(e) => handleInputChange(e, 'telepon')}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={!isNextButtonDisabled && !isValidating ? styles.nextButton : { ...styles.nextButton, backgroundColor: '#E4DFDA' }}
                    onPress={validateInput}
                    disabled={isValidating || isNextButtonDisabled}
                >
                    {isValidating ?
                        <ActivityIndicator size="small" color="white" />
                        :
                        <Text style={styles.nextText}>Selanjutnya</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.nextButton, borderWidth: 1, borderColor: '#C8C8C8', backgroundColor: 'transparent', marginBottom: 40 }}
                    onPress={prevPage}
                >
                    <Text style={{ ...styles.nextText, color: '#707070' }}>Sebelumnya</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        width: '80%'
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    inputError: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4281A4'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 50
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    nextText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    nikValidation: {
        color: 'red',
        fontSize: 12,
        marginBottom: 12
    }
})