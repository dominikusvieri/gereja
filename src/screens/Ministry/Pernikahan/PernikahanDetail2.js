import { View, Text, ScrollView, SafeAreaView, TextInput, Button, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { LOCAL_DEVICE_IP } from '@env'
import * as SecureStore from 'expo-secure-store'
import 'moment/locale/id'
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput as LabeledInput } from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';


const PernikahanDetail2 = () => {
    const ip = LOCAL_DEVICE_IP
    moment.locale('id')
    const [isAuthorized, setIsAuthorized] = useState(false)


    const [nationalities, setNationalities] = useState([]);
    const [tanggalLahirPria, setTanggalLahirPria] = useState(moment().toDate());
    const [tanggalLahirWanita, setTanggalLahirWanita] = useState(moment().toDate());
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());
    const [selectedNationalityPria, setSelectedNationalityPria] = useState(null);
    const [selectedNationalityWanita, setSelectedNationalityWanita] = useState(null);
    const [selectedKPK, setSelectedKPK] = useState(null);
    const [babtis, setBabtis] = useState('')

    const [namaPria, setNamaPria] = useState('')
    const [tempatLahirPria, setTempatLahirPria] = useState('')
    const [alamatPria, setAlamatPria] = useState('')
    const [teleponPria, setTeleponPria] = useState('')
    const [pekerjaanPria, setPekerjaanPria] = useState('')
    const [kpkPria, setKpkPria] = useState('')

    const [namaWanita, setNamaWanita] = useState('')
    const [tempatLahirWanita, setTempatLahirWanita] = useState('')
    const [pekerjaanWanita, setPekerjaanWanita] = useState('')
    const [alamatWanita, setAlamatWanita] = useState('')
    const [teleponWanita, setTeleponWanita] = useState('')
    const [kpkWanita, setKpkWanita] = useState('')

    const [fotoKTP, setFotoKTP] = useState(null);
    const [ktpPreview, setKtpPreview] = useState(null);
    const [fileTypeKtp, setFileTypeKtp] = useState(null);
    const [byteKTP, setByteKTP] = useState(null)

    const [fotoBerwarna, setFotoBerwarna] = useState(null);
    const [fotoBerwarnaPreview, setFotoBerwarnaPreview] = useState(null);
    const [byteFotoBerwarna, setByteFotoBerwarna] = useState(null)
    const [fileTypeFotoBerwarna, setFileTypeFotoBerwarna] = useState(null);

    const [isFormValid, setIsFormValid] = useState(false);

    const verifyAuth = async () => {
        setIsLoading(true)
        const accessToken = await SecureStore.getItemAsync('accessToken').finally(function () {
            setIsLoading(false)
        })
        if (accessToken) {
            setIsAuthorized(true)
        }
        else {
            setIsAuthorized(false)
        }
        console.log(accessToken)
    }

    useEffect(() => {
        verifyAuth()
    }, [isAuthorized, useIsFocused()])

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
            axios.get(`${ip}/jemaat`, header)
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
        setTanggalLahirPria(selectedDate);
        handleInputChange(selectedDate, dateType);
    }

    const onTanggalLahirWanitaChange = (event, selectedDate) => (dateType) => {
        setTanggalLahirWanita(selectedDate);
        handleInputChange(selectedDate, dateType);
    }

    const showDatePicker = (dateType) => {
        DateTimePickerAndroid.open({
            value: dateType === 'tglLahir' ? tanggalLahirPria : tanggalBaptis,
            onChange: (event, selectedDate) => onTanggalLahirChange(event, selectedDate)(dateType),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().toDate()
        })
    }

    const showDatePickerWanita = (dateType) => {
        DateTimePickerAndroid.open({
            value: dateType === 'tglLahir' ? tanggalLahirWanita : tanggalBaptis,
            onChange: (event, selectedDate) => onTanggalLahirWanitaChange(event, selectedDate)(dateType),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().toDate()
        })
    }

    const handleNamaPria = (text) => {
        setNamaPria(text);
        validateForm();
    };

    const handleTempatLahirPria = (text) => {
        setTempatLahirPria(text);
        validateForm();
    };

    const handleTanggalLahirPria = (text) => {
        setTanggalLahirPria(text);
        validateForm();
    };

    const handleTeleponPria = (text) => {
        setTeleponPria(text);
        validateForm();
    };

    const handleAlamatPria = (text) => {
        setAlamatPria(text);
        validateForm();
    };

    const handleKewarganegaraanPria = (text) => {
        setSelectedNationalityPria(text);
        validateForm();
    };

    const handlePekerjaanPria = (text) => {
        setPekerjaanPria(text);
        validateForm();
    };

    const handleKpkPria = (text) => {
        setKpkPria(text);
        validateForm();
    };

    const handleNamaWanita = (text) => {
        setNamaWanita(text);
        validateForm();
    };

    const handleTeleponWanita = (text) => {
        setTeleponWanita(text);
        validateForm();
    };

    const handleTempatLahirWanita = (text) => {
        setTempatLahirWanita(text);
        validateForm();
    };

    const handleTanggalLahirWanita = (text) => {
        setTanggalLahirWanita(text);
        validateForm();
    };

    const handleAlamatWanita = (text) => {
        setAlamatWanita(text);
        validateForm();
    };

    const handleKewarganegaraanWanita = (text) => {
        setSelectedNationalityWanita(text);
        validateForm();
    };

    const handlePekerjaanWanita = (text) => {
        setPekerjaanWanita(text);
        validateForm();
    };

    const handleKpkWanita = (text) => {
        setKpkWanita(text);
        validateForm();
    };

    const validateForm = () => {
        setIsFormValid(namaPria !== '' && tanggalLahirPria !== '' && tempatLahirPria !== '' && alamatPria !== '' && selectedNationalityPria !== '' && pekerjaanPria !== '' && kpkPria !== '' && namaWanita !== '' && tempatLahirWanita !== '' && tanggalLahirWanita !== '' && alamatWanita !== '' && selectedNationalityWanita !== '' && pekerjaanWanita !== '' && kpkWanita !== '' && teleponPria !== '' && teleponWanita !== '')
    };

    const renderButton = () => {
        if (isFormValid) {
            return (
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => handleDaftar()}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Submit</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={styles.nextButtonDisable} disabled={true}
            >
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Submit</Text>
            </TouchableOpacity>
        );
    };

    const handleDaftar = () => {
        // console.log(name, tempatLahir, tanggalLahir, alamat, telepon, nameAyah, nameIbu, baptisanAyah, baptisanIbu, namaWali, baptisanWali)
        const penyerahanRegister = {
            nama_pria: namaPria,
            tempat_lahir_pria: tempatLahirPria,
            tanggal_lahir_pria: tanggalLahirPria,
            alamat_pria: alamatPria,
            no_telepon_pria: teleponPria,
            kewarganegaraan_pria: selectedNationalityPria,
            kpk_wilayah_pria: kpkPria,
            foto_ttd_pria: byteKTP,
            nama_wanita: namaWanita,
            tempat_lahir_wanita: tempatLahirWanita,
            tanggal_lahir_wanita: tanggalLahirWanita,
            alamat_wanita: alamatWanita,
            no_telepon_wanita: teleponWanita,
            kewarganegaraan_wanita: selectedNationalityWanita,
            kpk_wilayah_wanita: kpkWanita,
            foto_ttd_wanita: byteFotoBerwarna
        }
        axios.post('https://da60-2001-448a-2020-6cab-fcb2-8f92-4d2e-9886.ngrok-free.app/pernikahan', penyerahanRegister)
            .then(response => {
                // handle successful response
                console.log(response.data);
                navigation.navigate('BottomNavigation')
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    }

    async function pickDocumentKTP() {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result)

        const blobToBase64 = (blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    resolve(base64String);
                };
                reader.onerror = (err) => {
                    reject(err);
                };
                reader.readAsDataURL(blob);
            });
        };

        if (!result.cancelled) {
            setFotoKTP(result.name);
            setKtpPreview(result.uri);
            const respones = await fetch(result.uri)
            const blob = await respones.blob()
            const byteData = await blobToBase64(blob)
            setByteKTP(byteData)
            console.log((byteData + '').length)

        }

        console.log(fotoKTP)
    }

    function clearDocumentKTP() {
        setFotoKTP(null);
        setKtpPreview(null);
        setFileTypeKtp(null);
    }

    async function pickDocumentFotoBerwarna() {
        let result = await DocumentPicker.getDocumentAsync({});

        const blobToBase64 = (blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    resolve(base64String);
                };
                reader.onerror = (err) => {
                    reject(err);
                };
                reader.readAsDataURL(blob);
            });
        };

        console.log(result)

        if (!result.cancelled) {
            setFotoBerwarna(result.name);
            setFotoBerwarnaPreview(result.uri);
            const respones = await fetch(result.uri)
            const blob = await respones.blob()
            const byteData = await blobToBase64(blob)
            setByteFotoBerwarna(byteData)
            // console.log((byteData + '').substring(0, 50))
            // console.log("image masuk")
            // const images = await RNFetchBlob.fs.readFile(result.uri, 'base64')
            // console.log(images)
        }
    }

    function clearDocumentFotoBerwarna() {
        setFotoBerwarna(null);
        setFotoBerwarnaPreview(null);
        setFileTypeFotoBerwarna(null);
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, marginBottom: 20 }}>
            {isLoading ?
                <View style={styles.unauthorizedContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View>
                :
                (isAuthorized ?
                    <View>
                        <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 10 }}>
                                Form Mempelai Pria
                            </Text>
                            <LabeledInput
                                label='Nama Mempelai Pria'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleNamaPria}
                            />

                            <LabeledInput
                                label='Tempat Lahir Mempelai Pria'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleTempatLahirPria}
                            />

                            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => showDatePicker('tglLahir')}>
                                <LabeledInput
                                    placeholder='Tanggal Lahir'
                                    label='Tanggal Lahir'
                                    style={styles.dateInput}
                                    value={tanggalLahirPria && moment(tanggalLahirPria).format('LL')}
                                    editable={false}
                                    mode="outlined"
                                    outlineColor="black"
                                    activeOutlineColor="black"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={handleTanggalLahirPria}
                                />
                            </TouchableOpacity>

                            <LabeledInput
                                label='No Telepon Mempelai Pria'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleTeleponPria}
                                keyboardType='phone-pad'
                            />

                            <LabeledInput
                                label='Alamat Mempelai Pria'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleAlamatPria}
                            />

                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Kewarganegaraan
                            </Text>
                            <Picker
                                style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
                                selectedValue={selectedNationalityPria}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedNationalityPria(itemValue)
                                }>
                                {nationalities.map(nationality => (
                                    <Picker.Item key={nationality} label={nationality} value={nationality} />
                                ))}
                            </Picker>

                            <LabeledInput
                                label='Pekerjaan Mempelai Pria'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handlePekerjaanPria}
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
                                                {/* <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                        Nomor Induk Jemaat
                                    </Text>
                                    <TextInput
                                        value={pernikahanData.mempelaiPria.noJemaat}
                                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'noJemaat')}
                                        placeholder='Masukkan Nomor Induk Jemaat'
                                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                                    /> */}


                                                <LabeledInput
                                                    label='KPK Wilayah'
                                                    style={styles.dateInput}
                                                    mode='outlined'
                                                    outlineColor='black'
                                                    activeOutlineColor="#4281A4"
                                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                                    textColor="black"
                                                    onChangeText={handleKpkPria}
                                                />
                                            </View>
                                        </>)
                            }

                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Upload Foto Tanda Tangan Mempelai Pria
                            </Text>
                            {ktpPreview && (
                                <Image source={{ uri: ktpPreview }} style={{ width: 100, height: 100 }} />
                            )}
                            {fotoKTP &&
                                <Text>{fotoKTP}</Text>
                            }

                            {!ktpPreview && (
                                <TouchableOpacity
                                    style={styles.nextButton}
                                    onPress={pickDocumentKTP}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Select a document</Text>
                                </TouchableOpacity>
                            )}
                            {ktpPreview && (
                                <TouchableOpacity
                                    style={styles.changeButton}
                                    onPress={clearDocumentKTP}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Change a document</Text>
                                </TouchableOpacity>
                            )}

                            <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 10 }}>
                                Form Mempelai Wanita
                            </Text>
                            <LabeledInput
                                label='Nama Mempelai Wanita'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleNamaWanita}
                            />

                            <LabeledInput
                                label='Tempat Lahir Mempelai Wanita'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleTempatLahirWanita}
                            />

                            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => showDatePickerWanita('tglLahir')}>
                                <LabeledInput
                                    placeholder='Tanggal Lahir'
                                    label='Tanggal Lahir'
                                    style={styles.dateInput}
                                    value={tanggalLahirWanita && moment(tanggalLahirWanita).format('LL')}
                                    editable={false}
                                    mode="outlined"
                                    outlineColor="black"
                                    activeOutlineColor="black"
                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                    textColor="black"
                                    onChangeText={handleTanggalLahirWanita}
                                />
                            </TouchableOpacity>

                            <LabeledInput
                                label='No Telepon Mempelai Wanita'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleTeleponWanita}
                                keyboardType='phone-pad'
                            />

                            <LabeledInput
                                label='Alamat Mempelai Wanita'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleAlamatWanita}
                            />

                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Kewarganegaraan
                            </Text>
                            <Picker
                                style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
                                selectedValue={selectedNationalityWanita}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedNationalityWanita(itemValue)
                                }>
                                {nationalities.map(nationality => (
                                    <Picker.Item key={nationality} label={nationality} value={nationality} />
                                ))}
                            </Picker>

                            <LabeledInput
                                label='Pekerjaan Mempelai Wanita'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handlePekerjaanWanita}
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
                                                {/* <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                        Nomor Induk Jemaat
                                    </Text>
                                    <TextInput
                                        value={pernikahanData.mempelaiPria.noJemaat}
                                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'noJemaat')}
                                        placeholder='Masukkan Nomor Induk Jemaat'
                                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                                    /> */}


                                                <LabeledInput
                                                    label='KPK Wilayah'
                                                    style={styles.dateInput}
                                                    mode='outlined'
                                                    outlineColor='black'
                                                    activeOutlineColor="#4281A4"
                                                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                                    textColor="black"
                                                    onChangeText={handleKpkWanita}
                                                />
                                            </View>
                                        </>)
                            }
                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Upload Foto Tanda Tangan Mempelai Wanita
                            </Text>
                            {fotoBerwarnaPreview && (
                                <Image source={{ uri: fotoBerwarnaPreview }} style={{ width: 100, height: 100 }} />
                            )}
                            {fotoBerwarna &&
                                <Text>{fotoBerwarna}</Text>
                            }
                            {!fotoBerwarnaPreview && (
                                <TouchableOpacity
                                    style={styles.nextButton}
                                    onPress={pickDocumentFotoBerwarna}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Select a document</Text>
                                </TouchableOpacity>
                            )}
                            {fotoBerwarnaPreview && (
                                <TouchableOpacity
                                    style={styles.changeButton}
                                    onPress={clearDocumentFotoBerwarna}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Change a document</Text>
                                </TouchableOpacity>
                            )}

                            {renderButton()}
                        </ScrollView>
                    </View>
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
    },
    nextButtonDisable: {
        height: 48,
        backgroundColor: '#b1b1b1',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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

export default PernikahanDetail2