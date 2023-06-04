import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const DaftarEvent = ({ route }) => {
    const data = route.params.param
    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [nomorTelepon, setNomorTelepon] = useState("")
    const [email, setEmail] = useState("")
    const [event, setEvent] = useState("")

    const handleName = (inputName) => {
        setName(inputName)
    }

    const handleTelepon = (inputTelepon) => {
        setNomorTelepon(inputTelepon)
    }

    const handleEmail = (inputEmail) => {
        setEmail(inputEmail)
    }



    const handleDaftar = () => {
        console.log(name, nomorTelepon, email, data)
        const eventRegister = {
            name: name,
            nomor_telepon: nomorTelepon,
            email: email,
            event: data
        }
        axios.post('https://5e3d-110-35-80-202.ngrok-free.app/daftarevent', eventRegister)
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
                    {data}
                </Text>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('BottomNavigation')}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Submit</Text>
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
        marginTop: 10, 
        marginBottom:30
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