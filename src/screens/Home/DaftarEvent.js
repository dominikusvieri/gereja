import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { LOCAL_DEVICE_IP } from "@env"

const DaftarEvent = ({ route }) => {
    const data = route.params.param
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)
    const [isValidating, setIsValidating] = useState(false)
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true)

    const [name, setName] = useState("")
    const [nomorTelepon, setNomorTelepon] = useState("")
    const [email, setEmail] = useState("")
    const [event, setEvent] = useState({
        id: '',
        title: ''
    })

    const handleDaftar = async () => {
        if (event?.id && name && nomorTelepon && email) {
            setIsValidating(true)
            const body = {
                idEvent: event.id,
                namaPendaftar: name,
                noTelepon: nomorTelepon,
                email: email
            }

            await axios.post(`${LOCAL_DEVICE_IP}/pendaftaran-event/register`, body)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("Berhasil mendaftar event")
                    }
                })
                .catch(function (err) {
                    console.log(`Gagal mendaftar event: ${err}`)
                })
                .finally(function () {
                    setIsValidating(false)
                })
        }
    }

    const getCurrentEvent = () => {
        const config = {
            params: {
                id: data
            }
        }

        axios.get(`${LOCAL_DEVICE_IP}/event/find`, config)
            .then(function (res) {
                if (res.data) {
                    setEvent({
                        id: res.data?.id || '',
                        title: res.data?.title || ''
                    })
                }
            })
            .catch(function (err) {
                console.log(err)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getCurrentEvent()
    }, [])

    useEffect(() => {
        setIsValidating(true)
        const inputDebounce = setTimeout(() => {
            if (name && nomorTelepon && email) {
                setIsLoginButtonDisabled(false)
            }
            else {
                setIsLoginButtonDisabled(true)
            }
            setIsValidating(false)
        }, 500)

        return () => clearTimeout(inputDebounce)
    }, [name, nomorTelepon, email])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                    Form Pendaftaran Event
                </Text>
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nama
                </Text>
                <TextInput
                    placeholder='Masukkan Nama'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                    // value={name}
                    onChangeText={(e) => setName(e)}
                />
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nomor Telepon
                </Text>
                <TextInput
                    placeholder='Masukkan Nomor Telepon'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                    // value={nomorTelepon}
                    onChangeText={(e) => setNomorTelepon(e)}
                />
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Email
                </Text>
                <TextInput
                    placeholder='Masukkan Email'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                    // value={email}
                    onChangeText={(e) => setEmail(e)}
                />
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Event
                </Text>
                <Text>
                    {event?.title}
                </Text>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleDaftar}
                    disabled={isValidating || isLoginButtonDisabled}
                >
                    {isValidating ?
                        <ActivityIndicator size="small" color="white" />
                        :
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Daftar</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
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
        marginTop: 24,
        marginBottom: 30
    },
    nextButtonDisable: {
        height: 48,
        backgroundColor: '#b1b1b1',
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
    dateInput: {
        marginBottom: 12,
        backgroundColor: 'white',
        fontSize: 14,
        paddingHorizontal: 4
    },
})

export default DaftarEvent