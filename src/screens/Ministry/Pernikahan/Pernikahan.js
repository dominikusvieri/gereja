import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import UnauthorizedView from "../../../components/UnauthorizedView";
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { LOCAL_DEVICE_IP } from '@env'
import FormMempelaiPria from "./FormMempelaiPria";

export default function Pernikahan() {
    const ip = LOCAL_DEVICE_IP
    const [formPosition, setFormPosition] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isTerdaftarPernikahan, setIsTerdaftarPernikahan] = useState(false)
    const [countryList, setCountryList] = useState([])
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
    }

    const verifyTerdaftarPernikahan = async () => {
        setIsLoading(true)
        const accessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }

        axios.get(`${ip}/pernikahan/verify`, header)
            .then(function (response) {
                const data = response?.data
                if (data) {
                    setIsTerdaftarPernikahan(true)
                    setPernikahanData({
                        mempelaiPria: {
                            ...pernikahanData.mempelaiPria,
                            noJemaat: data.mempelaiPria.noJemaat,
                            nama: data.mempelaiPria.nama,
                            tempatLahir: data.mempelaiPria.tempatLahir,
                            tglLahir: data.mempelaiPria.tglLahir,
                            alamat: data.mempelaiPria.alamat,
                            wargaNegara: data.mempelaiPria.wargaNegara,
                            pekerjaan: data.mempelaiPria.pekerjaan,
                            baptis: data.mempelaiPria.baptis
                        },
                        mempelaiWanita: {
                            ...pernikahanData.mempelaiWanita,
                            noJemaat: data.mempelaiWanita.noJemaat,
                            nama: data.mempelaiWanita.nama,
                            tempatLahir: data.mempelaiWanita.tempatLahir,
                            tglLahir: data.mempelaiWanita.tglLahir,
                            alamat: data.mempelaiWanita.alamat,
                            wargaNegara: data.mempelaiWanita.wargaNegara,
                            pekerjaan: data.mempelaiWanita.pekerjaan,
                            baptis: data.mempelaiWanita.baptis
                        }
                    })
                }
                else {
                    setIsTerdaftarPernikahan(false)
                    setPernikahanData({
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
                }
            })
            .catch(function (error) {
                console.log("Error verifying: ", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    const getCountryList = async () => {
        setIsLoading(true)
        axios.get(`${ip}/api/countries`)
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

    useEffect(() => {
        verifyAuth()
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            verifyTerdaftarPernikahan()
            getCountryList()
        }
    }, [isAuthorized])

    const handleInputChange = (e, mempelaiGender, field) => {
        setPernikahanData({
            ...pernikahanData,
            [mempelaiGender]: {
                ...pernikahanData[mempelaiGender],
                [field]: e
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View>
                :
                (isAuthorized ?
                    (isTerdaftarPernikahan ?
                        <View>
                            <Text>Anda terdaftar pernikahan</Text>
                        </View>
                        // <FormMempelaiPria
                        //     data={pernikahanData.mempelaiPria}
                        //     handleInputChange={handleInputChange}
                        // />
                        :
                        // <View>
                        //     <Text>Anda belum terdaftar pernikahan {formPosition}</Text>
                        // </View>
                        (countryList &&
                            <FormMempelaiPria
                                data={pernikahanData.mempelaiPria}
                                handleInputChange={handleInputChange}
                                countryList={countryList}
                            />
                        )
                    )
                    :
                    <UnauthorizedView />
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4281A4'
    },
    registerButton: {
        paddingVertical: 12,
        paddingHorizontal: 56,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
})