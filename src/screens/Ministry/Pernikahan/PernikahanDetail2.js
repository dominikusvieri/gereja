import { View, Text, ScrollView, SafeAreaView, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { LOCAL_DEVICE_IP } from '@env'
import * as SecureStore from 'expo-secure-store'
import 'moment/locale/id'
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput as LabeledInput } from "react-native-paper";


const PernikahanDetail2 = () => {
    moment.locale('id')
    const [nationalities, setNationalities] = useState([]);
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate());
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [selectedKPK, setSelectedKPK] = useState(null);
    const [babtis, setBabtis] = useState('')
    const [pernikahanData, setPernikahanData] = useState({
        mempelaiPria: {
            noJemaat: '',
            nama: '',
            tempatLahir: '',
            tglLahir: '',
            alamat: '',
            wargaNegara: '',
            pekerjaan: '',
            baptis: ''
        },
        mempelaiWanita: {
            noJemaat: '',
            nama: '',
            tempatLahir: '',
            tglLahir: '',
            alamat: '',
            wargaNegara: '',
            pekerjaan: '',
            baptis: ''
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
            .then(response => {
                const nationalities = response.data.map(country => country.name);
                setNationalities(nationalities);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getProfileData = async () => {
        let storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        if (header) {
            setIsLoading(true)
            axios.get(`http://192.168.1.4:3001/jemaat`, header)
                .then(function (response) {
                    const data = response.data[0]
                    const genderMempelai = data.gender === 'lakiLaki' ? 'mempelaiPria' : 'mempelaiWanita'
                    setPernikahanData({
                        ...pernikahanData,
                        [genderMempelai]: {
                            noJemaat: data.noJemaat,
                            nama: data.nama,
                            tempatLahir: data.tempatLahir,
                            tglLahir: data.tglLahir,
                            alamat: data.alamat,
                            wargaNegara: data.wargaNegara,
                            pekerjaan: data.pekerjaan,
                            baptis: data.baptis
                        }
                    })
                })
                .catch(function (error) {
                    console.log("Error: ", error)
                })
                .finally(function () {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])

    function handleInputChange(e, mempelaiGender, field) {
        setPernikahanData({
            ...pernikahanData,
            [mempelaiGender]: {
                ...pernikahanData[mempelaiGender],
                [field]: e
            }
        })
    }

    const onTanggalLahirChange = (event, selectedDate) => (dateType) => {
        setTanggalLahir(selectedDate);
        handleInputChange(selectedDate, dateType);
    }

    const showDatePicker = (dateType) => {
        DateTimePickerAndroid.open({
            value: dateType === 'tglLahir' ? tanggalLahir : tanggalBaptis,
            onChange: (event, selectedDate) => onTanggalLahirChange(event, selectedDate)(dateType),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().toDate()
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, marginBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                    Mempelai Wanita
                </Text>
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nama
                </Text>
                <TextInput
                    value={pernikahanData.mempelaiPria.nama}
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'nama')}
                    placeholder='Masukkan Nama'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Tempat Lahir
                </Text>
                <TextInput
                    value={pernikahanData.mempelaiPria.tempatLahir ?
                        `${pernikahanData.mempelaiPria.tempatLahir}, ${moment(pernikahanData.mempelaiPria.tglLahir).format('LL')}`
                        : moment(pernikahanData.mempelaiPria.tglLahir).format('LL')
                    }
                    placeholder='Contoh: Jakarta'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}

                />

                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => showDatePicker('tglLahir')}>
                    <LabeledInput
                        placeholder='Tanggal Lahir'
                        label='Tanggal Lahir'
                        style={styles.dateInput}
                        value={tanggalLahir && moment(tanggalLahir).format('LL')}
                        editable={false}
                        mode="outlined"
                        outlineColor="black"
                        activeOutlineColor="black"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                    />
                </TouchableOpacity>

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Alamat
                </Text>
                <TextInput
                    value={pernikahanData.mempelaiPria.alamat}
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'alamat')}
                    placeholder='Masukkan Alamat'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Kewarganegaraan
                </Text>
                <Picker
                    style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
                    selectedValue={selectedNationality}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedNationality(itemValue)
                    }>
                    {nationalities.map(nationality => (
                        <Picker.Item key={nationality} label={nationality} value={nationality} />
                    ))}
                </Picker>

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Pekerjaan
                </Text>
                <TextInput
                    value={pernikahanData.mempelaiPria.pekerjaan}
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'pekerjaan')}
                    placeholder='Masukkan Pekerjaan'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Sudah Babtis?
                </Text>
                <RadioButton.Group
                    // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiPria: { ...pernikahanData.mempelaiPria, baptis: value } })}
                    onValueChange={(e) => handleInputChange(e, 'mempelaiPria', 'baptis')}
                    value={pernikahanData.mempelaiPria.baptis}
                >
                    <RadioButton.Item label='Sudah' value={true} />
                    <RadioButton.Item label='Belum' value={false} />
                </RadioButton.Group>

                {
                    pernikahanData.mempelaiPria.baptis === '' ? (
                        <></>
                    ) :
                        !pernikahanData.mempelaiPria.baptis ?
                            (<>
                                <View>
                                    <Text style={{ color: 'red' }}>*Silahkan dibabtis terlebih dahulu</Text>
                                </View>
                            </>) : (<>
                                <View>
                                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                        Nomor Induk Jemaat
                                    </Text>
                                    <TextInput
                                        value={pernikahanData.mempelaiPria.noJemaat}
                                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'noJemaat')}
                                        placeholder='Masukkan Nomor Induk Jemaat'
                                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                                    />

                                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                        KPK Wilayah
                                    </Text>
                                    <Picker
                                        style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000', marginBottom: 20 }}
                                        selectedValue={selectedKPK}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedKPK(itemValue)
                                        }>
                                        {nationalities.map(nationality => (
                                            <Picker.Item key={nationality} label={nationality} value={nationality} />
                                        ))}
                                    </Picker>
                                </View>
                            </>)
                }

                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15 }} onPress={() => navigation.navigate('TTDPria')} >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SUBMIT</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4281A4'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black'
    },
    dateInput: {
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        fontSize: 14,
        paddingHorizontal: 4
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
    }
})

export default PernikahanDetail2