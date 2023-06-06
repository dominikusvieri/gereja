import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput as LabeledInput } from "react-native-paper";
import axios from 'axios';


const DataPribadi = () => {
    const [formCount, setFormCount] = useState(1); // inisialisasi jumlah form awal dengan 1
    const [asuhan, setAsuhan] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate());
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());
    const [name, setName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [tempatLahir, setTempatLahir] = useState('');
    const [alamat, setAlamat] = useState('');
    const [telepon, setTelepon] = useState('');
    const [namaWali, setNamaWali] = useState('')
    const [baptisanWali, setBaptisanWali] = useState('');
    const [nameAyah, setNameAyah] = useState('');
    const [nameIbu, setNameIbu] = useState('');
    const [baptisanAyah, setBaptisanAyah] = useState('');
    const [baptisanIbu, setBaptisanIbu] = useState('');

    const onTanggalLahirChange = (event, selectedDate) => (dateType) => {
        setTanggalLahir(selectedDate);
        handleInputChange(selectedDate, dateType);
    }

    const handleNameChange = (text) => {
        setName(text);
        validateForm()
    };

    const handleTangggalLahir = (text) => {
        setTanggalLahir(text);
        validateForm();
    };

    const handleTempatLahir = (text) => {
        setTempatLahir(text);
        validateForm();
    };

    const handleAlamat = (text) => {
        setAlamat(text);
        validateForm();
    };

    const handleTelepon = (text) => {
        setTelepon(text);
        validateForm();
    };

    const handleNamaWali = (text) => {
        setNamaWali(text);
        validateForm();
    };

    const handleBaptisanWali = (text) => {
        setBaptisanWali(text);
        validateForm();
    };

    const handleNamaAyah = (text) => {
        setNameAyah(text);
        validateForm();
    };

    const handleNamaIbu = (text) => {
        setNameIbu(text);
        validateForm();
    };

    const handleBaptisanAyah = (text) => {
        setBaptisanAyah(text);
        validateForm();
    };

    const handleBaptisanIbu = (text) => {
        setBaptisanIbu(text);
        validateForm();
    };

    const validateForm = () => {
        if (asuhan == 'wali') {
            setIsFormValid(name !== '' && tanggalLahir !== '' && tempatLahir !== '' && alamat !== '' && telepon !== '' && namaWali !== '' && baptisanWali !== '');
        } else {
            setIsFormValid(name !== '' && tanggalLahir !== '' && tempatLahir !== '' && alamat !== '' && telepon !== '' && nameAyah !== '' && nameIbu !== '' && baptisanAyah !== '' && baptisanIbu !== '');
        }
    };

    const renderButton = () => {
        if (isFormValid) {
            return (
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('BottomNavigation')}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Selanjutnya</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={styles.nextButtonDisable} disabled={true}
            >
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Selanjutnya</Text>
            </TouchableOpacity>
        );
    };

    const handleDaftar = () => {
        console.log(name, tempatLahir, tanggalLahir, alamat, telepon, nameAyah, nameIbu, baptisanAyah, baptisanIbu, namaWali, baptisanWali)
        const penyerahanRegister = {
            nama: name,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            alamat: alamat,
            no_telepon: telepon,
            nama_ayah: nameAyah,
            nama_ibu: nameIbu,
            baptisan_ayah: baptisanAyah,
            baptisan_ibu: baptisanIbu,
            nama_wali: namaWali,
            baptisan_wali: baptisanWali
        }
        axios.post(' https://e0ed-2001-448a-2020-8c4a-38b3-3995-dbe3-8d0e.ngrok-free.app/penyerahananak', penyerahanRegister)
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
                    <LabeledInput
                        label='Nama Anak'
                        style={styles.dateInput}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={handleNameChange}
                    />

                    <LabeledInput
                        label='Tempat Lahir'
                        style={styles.dateInput}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={handleTempatLahir}
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
                            onChangeText={handleTangggalLahir}
                        />
                    </TouchableOpacity>


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
                <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4' }}>
                    Form Data Diri Anak
                </Text>
                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Jumlah Anak yang Diserahkan:
                </Text>
                <LabeledInput
                    label='Jumlah Anak'
                    style={styles.dateInput}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={handleInputChange}
                    keyboardType='numeric'
                />
                {renderForms()}



                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Dibawah Asuhan
                </Text>
                <RadioButton.Group onValueChange={value => setAsuhan(value)} value={asuhan}>
                    <RadioButton.Item label='Orang Tua' value='orang tua' />
                    <RadioButton.Item label='Wali' value='wali' />
                </RadioButton.Group>

                {/* <View>
                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Nama
                    </Text>
                    <TextInput
                        placeholder='Masukkan Nama'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                        onChangeText={handleNameChange}
                    />

                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Tempat Lahir
                    </Text>
                    <TextInput
                        placeholder='Contoh: Jakarta'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                        onChangeText={handleTempatLahir}
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
                            onChangeText={handleTangggalLahir}
                        />
                    </TouchableOpacity>

                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Alamat
                    </Text>
                    <TextInput
                        placeholder='Masukkan Alamat'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                        onChangeText={handleAlamat}
                    />
                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        No. Telepon
                    </Text>
                    <TextInput
                        placeholder='Masukkan Nomor Telepon'
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
                        onChangeText={handleTelepon}
                    />

                    <Text style={{ marginBottom: 5, marginTop: 10 }}>
                        Dibawah Asuhan
                    </Text>
                    <RadioButton.Group onValueChange={value => setAsuhan(value)} value={asuhan}>
                        <RadioButton.Item label='Orang Tua' value='orang tua' />
                        <RadioButton.Item label='Wali' value='wali' />
                    </RadioButton.Group>
                </View> */}
                <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4' }}>
                    Form Data Diri Orang Tua / Wali
                </Text>

                {
                    asuhan == 'orang tua' ?
                        <>
                            <LabeledInput
                                label='Nama Ayah'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleNamaAyah}
                            />

                            <LabeledInput
                                label='Nama Ibu'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleNamaIbu}
                            />

                            <LabeledInput
                                label='Nama Baptisan Ayah'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleBaptisanAyah}
                            />

                            <LabeledInput
                                label='Nama Baptisan Ibu'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleBaptisanIbu}
                            />

                            <LabeledInput
                                label='Alamat'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleAlamat}
                            />

                            <LabeledInput
                                label='Nomor Telepon'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleTelepon}
                                keyboardType='phone-pad'
                            />
                        </> :
                        <>
                            <LabeledInput
                                label='Nama Wali'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleNamaWali}
                            />

                            <LabeledInput
                                label='Nama Baptisan Wali'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleBaptisanWali}
                            />

                            <LabeledInput
                                label='Alamat'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleAlamat}
                            />

                            <LabeledInput
                                label='Nomor Telepon'
                                style={styles.dateInput}
                                mode='outlined'
                                outlineColor='black'
                                activeOutlineColor="#4281A4"
                                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                textColor="black"
                                onChangeText={handleTelepon}
                                keyboardType='phone-pad'
                            />
                        </>
                }
                {renderButton()}


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

export default DataPribadi