import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput as LabeledInput } from "react-native-paper";


const DataPribadi = () => {
    const [formCount, setFormCount] = useState(1); // inisialisasi jumlah form awal dengan 1
    const [asuhan, setAsuhan] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate());
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());

    const onTanggalLahirChange = (event, selectedDate) => (dateType) => {
        setTanggalLahir(selectedDate);
        handleInputChange(selectedDate, dateType);
    }

    const showDatePicker = (dateType) => {
        DateTimePickerAndroid.open({
            value: dateType === 'tglLahir' ? tanggalLahir : tanggalBaptis,
            onChange: (event, selectedDate) => onTanggalLahirChange(event, selectedDate)(dateType),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().toDate()
        })
    }

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
                        Tempat Lahir
                    </Text>
                    <TextInput
                        placeholder='Contoh: Jakarta'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}

                    />

                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => showDatePicker('tglLahir')}>
                        <LabeledInput
                            placeholder='Tanggal Lahir'
                            label='Tanggal Lahir'
                            style={styles.dateInput}
                            value={tanggalLahir && moment(tanggalLahir).format('LL')}
                            editable={false}
                            mode="outlined"
                            outlineColor="black"
                            activeOutlineColor="black"
                            theme={{ colors: { onSurfaceVariant: 'grey' } }}
                            textColor="black"
                        />
                    </TouchableOpacity>

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

                {
                    asuhan == 'orang tua' ?
                        <>
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
                        </> :
                        <>
                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Nama Wali
                            </Text>
                            <TextInput
                                placeholder='Masukkan Wali'
                                editable={asuhan == 'wali' ? true : false}
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
                        </>
                }

                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15, marginTop: 50 }} onPress={() => navigation.navigate('DataPribadi')} >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SELANJUTNYA</Text>
                </TouchableOpacity>
            </ScrollView>
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
        marginTop: 10
    },
    nextText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default DataPribadi