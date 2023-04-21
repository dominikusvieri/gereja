import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AccountRegister({ nextPage, data, handleInputChange }) {
    const [isEmailError, setIsEmailError] = useState(true)
    const [isPasswordError, setIsPasswordError] = useState(true)
    const [isRetypePasswordError, setIsRetypePasswordError] = useState(true)
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)

    useEffect(() => {
        if (!isEmailError && !isPasswordError && !isRetypePasswordError) {
            setIsNextButtonDisabled(false)
        }
        else {
            setIsNextButtonDisabled(true)
        }
    }, [isEmailError, isPasswordError, isRetypePasswordError])

    useEffect(() => {
        const inputDebounce = setTimeout(() => {
            // Email validation
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (emailRegex.test(data.email) && data.email) {
                setIsEmailError(false)
            }
            else {
                setIsEmailError(true)
            }

            // Password validation
            const passwordRegex = /^(?=.*\d).{6,}$/;
            if (passwordRegex.test(data.password) && data.password) {
                setIsPasswordError(false)
            }
            else {
                setIsPasswordError(true)
            }

            // Retype password validation
            if ((data.password === data.retypePassword) && data.retypePassword) {
                setIsRetypePasswordError(false)
            }
            else {
                setIsRetypePasswordError(true)
            }
        }, 500);

        return () => clearTimeout(inputDebounce);
    }, [data])

    function validateInput() {
        if (!isEmailError && !isPasswordError && !isRetypePasswordError) {
            nextPage()
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
                style={[!isEmailError || !data.email ? styles.input : styles.inputError, { marginBottom: isEmailError && data.email ? 4 : 12 }]}
                value={data.email}
                onChangeText={(e) => handleInputChange(e, 'email')}
                autoCapitalize="none"
            />
            {isEmailError && data.email &&
                <Text style={styles.emailValidInfo}>
                    Email tidak valid
                </Text>
            }

            <TextInput
                placeholder='Password'
                style={[!isPasswordError || !data.password ? styles.input : styles.inputError, { marginBottom: isPasswordError && data.password ? 4 : 12 }]}
                secureTextEntry
                onChangeText={(e) => handleInputChange(e, 'password')}
            />
            {isPasswordError && data.password &&
                <Text style={styles.emailValidInfo}>
                    Minimal terdiri dari 6 karakter dan 1 angka
                </Text>
            }

            <TextInput
                placeholder='Ulangi password'
                style={[!isRetypePasswordError || !data.retypePassword ? styles.input : styles.inputError, { marginBottom: isRetypePasswordError && data.retypePassword ? 4 : 12 }]}
                secureTextEntry
                onChangeText={(e) => handleInputChange(e, 'retypePassword')}
            />
            {isRetypePasswordError && data.retypePassword &&
                <Text style={styles.emailValidInfo}>
                    Password tidak sama
                </Text>
            }

            <TouchableOpacity
                style={!isNextButtonDisabled ? styles.nextButton : styles.nextButtonDisabled}
                onPress={validateInput}
                disabled={isNextButtonDisabled}
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