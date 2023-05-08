import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AccountRegister from './Steps/AccountRegister'
import BiodataRegister from './Steps/BiodataRegister'
import BiodataRegister2 from './Steps/BiodataRegister2'

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

    const getCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,');
            const countries = await response.json();
            const cleanedCountries = []
            if (countries) {
                countries.map((country) => {
                    cleanedCountries.push({
                        label: country.name.common,
                        value: country.cca3
                    })
                })
            }

            //Sort by country name
            cleanedCountries.sort((a, b) => {
                const countryA = a.label.toUpperCase();
                const countryB = b.label.toUpperCase();

                if (countryA < countryB) {
                    return -1;
                }
                if (countryA > countryB) {
                    return 1;
                }
                return 0;
            });

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
        else if (name === "tempatBaptis") {
            const finalString = e && `${e[0].toUpperCase()}${e.slice(1)}`;
            setRegistrationData({
                ...registrationData,
                tempatBaptis: finalString
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
                        />
                    )
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {/* <TextInput
                    placeholder='Enter Name'
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <TextInput
                    placeholder='Enter Email'
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    placeholder='Enter Password'
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button title='Register' /> */}

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