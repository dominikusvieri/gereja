import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { TextInput as LabeledInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";

export default function BiodataRegister2({ nextPage, data, handleInputChange }) {
    moment.locale(data.wargaNegara === 'IDN' ? 'id' : 'en');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [gender, setGender] = useState(data?.gender);
    const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
    const [genderEnum, setGenderEnum] = useState([
        { label: 'Laki-laki', value: 'lakiLaki' },
        { label: 'Perempuan', value: 'perempuan' }
    ]);
    const [baptis, setBaptis] = useState(data?.baptis);
    const [baptisDropdownOpen, setBaptisDropdownOpen] = useState(false);
    const [baptisEnum, setBaptisEnum] = useState([
        { label: 'Sudah baptis', value: true },
        { label: 'Belum baptis', value: false }
    ]);
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate());
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());

    useEffect(() => {
        const inputDebounce = setTimeout(() => {
            // All fields validation
            if (data.gender && data.tglLahir && data.baptis && data.tglBaptis && data.namaBaptis && data.tempatBaptis) {
                setIsNextButtonDisabled(false)
            }
            else {
                setIsNextButtonDisabled(true)
            }
        }, 500);

        return () => clearTimeout(inputDebounce);
    }, [data])

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

    function validateInput() {
        if (data.gender && data.tglLahir && data.baptis && data.tglBaptis && data.namaBaptis && data.tempatBaptis) {
            nextPage()
        }
    }

    return (
        <React.Fragment>
            <KeyboardAwareScrollView>
                <Text style={styles.title}>
                    Data Diri
                </Text>
                <Text style={styles.description}>
                    Masukkan data diri Anda
                </Text>
                <DropDownPicker
                    placeholder='Gender'
                    value={gender}
                    items={genderEnum}
                    open={genderDropdownOpen}
                    setOpen={setGenderDropdownOpen}
                    setValue={setGender}
                    onChangeValue={(e) => handleInputChange(e, 'gender')}
                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: genderDropdownOpen ? 94 : 12 }]}
                    placeholderStyle={{ color: 'grey' }}
                    listMode="SCROLLVIEW"
                />
                <TouchableOpacity onPress={() => showDatePicker('tglLahir')}>
                    <LabeledInput
                        placeholder='Tanggal Lahir'
                        label='Tanggal Lahir'
                        style={styles.dateInput}
                        value={data.tglLahir && moment(data.tglLahir).format('LL')}
                        editable={false}
                        mode="outlined"
                        outlineColor="black"
                        activeOutlineColor="black"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                    />
                </TouchableOpacity>
                <DropDownPicker
                    placeholder='Status Baptis'
                    value={baptis}
                    items={baptisEnum}
                    open={baptisDropdownOpen}
                    setOpen={setBaptisDropdownOpen}
                    setValue={setBaptis}
                    onChangeValue={(e) => handleInputChange(e, 'baptis')}
                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: baptisDropdownOpen ? 94 : 12 }]}
                    placeholderStyle={{ color: 'grey' }}
                    listMode="SCROLLVIEW"
                />
                <TouchableOpacity onPress={() => showDatePicker('tglBaptis')}>
                    <LabeledInput
                        placeholder='Tanggal Baptis'
                        label='Tanggal Baptis'
                        style={styles.dateInput}
                        value={data.tglBaptis && moment(data.tglBaptis).format('LL')}
                        editable={false}
                        mode="outlined"
                        outlineColor="black"
                        activeOutlineColor="black"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                    />
                </TouchableOpacity>
                <LabeledInput
                    label='Nama Baptis'
                    style={styles.dateInput}
                    mode="outlined"
                    outlineColor="black"
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'namaBaptis')}
                />
                <LabeledInput
                    label='Tempat Baptis'
                    style={styles.dateInput}
                    mode="outlined"
                    outlineColor="black"
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'tempatBaptis')}
                />
                <TouchableOpacity
                    style={!isNextButtonDisabled ? styles.nextButton : { ...styles.nextButton, backgroundColor: '#E4DFDA' }}
                    onPress={validateInput}
                    disabled={isNextButtonDisabled}
                >
                    <Text style={styles.nextText}>Selanjutnya</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </React.Fragment>
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
        marginBottom: 50
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