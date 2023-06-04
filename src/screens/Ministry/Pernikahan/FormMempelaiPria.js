import React from "react";
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput as LabeledInput, RadioButton } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import 'moment/locale/id'

export default function FormMempelaiPria({ data, handleInputChange, countryList }) {
    moment.locale('id')
    const [isLoading, setIsLoading] = useState(false)
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate())
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate())
    const [wargaNegara, setWargaNegara] = useState('')
    const [countryListOpen, setCountryListOpen] = useState(false)

    const onTanggalLahirChange = (event, selectedDate, genderMempelai) => (dateType) => {
        setTanggalLahir(selectedDate);
        handleInputChange(selectedDate, genderMempelai, dateType);
    }

    const showDatePicker = (dateType, genderMempelai) => {
        DateTimePickerAndroid.open({
            value: dateType === 'tglLahir' ? tanggalLahir : tanggalBaptis,
            onChange: (event, selectedDate) => onTanggalLahirChange(event, selectedDate, genderMempelai)(dateType),
            mode: 'date',
            is24Hour: true,
            maximumDate: moment().toDate()
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <ActivityIndicator style={styles.activityIndicator} />
                :
                <ScrollView style={styles.scrollViewContainer}>
                    <Text style={styles.formTitle}>
                        Mempelai Pria
                    </Text>

                    {/* Name field */}
                    <LabeledInput
                        label='Nama'
                        style={styles.labeledInput}
                        value={data?.nama || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'nama')}
                    />

                    {/* Tempat lahir field */}
                    <LabeledInput
                        label='Tempat lahir'
                        style={styles.labeledInput}
                        value={data?.tempatLahir || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'tempatLahir')}
                    />

                    {/* Tanggal lahir field */}
                    <TouchableOpacity
                        onPress={() => showDatePicker('tglLahir', 'mempelaiPria')}
                    >
                        <LabeledInput
                            placeholder='Tanggal lahir'
                            label='Tanggal lahir'
                            style={styles.labeledInput}
                            value={data.tglLahir ? moment(data.tglLahir).format('LL') : null}
                            editable={false}
                            mode="outlined"
                            outlineColor="black"
                            activeOutlineColor="black"
                            theme={{ colors: { onSurfaceVariant: 'grey' } }}
                            textColor="black"
                        />
                    </TouchableOpacity>

                    {/* Alamat field */}
                    <LabeledInput
                        label='Alamat'
                        style={styles.labeledInput}
                        value={data?.alamat || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'alamat')}
                    />

                    {/* Kewarganegaraan dropdown */}
                    <Text style={styles.kewarganegaraanText}>
                        Kewarganegaraan
                    </Text>
                    <DropDownPicker
                        placeholder="Kewarganegaraan"
                        value={wargaNegara}
                        items={countryList}
                        open={countryListOpen}
                        setOpen={setCountryListOpen}
                        setValue={setWargaNegara}
                        onChangeValue={(e) => handleInputChange(e, 'mempelaiPria', 'wargaNegara')}
                        style={styles.kewarganegaraanDropdown}
                        placeholderStyle={{ color: 'grey' }}
                        listMode="MODAL"
                        itemKey='id'
                        searchable
                        searchPlaceholder='Cari negara...'
                    />

                    {/* Pekerjaan field */}
                    <LabeledInput
                        label='Pekerjaan'
                        style={styles.labeledInput}
                        value={data?.pekerjaan || ''}
                        mode='outlined'
                        outlineColor='black'
                        activeOutlineColor="#4281A4"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'pekerjaan')}
                    />

                    {/* Baptis */}
                    <Text style={styles.statusBaptis}>
                        Status Baptis
                    </Text>
                    <RadioButton.Group
                        onValueChange={(e) => handleInputChange(e, 'mempelaiPria', 'baptis')}
                        value={data?.baptis || false}
                    >
                        <RadioButton.Item label='Sudah baptis' value={true} />
                        <RadioButton.Item label='Belum baptis' value={false} />
                    </RadioButton.Group>

                    {!data.baptis ?
                        <Text style={{ color: 'red' }}>
                            *Anda harus sudah dibaptis untuk mendaftar
                        </Text>
                        :
                        <></>
                    }
                </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        marginBottom: 20
    },
    activityIndicator: {
        alignItems: 'center',
        height: '100%',
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    },
    scrollViewContainer: {
        paddingHorizontal: 20
    },
    formTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: '#4281A4',
        marginBottom: 16,
        marginTop: 20
    },
    labeledInput: {
        marginBottom: 12,
        backgroundColor: 'white',
        fontSize: 14,
        paddingHorizontal: 4
    },
    kewarganegaraanDropdown: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        color: 'black',
        backgroundColor: 'transparent',
        paddingHorizontal: 18,
        marginBottom: 12
    },
    kewarganegaraanText: {
        marginBottom: 5,
        color: 'grey',
        fontSize: 14
    },
    statusBaptis: {
        marginBottom: 5,
        marginTop: 10,
        fontSize: 16,
        color: '#4281A4',
        fontWeight: '600'
    }
})