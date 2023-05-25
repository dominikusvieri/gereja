import { View, StyleSheet, ActivityIndicator, Image, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AccountRegister from './Steps/AccountRegister'
import BiodataRegister from './Steps/BiodataRegister'
import BiodataRegister2 from './Steps/BiodataRegister2'
import StatusRegister from './Steps/StatusRegister'
import axios from "axios";
import { LOCAL_DEVICE_IP } from '@env'

const RegisterScreen = ({ route }) => {
    const localIp = LOCAL_DEVICE_IP
    const [step, setStep] = useState(route?.params?.stepInto ? route.params.stepInto : 0)
    const [registrationData, setRegistrationData] = useState(
        {
            email: null,
            password: null,
            retypePassword: null,
            nik: null,
            noKk: null,
            noJemaat: null,
            nama: null,
            wargaNegara: null,
            alamat: null,
            kodeTelepon: "+62",
            telepon: null,
            gender: null,
            tempatLahir: null,
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
    const [countriesIdd, setCountriesIdd] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(false);

    const getCountries = async () => {
        setIsLoading(true);

        axios.get(`http://172.17.5.204:3001/api/countries`)
            .then(function (response) {
                const countries = response.data;
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

                setCountries(cleanedCountries);
            })
            .catch(function (error) {
                console.log("Error getting country list", error);
            })
            .finally(function () {
                setIsLoading(false);
            })
    }

    const getCountriesIdd = async () => {
        setIsLoading(true);

        axios.get('https://restcountries.com/v3.1/all?fields=name,idd,flags')
            .then(function (response) {
                const countriesIdd = response.data;
                const cleanedCountriesIdd = []
                if (countriesIdd) {
                    countriesIdd.map((countryIdd, index) => {
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

                setCountriesIdd(cleanedCountriesIdd);
            })
            .catch(function (error) {
                console.log("Error getting country idd list", error);
            })
            .finally(function () {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getCountries();
        getCountriesIdd();
    }, []);

    function nextPage() {
        setStep((n) => n + 1)
    }

    function prevPage() {
        setStep((n) => n - 1)
    }

    const handleInputChange = (e, name) => {
        if (name === "nik" || name === "noKk" || name === "noJemaat" || name === "telepon") {
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
                            prevPage={prevPage}
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
                            countriesIdd={countriesIdd}
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
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
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
    },
    iconContainerStyle: {
        marginRight: 10
    }
})

export default RegisterScreen