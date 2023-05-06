import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import DataPribadiForm from '../../../components/Ministry/PenyerahanAnak/DataPribadiForm'

const DataPribadi = ({ route }) => {
    const jumlahAnak = route.params.param
    
    const [jumlahInput, setJumlahInput] = useState([jumlahAnak])
    console.log(jumlahInput)

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                    Form Data Diri Anak
                </Text>

                {
                    jumlahInput.map((input, index)=>{
                        <DataPribadiForm key={index}/>
                    })
                }
                

                {/* <View key={ jumlahAnak}>
                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Nama
                    </Text>
                    <TextInput
                        placeholder='Masukkan Nama'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                    />

                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Tempat, Tanggal Lahir
                    </Text>
                    <TextInput
                        placeholder='Contoh: Jakarta, 10-01-1999'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}

                    />

                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Alamat
                    </Text>
                    <TextInput
                        placeholder='Masukkan Alamat'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                    />
                </View> */}

            </ScrollView>
        </View>
    )
}

export default DataPribadi