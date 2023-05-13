import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AccountRegister from './Steps/AccountRegister'
import BiodataRegister from './Steps/BiodataRegister'
import BiodataRegister2 from './Steps/BiodataRegister2'
import StatusRegister from './Steps/StatusRegister'

const RegisterScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [step, setStep] = useState(0)
    const [registrationData, setRegistrationData] = useState(
        {
            email: null,
            password: null,
            retypePassword: null,
            nik: null,
            noKk: null,
            nama: null,
            wargaNegara: null,
            alamat: null,
            telepon: null,
            gender: null,
            tglLahir: null,
            baptis: null,
            tglBaptis: null,
            namaBaptis: null,
            tempatBaptis: null,
            pekerjaan: null,
            golonganDarah: null
        }
    )

    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(false);

    const getCountries = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.43.42:3001/api/countries'); //in development mode, change url to your android emulator ip address
            const countries = await response.json();
            const cleanedCountries = []
            if (countries) {
                countries.map((country) => {
                    cleanedCountries.push({
                        id: country.id,
                        label: country.name,
                        value: country.iso2
                    })
                })
            }

            // Sort by country name
            // cleanedCountries.sort((a, b) => {
            //     const countryA = a.label.toUpperCase();
            //     const countryB = b.label.toUpperCase();

            //     if (countryA < countryB) {
            //         return -1;
            //     }
            //     if (countryA > countryB) {
            //         return 1;
            //     }
            //     return 0;
            // });

            setCountries(cleanedCountries);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    function nextPage() {
        setStep((n) => n + 1)
    }

    function prevPage() {
        setStep((n) => n - 1)
    }

    const handleInputChange = (e, name) => {
        if (name === "nik" || name === "noKk" || name === "telepon") {
            const onlyNumber = e.replace(/[^0-9]/g, '');
            setRegistrationData({
                ...registrationData,
                [name]: onlyNumber
            })
        }
        else {
            setRegistrationData({
                ...registrationData,
                [name]: e
            })
        }
    }

    function renderPageByStep() {
        if (isLoading) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        else {
            switch (step) {
                case 0:
                    return (
                        <AccountRegister
                            nextPage={nextPage}
                            data={registrationData}
                            handleInputChange={handleInputChange}
                        />
                    )
                case 1:
                    return (
                        <BiodataRegister
                            nextPage={nextPage}
                            prevPage={prevPage}
                            data={registrationData}
                            handleInputChange={handleInputChange}
                            countries={countries}
                            isLoading={isLoading}
                            setLoading={setIsLoading}
                        />
                    )
                case 2:
                    return (
                        <BiodataRegister2
                            nextPage={nextPage}
                            prevPage={prevPage}
                            data={registrationData}
                            handleInputChange={handleInputChange}
                            setSubmitStatus={setSubmitStatus}
                        />
                    )
                case 3:
                    return (
                        <StatusRegister
                            submitStatus={submitStatus}
                        />
                    )
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {renderPageByStep()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        width: '80%'
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    link: {
        color: 'blue'
    },
    registerStyle: {
        flexDirection: 'row',
        marginTop: 20
    }
})

export default RegisterScreen