import { View, Text, ScrollView, SafeAreaView, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const PernikahanDetail = () => {
    const [nationalities, setNationalities] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [selectedKPK, setSelectedKPK] = useState(null);
    const [babtis, setBabtis] = useState('')
    const [pernahPelayanan, setPernahPelayanan] = useState('')
    
    const navigation = useNavigation()

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
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, marginBottom: 20 }}>
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
                    style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
                    selectedValue={selectedNationality}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedNationality(itemValue)
                    }>
                    {nationalities.map(nationality => (
                        <Picker.Item key={nationality} label={nationality} value={nationality} />
                    ))}
                </Picker>

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Pekerjaan
                </Text>
                <TextInput
                    placeholder='Masukkan Nama'
                    style={{ borderWidth: 1, borderColor: '#000', padding: 5 }}
                />

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Sudah Babtis?
                </Text>
                <RadioButton.Group onValueChange={value => setBabtis(value)} value={babtis}>
                    <RadioButton.Item label='Sudah' value='sudah' />
                    <RadioButton.Item label='Belum' value='belum' />
                </RadioButton.Group>

                {
                    babtis == '' ? (
                        <></>
                    ):
                    babtis == 'belum' ?
                        (<>
                            <View>
                                <Text style={{ color: 'red' }}>*Silahkan dibabtis terlebih dahulu</Text>
                            </View>
                        </>) : (<>
                            <View>
                                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                    Nomor Induk Jemaat
                                </Text>
                                <TextInput
                                    placeholder='Masukkan Nama'
                                    style={{ borderWidth: 1, borderColor: '#000', padding: 5 }}
                                />

                                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                    KPK Wilayah
                                </Text>
                                <Picker
                                    style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
                                    selectedValue={selectedKPK}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedKPK(itemValue)
                                    }>
                                    {nationalities.map(nationality => (
                                        <Picker.Item key={nationality} label={nationality} value={nationality} />
                                    ))}
                                </Picker>
                            </View>
                        </>)
                }

                <Text style={{ marginBottom: 5, marginTop: 10 }}>
                    Pernah Aktif dalam Pelayanan ?
                </Text>
                <RadioButton.Group onValueChange={value => setPernahPelayanan(value)} value={pernahPelayanan}>
                    <RadioButton.Item label='Iya' value='iya' />
                    <RadioButton.Item label='Tidak' value='tidak' />
                </RadioButton.Group>
                {
                    pernahPelayanan == 'iya' ? (
                        <>
                            <Text style={{ marginBottom: 5, marginTop: 10 }}>
                                Pelayanan yang pernah diikuti
                            </Text>
                            <Picker
                                style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000', marginBottom: 20 }}
                                selectedValue={selectedKPK}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedKPK(itemValue)
                                }>
                                {nationalities.map(nationality => (
                                    <Picker.Item key={nationality} label={nationality} value={nationality} />
                                ))}
                            </Picker>
                        </>
                    ) : (
                        <>

                        </>
                    )
                }
                <Button title='Submit' color={'#0885F8'}  onPress={() => navigation.navigate('BottomNavigation')} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default PernikahanDetail