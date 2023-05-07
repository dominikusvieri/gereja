import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


const DataPribadi = () => {
    const [formCount, setFormCount] = useState(1); // inisialisasi jumlah form awal dengan 1
    const [asuhan, setAsuhan] = useState('')

    const navigation = useNavigation()
    const renderForms = () => {
        let forms = [];
        for (let i = 1; i <= formCount; i++) {
            forms.push(
                <View key={i.toString()}>
                    <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10 }}>
                        Anak ke - {i}
                    </Text>
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
                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        No. Telepon
                    </Text>
                    <TextInput
                        placeholder='Masukkan Nomor Telepon'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                    />

                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Dibawah Asuhan
                    </Text>
                    <RadioButton.Group onValueChange={value => setAsuhan(value)} value={asuhan}>
                        <RadioButton.Item label='Orang Tua' value='orang tua' />
                        <RadioButton.Item label='Wali' value='wali' />
                    </RadioButton.Group>
                </View>
            );
        }
        return forms;
    };

    const handleInputChange = (text) => {
        // konversi input menjadi bilangan bulat
        const count = parseInt(text);
        if (isNaN(count)) {
            // jika input bukan angka, set jumlah form menjadi 1
            setFormCount(1);
        } else {
            // jika input angka, set jumlah form sesuai input
            setFormCount(count);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                    Form Data Diri Anak
                </Text>
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Jumlah Anak yang Diserahkan:
                </Text>
                <TextInput
                    placeholder="Masukkan Jumlah Anak"
                    keyboardType="numeric"
                    onChangeText={handleInputChange}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />
                {renderForms()}

                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                    Form Data Diri Orang Tua / Wali
                </Text>
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nama Ayah
                </Text>
                <TextInput
                    placeholder='Masukkan Nama Ayah'
                    editable={asuhan == 'orang tua' ? true : false}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nama Ibu
                </Text>
                <TextInput
                    placeholder='Masukkan Nama Ibu'
                    editable={asuhan == 'orang tua' ? true : false}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Nama Wali
                </Text>
                <TextInput
                    placeholder='Masukkan Wali'
                    editable={asuhan == 'wali' ? true : false}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Babtisan Ayah di Gereja
                </Text>
                <TextInput
                    placeholder='Masukkan Nama Ibu'
                    editable={asuhan == 'orang tua' ? true : false}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Babtisan Ibu di Gereja
                </Text>
                <TextInput
                    placeholder='Masukkan Nama Ibu'
                    editable={asuhan == 'orang tua' ? true : false}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Babtisan Wali di Gereja
                </Text>
                <TextInput
                    placeholder='Masukkan Nama Ibu'
                    editable={asuhan == 'wali' ? true : false}
                    style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                />
                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15, marginTop: 50 }} onPress={() => navigation.navigate('DataPribadi')} >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SELANJUTNYA</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default DataPribadi