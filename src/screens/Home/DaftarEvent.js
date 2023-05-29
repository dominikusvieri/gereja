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

    

    const handleDaftar = () => {
        console.log(name, nomorTelepon, email, data)
        const eventRegister = {
            name: name,
            nomor_telepon: nomorTelepon,
            email: email,
            event: data
        }
        axios.post('https://5e3d-110-35-80-202.ngrok-free.app/daftarevent', eventRegister )
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
                onChangeText={(e)=> setNomorTelepon(e)}
            />
            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Email
            </Text>
            <TextInput
                placeholder='Masukkan Email'
                style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                // value={email}
                onChangeText={(e)=> setEmail(e)}
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