import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";


export default function StatusRegister({ submitStatus }) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            {submitStatus ?
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/status_ok.png')} />
                    <Text style={styles.textHeaderTitle}>Jemaat berhasil didaftarkan</Text>
                    <TouchableOpacity
                        style={{ ...styles.nextButton, marginTop: 48 }}
                        onPress={() => navigation.navigate('Profile', { authorized: false })}
                    >
                        <Text style={styles.nextText}>OK</Text>
                    </TouchableOpacity>
                </View>
                :
                <React.Fragment>
                    <Image source={require('../../../../assets/status_cancel.png')} />
                    <Text style={{ ...styles.textHeaderTitle, color: 'red' }}>Terjadi kendala dalam pendaftaran</Text>
                </React.Fragment>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHeaderTitle: {
        fontWeight: 'bold',
        color: '#03A64A',
        fontSize: 18,
        textAlign: 'center'
    },
    nextButton: {
        height: 48,
        width: '100%',
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