import React from "react";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput as LabeledInput, RadioButton } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import 'moment/locale/id'
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store'
import { LOCAL_DEVICE_IP } from '@env'
import axios from "axios";

export default function FormMempelaiPria({ data, handleInputChange, countryList }) {
    moment.locale('id')
    const [isLoading, setIsLoading] = useState(false)
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate())
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate())
    const [wargaNegara, setWargaNegara] = useState('')
    const [countryListOpen, setCountryListOpen] = useState(false)
    const [kpkWilayah, setKPKWilayah] = useState('Wilayah 1')
    const [kpkWilayahOpen, setKPKWilayahOpen] = useState(false)
    const [listKPKWilayah, setListKPKWilayah] = useState([
        {
            id: 0,
            label: 'Wilayah 1',
            value: 'Wilayah 1'
        },
        {
            id: 1,
            label: 'Wilayah 2',
            value: 'Wilayah 2'
        },
        {
            id: 2,
            label: 'Wilayah 3',
            value: 'Wilayah 3'
        },
    ])
    const [isTerlibatPelayanan, setIsTerlibatPelayanan] = useState(false)
    const [listPelayanan, setListPelayanan] = useState([])

    useEffect(() => {
        const inputDebounce = setTimeout(() => {
            getDaftarPelayananAktif()
        }, 500)

        return () => clearTimeout(inputDebounce)
    }, [data.noJemaat])

    const onTanggalLahirChange = (event, selectedDate, genderMempelai) => (dateType) => {
        setTanggalLahir(selectedDate);
        handleInputChange(selectedDate, genderMempelai, dateType);
    }

    const showDatePicker = (dateType, genderMempelai) => {
        DateTimePickerAndroid.open({
            value: dateType === 'tglLahir' ? tanggalLahir : tanggalBaptis,
            onChange: (event, selectedDate) => onTanggalLahirChange(event, selectedDate, genderMempelai)(dateType),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().toDate()
        })
    }

    async function getDaftarPelayananAktif() {
        let storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const config = {
            params: {
                noJemaat: data?.noJemaat
            },
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        if (storedAccessToken) {
            axios.get(`${LOCAL_DEVICE_IP}/pelayanan/get-terdaftar`, config)
                .then(function (response) {
                    if (response.data.length > 0) {
                        const filteredListPelayanan = response.data.filter((el) => {
                            return el?.statusApproval === 'approved'
                        })
                        setIsTerlibatPelayanan(true)
                        setListPelayanan(filteredListPelayanan)
                    }
                    else {
                        setIsTerlibatPelayanan(false)
                        setListPelayanan([])
                    }
                })
                .catch(function (error) {
                    console.log("Error verifying pelayanan: ", error)
                })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <ActivityIndicator style={styles.activityIndicator} />
                :
                <ScrollView style={styles.scrollViewContainer}>
                    <Text style={styles.formTitle}>
                        Mempelai Pria
                    </Text>

                    {/* Name field */}
                    <LabeledInput
                        label='Nama'
                        style={styles.labeledInput}
                        value={data?.nama || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'nama')}
                    />

                    {/* Tempat lahir field */}
                    <LabeledInput
                        label='Tempat lahir'
                        style={styles.labeledInput}
                        value={data?.tempatLahir || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'tempatLahir')}
                    />

                    {/* Tanggal lahir field */}
                    <TouchableOpacity
                        onPress={() => showDatePicker('tglLahir', 'mempelaiPria')}
                    >
                        <LabeledInput
                            placeholder='Tanggal lahir'
                            label='Tanggal lahir'
                            style={styles.labeledInput}
                            value={data.tglLahir ? moment(data.tglLahir).format('LL') : null}
                            editable={false}
                            mode="outlined"
                            outlineColor="black"
                            activeOutlineColor="black"
                            theme={{ colors: { onSurfaceVariant: 'grey' } }}
                            textColor="black"
                        />
                    </TouchableOpacity>

                    {/* Alamat field */}
                    <LabeledInput
                        label='Alamat'
                        style={styles.labeledInput}
                        value={data?.alamat || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'alamat')}
                    />

                    {/* Kewarganegaraan dropdown */}
                    <Text style={styles.kewarganegaraanText}>
                        Kewarganegaraan
                    </Text>
                    <DropDownPicker
                        placeholder="Kewarganegaraan"
                        value={wargaNegara}
                        items={countryList}
                        open={countryListOpen}
                        setOpen={setCountryListOpen}
                        setValue={setWargaNegara}
                        onChangeValue={(e) => handleInputChange(e, 'mempelaiPria', 'wargaNegara')}
                        style={styles.kewarganegaraanDropdown}
                        placeholderStyle={{ color: 'grey' }}
                        listMode="MODAL"
                        itemKey='id'
                        searchable
                        searchPlaceholder='Cari negara...'
                    />

                    {/* Pekerjaan field */}
                    <LabeledInput
                        label='Pekerjaan'
                        style={styles.labeledInput}
                        value={data?.pekerjaan || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'pekerjaan')}
                    />

                    {/* Baptis */}
                    <Text style={styles.statusBaptis}>
                        Status Baptis
                    </Text>
                    <RadioButton.Group
                        onValueChange={(e) => handleInputChange(e, 'mempelaiPria', 'baptis')}
                        value={data?.baptis || false}
                    >
                        <RadioButton.Item label='Sudah baptis' value={true} />
                        <RadioButton.Item label='Belum baptis' value={false} />
                    </RadioButton.Group>

                    {!data.baptis ?
                        <Text style={{ color: 'red' }}>
                            *Anda harus sudah dibaptis untuk mendaftar
                        </Text>
                        :
                        <View>
                            <LabeledInput
                                label="Nomor Induk Jemaat"
                                style={styles.labeledInput}
                                value={data?.noJemaat || ''}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor='#4281A4'
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor='black'
                                onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'noJemaat')}
                            // disabled={data.noJemaat ? true : false}
                            />

                            <Text style={styles.kewarganegaraanText}>
                                KPK Wilayah
                            </Text>
                            <DropDownPicker
                                placeholder="KPK Wilayah"
                                value={kpkWilayah}
                                items={listKPKWilayah}
                                open={kpkWilayahOpen}
                                setOpen={setKPKWilayahOpen}
                                setValue={setKPKWilayah}
                                style={styles.kewarganegaraanDropdown}
                                placeholderStyle={{ color: 'grey' }}
                                listMode="SCROLLVIEW"
                                itemKey='id'
                            />

                            <View style={{ marginTop: 16 }}>
                                <Text style={{ marginBottom: 12, fontSize: 16, color: '#4281A4', fontWeight: '600' }}>
                                    Keterlibatan Pelayanan
                                </Text>
                                <Text style={{ fontSize: 16 }}>Ikut aktif dalam pelayanan?</Text>
                                <RadioButton.Group
                                    onValueChange={(e) => setIsTerlibatPelayanan(e)}
                                    value={isTerlibatPelayanan}
                                >
                                    <RadioButton.Item disabled label='Ya' value={true} labelStyle={{ fontSize: 16 }} />
                                    <RadioButton.Item disabled label='Tidak' value={false} labelStyle={{ fontSize: 16 }} />
                                </RadioButton.Group>
                            </View>

                            {
                                isTerlibatPelayanan && (
                                    listPelayanan.length > 0 ?
                                        <View style={{ marginTop: 16 }}>
                                            <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>Daftar Pelayanan Aktif</Text>
                                            {
                                                listPelayanan?.map((pelayanan, i) => {
                                                    return (
                                                        <View
                                                            key={i}
                                                            style={styles.cardContainer}
                                                        >
                                                            <View style={{ flex: 3 }}>
                                                                <Text style={styles.cardTextDesc}>Kode pelayanan:</Text>
                                                                <Text style={styles.cardTextTitle}>{pelayanan.kodePelayanan}</Text>
                                                                <View style={{ marginBottom: 10 }} />
                                                                <Text style={styles.cardTextDesc}>Jenis pelayanan:</Text>
                                                                <Text style={styles.cardTextTitle}>{pelayanan.JenisPelayanan.namaPelayanan}</Text>
                                                            </View>
                                                            <View style={{
                                                                flex: 2, justifyContent: 'center', alignItems: 'center',
                                                                backgroundColor: pelayanan.statusApproval === 'pending' ? '#737373'
                                                                    : pelayanan.statusApproval === 'denied' ? '#fb7185'
                                                                        : '#10b981',
                                                                borderRadius: 8
                                                            }}>
                                                                <Text style={styles.cardTextStatus}>{
                                                                    pelayanan.statusApproval === 'pending' ?
                                                                        "Menunggu persetujuan"
                                                                        : pelayanan.statusApproval === 'approved' ?
                                                                            "Terdaftar"
                                                                            : pelayanan.statusApproval === 'denied' &&
                                                                            "Ditolak"
                                                                }</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        :
                                        <View>
                                            <Text style={{ color: 'red' }}>*Anda belum terlibat dalam pelayanan</Text>
                                        </View>
                                )
                            }
                        </View>
                    }
                </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        marginBottom: 20
    },
    activityIndicator: {
        alignItems: 'center',
        height: '100%',
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    },
    scrollViewContainer: {
        paddingHorizontal: 20
    },
    formTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: '#4281A4',
        marginBottom: 16,
        marginTop: 20
    },
    labeledInput: {
        marginBottom: 12,
        backgroundColor: 'white',
        fontSize: 14,
        paddingHorizontal: 4
    },
    kewarganegaraanDropdown: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        color: 'black',
        backgroundColor: 'transparent',
        paddingHorizontal: 18,
        marginBottom: 12
    },
    kewarganegaraanText: {
        marginBottom: 5,
        color: 'grey',
        fontSize: 14
    },
    statusBaptis: {
        marginBottom: 5,
        marginTop: 10,
        fontSize: 16,
        color: '#4281A4',
        fontWeight: '600'
    },
    cardContainer: {
        backgroundColor: '#059669',
        marginBottom: 16,
        borderRadius: 8,
        padding: 12,
        flex: 1,
        flexDirection: 'row'
    },
    cardTextTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    cardTextDesc: {
        fontSize: 14,
        color: 'white',
    },
    cardTextStatus: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
})