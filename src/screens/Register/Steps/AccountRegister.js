import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AccountRegister({ nextPage, data, handleInputChange }) {
    const navigation = useNavigation()
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
    const [isEmailError, setIsEmailError] = useState(null)
    const [isPasswordError, setIsPasswordError] = useState(null)
    const [isRetypePasswordError, setIsRetypePasswordError] = useState(null)
    const [inputValidation, setInputValidation] = useState({
        email: false,
        password: false,
        retypePassword: false
    })
    const [isInputValid, setIsInputValid] = useState(false)

    useEffect(() => {
        const inputDebounce = setTimeout(() => {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (emailRegex.test(data.email) || !data.email) {
                setIsEmailError(false)
            }
            else {
                setIsEmailError(true)
            }
        }, 500);

        return () => clearTimeout(inputDebounce);
    }, [data.email])

    useEffect(() => {
        const inputDebounce = setTimeout(() => {
            const passwordRegex = /^(?=.*\d).{6,}$/;
            if (passwordRegex.test(data.password) || !data.password) {
                setIsPasswordError(false)
            }
            else {
                setIsPasswordError(true)
            }
        }, 500);

        return () => clearTimeout(inputDebounce);
    }, [data.password])

    useEffect(() => {
        const inputDebounce = setTimeout(() => {
            if ((data.password === data.retypePassword) || !data.retypePassword) {
                setIsRetypePasswordError(false)
            }
            else {
                setIsRetypePasswordError(true)
            }
        }, 500);

        return () => clearTimeout(inputDebounce);
    }, [data.retypePassword])

    function validateInput() {
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(data.email)) {
            setIsEmailError(() => false)
        } else {
            setIsEmailError(() => true)
        }

        if (data.password) {
            setIsPasswordError(() => false)
        } else {
            setIsPasswordError(() => true)
        }

        if (data.retypePassword && (data.retypePassword === data.password)) {
            setIsRetypePasswordError(() => false)
        } else {
            setIsRetypePasswordError(() => true)
        }
    }

    return (
        <React.Fragment>
            <Text style={styles.title}>
                Akun
            </Text>
            <Text style={styles.description}>
                Masukkan email dan password
            </Text>

            <TextInput
                placeholder='Email'
                style={[!isEmailError ? styles.input : styles.inputError, { marginBottom: isEmailError ? 4 : 12 }]}
                value={data.email}
                onChangeText={(e) => handleInputChange(e, 'email')}
                autoCapitalize="none"
            />
            {isEmailError &&
                <Text style={styles.emailValidInfo}>
                    Email tidak valid
                </Text>
            }

            <TextInput
                placeholder='Password'
                style={[!isPasswordError ? styles.input : styles.inputError, { marginBottom: isPasswordError ? 4 : 12 }]}
                secureTextEntry
                onChangeText={(e) => handleInputChange(e, 'password')}
            />
            {isPasswordError &&
                <Text style={styles.emailValidInfo}>
                    Minimal terdiri dari 6 karakter dan 1 angka
                </Text>
            }

            <TextInput
                placeholder='Ulangi password'
                style={[!isRetypePasswordError ? styles.input : styles.inputError, { marginBottom: isRetypePasswordError ? 4 : 12 }]}
                secureTextEntry
                onChangeText={(e) => handleInputChange(e, 'retypePassword')}
            />
            {isRetypePasswordError &&
                <Text style={styles.emailValidInfo}>
                    Password tidak sama
                </Text>
            }

            <TouchableOpacity
                style={styles.nextButton}
                onPress={validateInput}
            >
                <Text style={styles.nextText}>Selanjutnya</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    inputError: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
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
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    nextButtonDisabled: {
        height: 48,
        backgroundColor: '#E4DFDA',
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
    emailValidInfo: {
        color: 'red',
        fontSize: 12,
        marginBottom: 12
    }
})