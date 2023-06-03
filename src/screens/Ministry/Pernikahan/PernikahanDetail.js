import { View, Text, ScrollView, SafeAreaView, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef, createRef } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import 'moment/locale/id'
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput as LabeledInput } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import FormMempelaiPria from './FormMempelaiPria';
import { LOCAL_DEVICE_IP } from "@env"

const PernikahanDetail = () => {
    moment.locale('id')
    const [pagePosition, setPagePosition] = useState(0);
    const [wargaNegara, setWargaNegara] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [countryListOpen, setCountryListOpen] = useState(false);
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
    // KPK Wilayah Dropdown
    const [kpkWilayah, setKPKWilayah] = useState('Wilayah 1')
    const [listKPKWilayan, setListKPKWilayah] = useState([
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
    const [kpkWilayahOpen, setKPKWilayahOpen] = useState(false)
    // Terdaftar pelayanan
    const [isTerlibatPelayananPria, setIsTerlibatPelayananPria] = useState(false)
    const [isTerlibatPelayananWanita, setIsTerlibatPelayananWanita] = useState(false)
    const [listPelayananPria, setListPelayananPria] = useState([])
    const [listPelayananWanita, setListPelayananWanita] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(true)

    const navigation = useNavigation()

    const verifyAuth = async () => {
        const accessToken = await SecureStore.getItemAsync('accessToken').finally(function () {
            setIsLoading(false)
        })
        if (accessToken) {
            setIsAuthorized(true)
        }
        else {
            setIsAuthorized(false)
        }
    }

    const getCountryList = async () => {
        setIsLoading(true)
        axios.get(`http://${LOCAL_DEVICE_IP}/api/countries`)
            .then(function (response) {
                const countries = response.data;
                const cleanedCountries = []
                if (countries) {
                    countries.map((country) => {
                        cleanedCountries.push({
                            id: country.id,
                            label: country.name,
                            value: country.iso2
                        })
                    })
                }

                setCountryList(cleanedCountries);
            })
            .catch(function (error) {
                console.log("Error getting country list", error);
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    const getProfileData = async () => {
        let storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        if (header) {
            setIsLoading(true)
            axios.get(`http://${LOCAL_DEVICE_IP}/jemaat`, header)
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
                    setWargaNegara(data.wargaNegara)
                })
                .catch(function (error) {
                    console.log("Error: ", error)
                })
                .finally(function () {
                    setIsLoading(false)
                })
        }
    }

    const getDaftarPelayananAktif = async (selectedJemaat, gender) => {
        let storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        if (header) {
            setIsLoading(true)
            axios.get(`http://${LOCAL_DEVICE_IP}/pelayanan/get-terdaftar`, { noJemaat: selectedJemaat }, header)
                .then(function (response) {
                    if (response.data.length > 0) {
                        const filteredListPelayanan = response.data.filter((el) =>
                            el?.statusApproval === 'approved'
                        )
                        if (gender === 'pria') {
                            setIsTerlibatPelayananPria(true)
                            setIsTerlibatPelayananPria(filteredListPelayanan)
                        }
                        else if (gender === 'wanita') {
                            setIsTerlibatPelayananWanita(true)
                            setIsTerlibatPelayananWanita(filteredListPelayanan)
                        }
                    }
                    else {
                        if (gender === 'pria') {
                            setIsTerlibatPelayananPria(false)
                        }
                        else if (gender === 'wanita') {
                            setIsTerlibatPelayananWanita(false)
                        }
                    }
                })
                .catch(function (error) {
                    console.log("Error verifying pelayanan: ", error)
                })
                .finally(function () {
                    setIsLoading(false)
                })
        }
    }

    // useEffect(() => {
    //     getCountryList()
    //     getProfileData()
    // }, [])

    // useEffect(() => {
    //     getDaftarPelayananAktif(pernikahanData.mempelaiPria.noJemaat, 'pria')
    //     getDaftarPelayananAktif(pernikahanData.mempelaiWanita.noJemaat, 'wanita')
    // }, [pernikahanData.mempelaiPria.baptis])

    useEffect(() => {
        verifyAuth()
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            getCountryList()
            getProfileData()
        }
    }, [isAuthorized, useIsFocused()])

    function handleInputChange(e, mempelaiGender, field) {
        setPernikahanData({
            ...pernikahanData,
            [mempelaiGender]: {
                ...pernikahanData[mempelaiGender],
                [field]: e
            }
        })
    }

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

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, marginBottom: 20 }}>
            {isLoading ?
                <ActivityIndicator style={{ alignItems: 'center', height: '100%', transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
                :
                (isAuthorized ?
                    <ScrollView style={{ paddingHorizontal: 20 }}>
                        {pagePosition == 0 ?
                            <View>
                                <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 16, marginTop: 20 }}>
                                    Mempelai Pria
                                </Text>

                                {/* Name field */}
                                <LabeledInput
                                    label='Nama'
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiPria?.nama || ''}
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
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiPria?.tempatLahir || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'tempatLahir')}
                                />

                                {/* Tanggal lahir field */}
                                <TouchableOpacity onPress={() => showDatePicker('tglLahir', 'mempelaiPria')}>
                                    <LabeledInput
                                        placeholder='Tanggal Lahir'
                                        label='Tanggal Lahir'
                                        style={styles.dateInput}
                                        value={pernikahanData.mempelaiPria.tglLahir ? moment(pernikahanData.mempelaiPria.tglLahir).format('LL') : null}
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
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiPria?.alamat || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'alamat')}
                                />

                                {/* Kewarganegaraan dropdown */}
                                <Text style={{ marginBottom: 5, color: 'grey', fontSize: 14 }}>
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
                                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: 12 }]}
                                    placeholderStyle={{ color: 'grey' }}
                                    listMode="MODAL"
                                    itemKey='id'
                                    searchable
                                    searchPlaceholder='Cari negara...'
                                />

                                <LabeledInput
                                    label='Pekerjaan'
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiPria?.pekerjaan || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'pekerjaan')}
                                />

                                <Text style={{ marginBottom: 5, marginTop: 10, fontSize: 16, color: '#4281A4', fontWeight: '600' }}>
                                    Status Baptis
                                </Text>
                                <RadioButton.Group
                                    // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiPria: { ...pernikahanData.mempelaiPria, baptis: value } })}
                                    onValueChange={(e) => handleInputChange(e, 'mempelaiPria', 'baptis')}
                                    value={pernikahanData.mempelaiPria.baptis}
                                >
                                    <RadioButton.Item label='Sudah baptis' value={true} />
                                    <RadioButton.Item label='Belum baptis' value={false} />
                                </RadioButton.Group>
                                {
                                    !pernikahanData.mempelaiPria.baptis === '' ? (
                                        <></>
                                    ) :
                                        !pernikahanData.mempelaiPria.baptis ?
                                            (<>
                                                <View>
                                                    <Text style={{ color: 'red' }}>*Anda harus sudah dibaptis untuk mendaftar</Text>
                                                </View>
                                            </>) : (<>
                                                <View>
                                                    <LabeledInput
                                                        label="Nomor Induk Jemaat"
                                                        style={styles.dateInput}
                                                        value={pernikahanData?.mempelaiPria?.noJemaat || ''}
                                                        mode='outlined'
                                                        outlineColor='black'
                                                        activeOutlineColor='#4281A4'
                                                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                                        textColor='black'
                                                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'noJemaat')}
                                                    />

                                                    <Text style={{ marginBottom: 5, color: 'grey', fontSize: 14 }}>
                                                        KPK Wilayah
                                                    </Text>
                                                    <DropDownPicker
                                                        placeholder='KPK Wilayah'
                                                        value={kpkWilayah}
                                                        items={listKPKWilayan}
                                                        open={kpkWilayahOpen}
                                                        setOpen={setKPKWilayahOpen}
                                                        setValue={setKPKWilayah}
                                                        style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: 12 }]}
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
                                                            // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiPria: { ...pernikahanData.mempelaiPria, baptis: value } })}
                                                            onValueChange={(e) => setIsTerlibatPelayananPria(e)}
                                                            value={isTerlibatPelayananPria}
                                                        >
                                                            <RadioButton.Item label='Ya' value={true} labelStyle={{ fontSize: 16 }} />
                                                            <RadioButton.Item label='Tidak' value={false} labelStyle={{ fontSize: 16 }} />
                                                        </RadioButton.Group>
                                                    </View>

                                                    {/* {
                                                    isTerlibatPelayananPria && (
                                                        listPelayananPria.length > 0 ?
                                                            <View style={{ marginTop: 16 }}>
                                                                <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>Daftar Pelayanan Aktif</Text>
                                                                {
                                                                    listPelayananPria?.map((pelayanan, i) => {
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
                                                } */}
                                                </View>
                                            </>)
                                }

                                <TouchableOpacity
                                    style={styles.nextButton}
                                    // onPress={() => navigation.navigate('PernikahanDetailWanita')}
                                    onPress={() => setPagePosition(1)}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Selanjutnya</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 16, marginTop: 20 }}>
                                    Mempelai Wanita
                                </Text>

                                {/* Name field */}
                                <LabeledInput
                                    label='Nama'
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiWanita?.nama || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiWanita', 'nama')}
                                />

                                {/* Tempat lahir field */}
                                <LabeledInput
                                    label='Tempat lahir'
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiWanita?.tempatLahir || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiWanita', 'tempatLahir')}
                                />

                                {/* Tanggal lahir field */}
                                <TouchableOpacity onPress={() => showDatePicker('tglLahir', 'mempelaiWanita')}>
                                    <LabeledInput
                                        placeholder='Tanggal Lahir'
                                        label='Tanggal Lahir'
                                        style={styles.dateInput}
                                        value={pernikahanData.mempelaiWanita.tglLahir ? moment(pernikahanData.mempelaiWanita.tglLahir).format('LL') : null}
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
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiWanita?.alamat || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiWanita', 'alamat')}
                                />

                                {/* Kewarganegaraan dropdown */}
                                <Text style={{ marginBottom: 5, color: 'grey', fontSize: 14 }}>
                                    Kewarganegaraan
                                </Text>
                                <DropDownPicker
                                    placeholder="Kewarganegaraan"
                                    value={wargaNegara}
                                    items={countryList}
                                    open={countryListOpen}
                                    setOpen={setCountryListOpen}
                                    setValue={setWargaNegara}
                                    onChangeValue={(e) => handleInputChange(e, 'mempelaiWanita', 'wargaNegara')}
                                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: 12 }]}
                                    placeholderStyle={{ color: 'grey' }}
                                    listMode="MODAL"
                                    itemKey='id'
                                    searchable
                                    searchPlaceholder='Cari negara...'
                                />

                                <LabeledInput
                                    label='Pekerjaan'
                                    style={styles.dateInput}
                                    value={pernikahanData?.mempelaiWanita?.pekerjaan || ''}
                                    mode='outlined'
                                    outlineColor='black'
                                    activeOutlineColor="#4281A4"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={(e) => handleInputChange(e, 'mempelaiWanita', 'pekerjaan')}
                                />

                                <Text style={{ marginBottom: 5, marginTop: 10, fontSize: 16, color: '#4281A4', fontWeight: '600' }}>
                                    Status Baptis
                                </Text>
                                <RadioButton.Group
                                    // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiWanita: { ...pernikahanData.mempelaiWanita, baptis: value } })}
                                    onValueChange={(e) => handleInputChange(e, 'mempelaiWanita', 'baptis')}
                                    value={pernikahanData.mempelaiWanita.baptis}
                                >
                                    <RadioButton.Item label='Sudah baptis' value={true} />
                                    <RadioButton.Item label='Belum baptis' value={false} />
                                </RadioButton.Group>
                                {
                                    !pernikahanData.mempelaiWanita.baptis === '' ? (
                                        <></>
                                    ) :
                                        !pernikahanData.mempelaiWanita.baptis ?
                                            (<>
                                                <View>
                                                    <Text style={{ color: 'red' }}>*Anda harus sudah dibaptis untuk mendaftar</Text>
                                                </View>
                                            </>) : (<>
                                                <View>
                                                    <LabeledInput
                                                        label="Nomor Induk Jemaat"
                                                        style={styles.dateInput}
                                                        value={pernikahanData?.mempelaiWanita?.noJemaat || ''}
                                                        mode='outlined'
                                                        outlineColor='black'
                                                        activeOutlineColor='#4281A4'
                                                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                                        textColor='black'
                                                        onChangeText={(e) => handleInputChange(e, 'mempelaiWanita', 'noJemaat')}
                                                    />

                                                    <Text style={{ marginBottom: 5, color: 'grey', fontSize: 14 }}>
                                                        KPK Wilayah
                                                    </Text>
                                                    <DropDownPicker
                                                        placeholder='KPK Wilayah'
                                                        value={kpkWilayah}
                                                        items={listKPKWilayan}
                                                        open={kpkWilayahOpen}
                                                        setOpen={setKPKWilayahOpen}
                                                        setValue={setKPKWilayah}
                                                        style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: 12 }]}
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
                                                            // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiWanita: { ...pernikahanData.mempelaiWanita, baptis: value } })}
                                                            onValueChange={(e) => setIsTerlibatPelayananWanita(e)}
                                                            value={isTerlibatPelayananWanita}
                                                        >
                                                            <RadioButton.Item label='Ya' value={true} labelStyle={{ fontSize: 16 }} />
                                                            <RadioButton.Item label='Tidak' value={false} labelStyle={{ fontSize: 16 }} />
                                                        </RadioButton.Group>
                                                    </View>

                                                    {/* {
                                                    isTerlibatPelayananWanita && (
                                                        isTerlibatPelayananWanita.length > 0 ?
                                                            <View style={{ marginTop: 16 }}>
                                                                <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>Daftar Pelayanan Aktif</Text>
                                                                {
                                                                    listPelayananWanita?.map((pelayanan, i) => {
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
                                                } */}
                                                </View>
                                            </>)
                                }

                                <TouchableOpacity
                                    style={{ ...styles.nextButton, borderWidth: 1, borderColor: '#C8C8C8', backgroundColor: 'transparent' }}
                                    onPress={() => setPagePosition(0)}
                                >
                                    <Text style={{ ...styles.nextText, color: '#707070' }}>Sebelumnya</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.nextButton, marginTop: 12, marginBottom: 40 }}
                                // onPress={() => navigation.navigate('PernikahanDetailWanita')}
                                // onPress={() => setPagePosition(1)}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Daftar</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </ScrollView>
                    :
                    <View style={styles.unauthorizedContainer}>
                        <Text style={styles.unauthorizedTitle}>
                            Anda belum login
                        </Text>
                        <Text style={styles.unauthorizedDesc}>
                            Silahkan login untuk melanjutkan
                        </Text>
                        <TouchableOpacity
                            style={styles.unauthorizedButton}
                            onPress={() => navigation.navigate('login')}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
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
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    dateInput: {
        marginBottom: 12,
        backgroundColor: 'white',
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
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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
    unauthorizedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    unauthorizedTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4281A4'
    },
    unauthorizedDesc: {
        fontSize: 16,
        color: '#4281A4',
        marginBottom: 12,
    },
    unauthorizedButton: {
        paddingVertical: 12,
        paddingHorizontal: 56,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    loginText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500'
    }
})

export default PernikahanDetail