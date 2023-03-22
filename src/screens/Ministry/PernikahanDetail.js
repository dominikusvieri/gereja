import { View, Text, ScrollView, SafeAreaView, TextInput, Pick } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker'
import { Picker } from '@react-native-picker/picker';

const PernikahanDetail = () => {
    const [nationalities, setNationalities] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState(null);

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


    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nama
                </Text>
                <TextInput
                    placeholder='Masukkan Nama'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 5 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Tempat, Tanggal Lahir
                </Text>
                <TextInput
                    placeholder='Masukkan Nama'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 5 }}

                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Alamat
                </Text>
                <TextInput
                    placeholder='Masukkan Nama'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 5 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Kewarganegaraan
                </Text>
                <Picker
                    style={{backgroundColor:'#889983', borderWidth: 2, borderColor:'#000'}}
                    selectedValue={selectedNationality}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedNationality(itemValue)
                    }>
                    {nationalities.map(nationality => (
                        <Picker.Item key={nationality} label={nationality} value={nationality} />
                    ))}
                </Picker>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PernikahanDetail