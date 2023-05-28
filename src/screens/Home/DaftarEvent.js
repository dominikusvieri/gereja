import { View, Text, TextInput, TouchableOpacity } from 'react-native'
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

    const handleEvent = (inputEvent) => {
        setEvent(inputEvent)
    }

    const handleDaftar = () => {
        const eventRegister = {
            name: name,
            nomor_telepon: nomorTelepon,
            email: email,
            event: event
        }
        axios.post('https://44b4-2001-448a-2020-8c4a-7488-3ff7-97f7-e2db.ngrok-free.app/daftarevent', { eventRegister })
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
            />
            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Nomor Telepon
            </Text>
            <TextInput
                placeholder='Masukkan Nomor Telepon'
                style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
            />
            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Email
            </Text>
            <TextInput
                placeholder='Masukkan Email'
                style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
            />
            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Event
            </Text>
            <Text>
                {data}
            </Text>
            <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15, marginBottom: 20, marginTop: 20 }} onPress={() => handleDaftar()} >
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Daftar</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}

export default DaftarEvent