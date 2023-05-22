import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
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
    const [storedAccessToken, setStoredAccessToken] = useState('')

    const getAccessToken = async () => {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        setStoredAccessToken(accessToken)
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
                    const data = response.data[0]

                    axios.get(`http://192.168.1.6:3001/api/country-details`, { params: { ciso: data.wargaNegara } })
                        .then(function (countryDetail) {
                            setUserData({
                                ...userData,
                                nama: data.nama,
                                email: data.email,
                                nik: data.nik,
                                noKk: data.noKk,
                                noJemaat: data.noJemaat,
                                telepon: data.telp,
                                wargaNegara: countryDetail.data.name,
                                alamat: data.alamat,
                                gender: data.gender,
                                tglLahir: data.tglLahir,
                                tempatLahir: data.tempatLahir,
                                pekerjaan: data.pekerjaan,
                                golDarah: data.golDarah,
                                statusBaptis: data.baptis,
                                tglBaptis: data.tglBaptis,
                                namaBaptis: data.namaBaptis,
                                tempatBaptis: data.tempatBaptis,
                            })
                        })
                        .catch(function (error) {
                            console.log("Error getting country name: ", error)
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
        getAccessToken()
    }, [])

    useEffect(() => {
        getUserData()
    }, [storedAccessToken])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View> :
                <React.Fragment>
                    <ScrollView style={{ paddingHorizontal: 24 }}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} style={styles.image} />
                        </View>
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
                    </ScrollView>

                    <TouchableOpacity
                        style={{ ...styles.changePhoneButton, margin: 24 }}
                        onPress={() => navigation.navigate('UbahTelepon', { telepon: userData.telepon })}
                    >
                        <Text style={styles.changePhoneText}>Ubah Nomor Telepon</Text>
                    </TouchableOpacity>
                </React.Fragment>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 24
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