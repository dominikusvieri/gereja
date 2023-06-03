import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput as LabeledInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import 'moment/locale/id';
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { LOCAL_DEVICE_IP } from "@env"

export default function BiodataRegister2({ nextPage, prevPage, data, handleInputChange, setSubmitStatus }) {
    moment.locale(data.wargaNegara === 'ID' ? 'id' : 'en');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [isValidating, setIsValidating] = useState(false);
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
    const [golDarah, setGolDarah] = useState(extractBloodGroup('group'));
    const [golDarahDropdownOpen, setGolDarahDropdownOpen] = useState(false);
    const [golDarahEnum, setGolDarahEnum] = useState([
        { label: 'O', value: 'O' },
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'AB', value: 'AB' }
    ])
    const [rhesus, setRhesus] = useState(extractBloodGroup('rhesus'));
    const [rhesusDropdownOpen, setRhesusDropdownOpen] = useState(false);
    const [rhesusEnum, setRhesusEnum] = useState([
        { label: 'Positif (Rh+)', value: '+' },
        { label: 'Negatif (Rh-)', value: '-' },
        { label: 'Tidak tahu', value: '' },
    ])

    const dataBaptisValidation = () => {
        let validation = false
        if (data.baptis) {
            if (data.tglBaptis && data.namaBaptis && data.tempatBaptis) {
                validation = true
            }
            else {
                validation = false
            }
        }
        else {
            validation = true
        }
        return validation
    }

    useEffect(() => {
        setIsValidating(true);
        const inputDebounce = setTimeout(() => {
            // All fields validation
            if (data.gender && data.tempatLahir && data.tglLahir && (data.baptis !== null) && dataBaptisValidation() && data.pekerjaan) {
                setIsNextButtonDisabled(false)
            }
            else {
                setIsNextButtonDisabled(true)
            }
            setIsValidating(false);
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

    function handleSubmit() {
        setIsValidating(true)
        if (data.gender && data.tempatLahir && data.tglLahir && (data.baptis !== null) && dataBaptisValidation() && data.pekerjaan) {
            const cleanedData = {
                ...data,
                telp: data.kodeTelepon + ' ' + data.telepon
            }
            axios.post(`${LOCAL_DEVICE_IP}/jemaat/register`, cleanedData)
                .then(function (response) {
                    if (response.data.accessToken) {
                        SecureStore.setItemAsync("accessToken", response.data.accessToken)
                    }
                    console.log("Registration success");
                    setSubmitStatus(true);
                })
                .catch(function (error) {
                    console.log(error);
                    setSubmitStatus(false);
                }).finally(function () {
                    setIsValidating(false)
                    nextPage();
                });
        }
    }

    function extractBloodGroup(extractFor) {
        if (data.golonganDarah) {
            let finalStr = '';
            const alphabetRegex = /[A-Za-z]/g;
            const symbolRegex = /[\W_]+/;
            let matches = null;

            if (extractFor === 'group') {
                matches = data.golonganDarah.match(alphabetRegex);
            }
            else if (extractFor === 'rhesus') {
                matches = data.golonganDarah.match(symbolRegex);
            }

            finalStr = matches ? matches.join('') : '';

            return finalStr;
        }
        else {
            return data?.golonganDarah;
        }
    }

    const onGolDarahChange = (e, inputType) => {
        const string = data?.golonganDarah || '';
        const alphabetRegex = /[A-Za-z]+/;
        const symbolRegex = /[\W_]+/;
        let extractedGroup = string.match(alphabetRegex);
        let extracedRhesus = string.match(symbolRegex);
        let finalStr = '';

        if (inputType === 'group') {
            finalStr = e + (extracedRhesus ? extracedRhesus.join('') : '');
        }
        else if (inputType === 'rhesus') {
            finalStr = (extractedGroup ? extractedGroup.join('') : '') + e;
        }
        handleInputChange(finalStr, 'golonganDarah');
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
                <LabeledInput
                    label='Tempat Lahir'
                    style={styles.dateInput}
                    value={data.tempatLahir}
                    mode="outlined"
                    outlineColor="black"
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'tempatLahir')}
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
                {data.baptis &&
                    <React.Fragment>
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
                            value={data.namaBaptis}
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
                            value={data.tempatBaptis}
                            mode="outlined"
                            outlineColor="black"
                            activeOutlineColor="#4281A4"
                            theme={{ colors: { onSurfaceVariant: 'grey' } }}
                            textColor="black"
                            onChangeText={(e) => handleInputChange(e, 'tempatBaptis')}
                        />
                    </React.Fragment>
                }
                <LabeledInput
                    label='Pekerjaan'
                    style={styles.dateInput}
                    value={data.pekerjaan}
                    mode="outlined"
                    outlineColor="black"
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'pekerjaan')}
                />
                <Text style={{ marginBottom: 5, fontSize: 12 }}>Golongan Darah</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 5 }}>
                        <DropDownPicker
                            placeholder='Golongan'
                            value={golDarah}
                            items={golDarahEnum}
                            open={golDarahDropdownOpen}
                            setOpen={setGolDarahDropdownOpen}
                            setValue={setGolDarah}
                            onChangeValue={(e) => onGolDarahChange(e, 'group')}
                            style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: baptisDropdownOpen ? 94 : 12 }]}
                            placeholderStyle={{ color: 'grey' }}
                            listMode="SCROLLVIEW"
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 5 }}>
                        <DropDownPicker
                            placeholder='Rhesus'
                            value={rhesus}
                            items={rhesusEnum}
                            open={rhesusDropdownOpen}
                            setOpen={setRhesusDropdownOpen}
                            setValue={setRhesus}
                            onChangeValue={(e) => onGolDarahChange(e, 'rhesus')}
                            style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: baptisDropdownOpen ? 94 : 12 }]}
                            placeholderStyle={{ color: 'grey' }}
                            listMode="SCROLLVIEW"
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={!isNextButtonDisabled && !isValidating ? styles.nextButton : { ...styles.nextButton, backgroundColor: '#E4DFDA' }}
                    onPress={handleSubmit}
                    disabled={isValidating || isNextButtonDisabled}
                >
                    {isValidating ?
                        <ActivityIndicator size="small" color="white" />
                        :
                        <Text style={styles.nextText}>Daftar</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.nextButton, borderWidth: 1, borderColor: '#C8C8C8', backgroundColor: 'transparent', marginBottom: 40 }}
                    onPress={prevPage}
                >
                    <Text style={{ ...styles.nextText, color: '#707070' }}>Sebelumnya</Text>
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