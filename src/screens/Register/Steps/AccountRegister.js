import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AccountRegister({ nextPage, data, handleInputChange }) {
    const navigation = useNavigation()
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)
    const [isEmailError, setIsEmailError] = useState(true)
    const [isPasswordError, setIsPasswordError] = useState(true)
    const [isRetypePasswordError, setIsRetypePasswordError] = useState(true)
    const [inputValidation, setInputValidation] = useState({
        email: false,
        password: false,
        retypePassword: false
    })
    const [isInputValid, setIsInputValid] = useState(false)

    useEffect(() => {
        if (!isEmailError && !isPasswordError && !isRetypePasswordError) {
            nextPage()
        }
        console.log(isEmailError, isPasswordError, isRetypePasswordError)
    }, [isEmailError, isPasswordError, isRetypePasswordError])

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
                style={!isEmailError ? styles.input : styles.inputError}
                value={data.email}
                onChangeText={(e) => handleInputChange(e, 'email')}
            />
            <TextInput
                placeholder='Password'
                style={!isPasswordError ? styles.input : styles.inputError}
                secureTextEntry
                onChangeText={(e) => handleInputChange(e, 'password')}
            />
            <TextInput
                placeholder='Ulangi password'
                style={!isRetypePasswordError ? styles.input : styles.inputError}
                secureTextEntry
                onChangeText={(e) => handleInputChange(e, 'retypePassword')}
            />
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
    }
})