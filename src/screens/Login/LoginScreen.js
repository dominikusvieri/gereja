import { View, Text, Image, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    placeholder='Enter Email'
                    style={styles.input}
                // value={email}
                // onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    placeholder='Enter Password'
                    secureTextEntry={true}
                    style={styles.input}
                // value={password}
                // onChangeText={(text) => setPassword(text)}
                />

                <Button title='Login' onPress={() => navigation.navigate('BottomNavigation')} />

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
    }
})

export default LoginScreen