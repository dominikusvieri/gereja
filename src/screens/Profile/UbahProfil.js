import React, { useEffect, useState } from 'react'
import { TextInput as LabeledInput } from "react-native-paper";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from '@rneui/base';
import moment from 'moment';
import 'moment/locale/id';

export default function UbahProfil({ navigation }) {
    moment.locale('id');
    const [userData, setUserData] = useState({
        // Account data
        email: '',
        nama: '',
        nik: '',
        noJemaat: '',
        noKk: '',
        wargaNegara: '',
        alamat: '',
        telepon: '',
        gender: '',
        tglLahir: '',
        alamat: '',
        tempatLahir: '',
        pekerjaan: '',
        golDarah: '',
        statusBaptis: '',
        tglBaptis: '',
        namaBaptis: '',
        tempatBaptis: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [kodeTeleponOpen, setKodeTeleponOpen] = useState(false)
    const [kodeTelepon, setKodeTelepon] = useState('')
    const [countriesIdd, setCountriesIdd] = useState([])

    const getCountriesIdd = async () => {
        setIsLoading(true)

        axios.get('https://restcountries.com/v3.1/all?fields=name,idd,flags')
            .then(function (response) {
                const iddData = response.data;
                const cleanedCountriesIdd = []
                if (iddData) {
                    iddData.map((countryIdd, index) => {
                        if (countryIdd.idd.suffixes.length > 1) {
                            cleanedCountriesIdd.push({
                                id: index,
                                label: countryIdd.idd.root,
                                value: countryIdd.idd.root,
                            })
                        }
                        else if (countryIdd.idd.root) {
                            cleanedCountriesIdd.push({
                                id: index,
                                label: countryIdd.idd.root + countryIdd.idd.suffixes[0],
                                value: countryIdd.idd.root + countryIdd.idd.suffixes[0],
                            })
                        }
                    })
                }

                setCountriesIdd(cleanedCountriesIdd)
            })
            .catch(function (error) {
                console.log("Error getting country idd list", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    const getUserData = async () => {
        let storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        if (header) {
            setIsLoading(true)
            axios.get(`http://192.168.1.6:3001/jemaat`, header)
                .then(function (response) {
                    setUserData({
                        ...userData,
                        nama: response.data[0].nama,
                        email: response.data[0].email,
                        nik: response.data[0].nik,
                        noKk: response.data[0].noKk,
                        noJemaat: response.data[0].noJemaat,
                        telepon: response.data[0].telp,
                        wargaNegara: response.data[0].wargaNegara,
                        alamat: response.data[0].alamat,
                        gender: response.data[0].gender,
                        tglLahir: response.data[0].tglLahir,
                        tempatLahir: response.data[0].tempatLahir,
                        pekerjaan: response.data[0].pekerjaan,
                        golDarah: response.data[0].golDarah,
                        statusBaptis: response.data[0].baptis,
                        tglBaptis: response.data[0].tglBaptis,
                        namaBaptis: response.data[0].namaBaptis,
                        tempatBaptis: response.data[0].tempatBaptis,
                    })
                })
                .catch(function (error) {
                    console.log("Error getting user data: ", error)
                })
                .finally(function () {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        getUserData()
        getCountriesIdd()
    }, [useIsFocused()])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View> :
                <React.Fragment>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} style={styles.image} />
                    </View>
                    <ScrollView style={{ margin: 24 }}>
                        <View style={{ marginBottom: 24 }}>
                            <View style={styles.informasiContainer}>
                                <Text style={styles.titleText}>Informasi Akun</Text>
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Nama</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.nama}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Email</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.email}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Nomor Telepon</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.telepon}</Text>
                                <Divider color='black' />
                            </View>
                        </View>

                        <View style={{ marginBottom: 24 }}>
                            <View style={styles.informasiContainer}>
                                <Text style={styles.titleText}>Data Personal</Text>
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>NIK</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.nik}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Nomor KK</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.noKk}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Nomor Jemaat</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.noJemaat}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Warga Negara</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.wargaNegara}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Alamat</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.alamat}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Gender</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.gender === 'lakiLaki' ? 'Laki-laki' : 'Perempuan'}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Tanggal Lahir</Text>
                                <Text style={{ marginVertical: 4 }}>{moment(userData.tglLahir).format('LL')}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Tempat Lahir</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.tempatLahir}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Pekerjaan</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.pekerjaan}</Text>
                                <Divider color='black' />
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Golongan Darah</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.golDarah}</Text>
                                <Divider color='black' />
                            </View>
                        </View>

                        <View style={{ marginBottom: 24 }}>
                            <Text style={styles.titleText}>Data Baptis</Text>
                            <View style={styles.informasiContainer}>
                            </View>
                            <View style={{ display: 'flex', marginBottom: 12 }}>
                                <Text style={{ color: 'grey', fontSize: 14 }}>Status Baptis</Text>
                                <Text style={{ marginVertical: 4 }}>{userData.statusBaptis ? "Sudah dibaptis" : "Belum dibaptis"}</Text>
                                <Divider color='black' />
                            </View>
                            {userData.statusBaptis &&
                                <React.Fragment>
                                    <View style={{ display: 'flex', marginBottom: 12 }}>
                                        <Text style={{ color: 'grey', fontSize: 14 }}>Tanggal Baptis</Text>
                                        <Text style={{ marginVertical: 4 }}>{moment(userData.tglBaptis).format('LL')}</Text>
                                        <Divider color='black' />
                                    </View>
                                    <View style={{ display: 'flex', marginBottom: 12 }}>
                                        <Text style={{ color: 'grey', fontSize: 14 }}>Nama Baptis</Text>
                                        <Text style={{ marginVertical: 4 }}>{userData.namaBaptis}</Text>
                                        <Divider color='black' />
                                    </View>
                                    <View style={{ display: 'flex', marginBottom: 12 }}>
                                        <Text style={{ color: 'grey', fontSize: 14 }}>Tempat Baptis</Text>
                                        <Text style={{ marginVertical: 4 }}>{userData.tempatBaptis}</Text>
                                        <Divider color='black' />
                                    </View>
                                </React.Fragment>
                            }
                        </View>

                        <TouchableOpacity
                            style={styles.changePhoneButton}
                            onPress={() => navigation.navigate('UbahTelepon', { telepon: userData.telepon })}
                        >
                            <Text style={styles.changePhoneText}>Ubah Nomor Telepon</Text>
                        </TouchableOpacity>

                        {/* <LabeledInput
                    placeholder='Nomor Telepon'
                    label='Nomor Telepon'
                    value={userData.telepon}
                    editable={false}
                    mode='outlined'
                    style={styles.labeledInput}
                    outlineColor='black'
                    activeOutlineColor='black'
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                />


                <LabeledInput
                    placeholder='NIK'
                    label='NIK'
                    value={userData.nik}
                    mode='outlined'
                    style={styles.labeledInput}
                    outlineColor='black'
                    activeOutlineColor='black'
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                />
                <LabeledInput
                    placeholder='No Jemaat'
                    label='No Jemaat'
                    value={userData.noJemaat}
                    mode='outlined'
                    style={styles.labeledInput}
                    outlineColor='black'
                    activeOutlineColor='black'
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                />
                <Text style={{ color: 'grey', marginBottom: 6, fontSize: 13 }}>Telepon</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ flex: 2, marginRight: 5 }}>
                        <DropDownPicker
                            placeholder=''
                            searchPlaceholder='Kode telepon...'
                            value={kodeTelepon}
                            items={countriesIdd}
                            searchable
                            open={kodeTeleponOpen}
                            setOpen={setKodeTeleponOpen}
                            setValue={setKodeTelepon}
                            // onChangeValue={(e) => handleInputChange(e, 'kodeTelepon')}
                            listMode="MODAL"
                            language="ID"
                            itemKey="id"
                            style={[styles.input, { backgroundColor: 'transparent' }]}
                            placeholderStyle={{ color: 'grey' }}
                        />
                    </View>
                    <View style={{ flex: 4, marginLeft: 5 }}>
                        <TextInput
                            placeholder='Telepon'
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={userData.telepon}
                            onChangeText={(e) => handleInputChange(e, 'telepon')}
                        />
                    </View>
                </View> */}
                    </ScrollView>
                </React.Fragment>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    informasiContainer: {
        display: 'flex',
        marginTop: 0,
        marginHorizontal: 0,
        marginBottom: 12
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 39
    },
    titleText: {
        fontSize: 18,
        fontWeight: "500"
    },
    labeledInput: {
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        fontSize: 14,
        paddingHorizontal: 4
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    changePhoneButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    changePhoneText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})