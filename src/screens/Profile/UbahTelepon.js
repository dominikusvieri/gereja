import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'
import * as SecureStore from 'expo-secure-store'

export default function UbahTelepon({ route }) {
    const { telepon } = route.params

    const [isLoading, setIsLoading] = useState(false)
    const [kodeTeleponOpen, setKodeTeleponOpen] = useState(false)
    const [kodeTelepon, setKodeTelepon] = useState('')
    const [countriesIdd, setCountriesIdd] = useState([])
    const [outlineColor, setOutlineColor] = useState('#4281A4')
    const [isValidating, setIsValidating] = useState(false)
    const [numbers, setNumbers] = useState('')
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false)

    const getCountriesIdd = async () => {
        setIsLoading(true)

        axios.get('https://restcountries.com/v3.1/all?fields=name,idd,flags')
            .then(function (response) {
                const iddData = response.data;
                const cleanedCountriesIdd = []
                if (iddData) {
                    iddData.map((countryIdd, index) => {
                        if (countryIdd.idd.suffixes.length > 1) {
                            cleanedCountriesIdd.push({
                                id: index,
                                label: countryIdd.idd.root,
                                value: countryIdd.idd.root,
                            })
                        }
                        else if (countryIdd.idd.root) {
                            cleanedCountriesIdd.push({
                                id: index,
                                label: countryIdd.idd.root + countryIdd.idd.suffixes[0],
                                value: countryIdd.idd.root + countryIdd.idd.suffixes[0],
                            })
                        }
                    })
                }

                setCountriesIdd(cleanedCountriesIdd)
            })
            .catch(function (error) {
                console.log("Error getting country idd list", error)
            })
            .finally(function () {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getCountriesIdd()
    }, [])

    useEffect(() => {
        setIsValidating(true)
        const inputDebounce = setTimeout(() => {
            if (kodeTelepon && numbers) {
                setIsSubmitButtonDisabled(false)
            }
            else {
                setIsSubmitButtonDisabled(true)
            }
            setIsValidating(false)
        }, 500)

        return () => clearTimeout(inputDebounce)
    }, [kodeTelepon, numbers])

    const onFieldFocus = () => {
        setOutlineColor('#4281A4')
    }

    const onFieldBlur = () => {
        setOutlineColor('black')
    }

    const handleSubmit = async () => {
        setIsValidating(true)
        let storedAccessToken = await SecureStore.getItemAsync('accessToken')
        const header = {
            headers: { 'Authorization': `Bearer ${storedAccessToken}` }
        }

        if (kodeTelepon && numbers) {
            const finalNumbers = kodeTelepon + ' ' + numbers

            axios.put(`http://192.168.1.6:3001/jemaat/edit-telepon`, {
                newNumbers: finalNumbers
            }, header)
                .then(function (response) {
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log("Error: ", error)
                })
                .finally(function () {
                    setIsValidating(false)
                })
        }
    }

    const handleInputChange = (e) => {
        const onlyNumber = e.replace(/[^0-9]/g, '');
        setNumbers(onlyNumber)
    }

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
                </View> :
                <React.Fragment>
                    <View style={styles.innerContainer}>
                        <View>
                            <Text style={{ marginBottom: 8 }}>Nomor telepon saat ini</Text>
                            <TextInput
                                placeholder="Nomor telepon saat ini"
                                label="Nomor telepon saat ini"
                                value={telepon}
                                style={styles.input}
                                editable={false}
                            />

                            <Text style={{ marginBottom: 8, color: '#4281A4' }}>Nomor telepon baru</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 2 }}>
                                    <DropDownPicker
                                        placeholder='Kode'
                                        searchPlaceholder='Kode telepon...'
                                        value={kodeTelepon}
                                        items={countriesIdd}
                                        searchable
                                        open={kodeTeleponOpen}
                                        setOpen={setKodeTeleponOpen}
                                        setValue={setKodeTelepon}
                                        listMode='MODAL'
                                        language='ID'
                                        itemKey='id'
                                        label="Nomor telepon baru"
                                        style={{ ...styles.input, borderColor: outlineColor, borderWidth: 2, backgroundColor: 'transparent' }}
                                        placeholderStyle={{ color: 'grey' }}
                                    />
                                </View>
                                <View style={{ flex: 4, marginLeft: 5 }}>
                                    <TextInput
                                        placeholder='Nomor'
                                        value={numbers}
                                        style={{ ...styles.input, borderColor: outlineColor, borderWidth: 2, backgroundColor: 'transparent', paddingVertical: 9 }}
                                        keyboardType='number-pad'
                                        onChangeText={(e) => handleInputChange(e)}
                                    />
                                </View>
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={!isSubmitButtonDisabled && !isValidating ? styles.changePhoneButton : { ...styles.changePhoneButton, backgroundColor: '#E4DFDA' }}
                                onPress={() => handleSubmit()}
                                disabled={isValidating || isSubmitButtonDisabled}
                            >
                                {isValidating ?
                                    <ActivityIndicator size="small" color="white" />
                                    :
                                    <Text style={styles.changePhoneText}>Ubah Nomor Telepon</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </React.Fragment>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        margin: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black'
    },
    labeledInput: {
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        fontSize: 14,
        paddingHorizontal: 4,
    },
    changePhoneButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    changePhoneText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})