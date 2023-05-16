import { View, Text, Image, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { LOCAL_DEVICE_IP } from '@env'

const LoginScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('')
    const [isValidating, setIsValidating] = useState(false)
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)

    useEffect(() => {
        setIsValidating(true)
        const inputDebounce = setTimeout(() => {
            if (email && password) {
                setIsLoginButtonDisabled(false)
            }
            else {
                setIsLoginButtonDisabled(true)
            }
            setIsValidating(false)
        }, 500)

        return () => clearTimeout(inputDebounce)
    }, [email, password])

    function newAbortSignal(timeoutMs) {
        const abortController = new AbortController();
        setTimeout(() => abortController.abort(), timeoutMs || 0);

        return abortController.signal;
    }

    function handleLogin() {
        setIsValidating(true)
        if (email && password) {
            setLoginStatus("Email dan password terisi")
            const controller = new AbortController()
            axios.post(`http://${LOCAL_DEVICE_IP}/jemaat/login`, {
                email: email,
                password: password
            }, { timeout: 10000 })
                .then(function (response) {
                    setLoginStatus(response.data?.status)
                    if (response.data.accessToken) {
                        SecureStore.setItemAsync("accessToken", response.data.accessToken)
                        navigation.navigate('Profile', { authorized: true })
                    }
                })
                .catch(function (error) {
                    setLoginStatus("Login gagal: " + error)
                })
                .finally(function (error) {
                    setIsValidating(false)
                })
        }
        else {
            setLoginStatus("Email atau password kosong")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
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

                {/* <Button title='Login' onPress={() => navigation.navigate('BottomNavigation')} /> */}
                <TouchableOpacity
                    onPress={handleLogin}
                    style={!isLoginButtonDisabled && !isValidating ? styles.nextButton : { ...styles.nextButton, backgroundColor: '#E4DFDA' }}
                    disabled={isValidating || isLoginButtonDisabled}
                >
                    {isValidating ?
                        <ActivityIndicator size="small" color="white" />
                        :
                        <Text style={styles.nextText}>Login</Text>
                    }
                </TouchableOpacity>

                <View style={styles.registerStyle}>
                    <Text>
                        {'Dont have an account? '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('register')}>
                        <Text style={styles.link}>
                            Register
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.registerStyle}>
                    <Text>
                        {'Forgot password? '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('forgetPass')}>
                        <Text style={styles.link}>
                            Click here
                        </Text>
                    </TouchableOpacity>
                </View>
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

export default LoginScreen