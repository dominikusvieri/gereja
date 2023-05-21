import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

export default function UbahTeleponStatus({ route, navigation }) {
    const { submitStatus } = route.params

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {submitStatus === 'success' ?
                <View style={styles.statusContainer}>
                    <Image source={require('../../../assets/status_ok.png')} />
                    <Text style={styles.textStatusTitle}>
                        Nomor telepon berhasil diubah
                    </Text>
                    <TouchableOpacity
                        style={{ ...styles.nextButton, marginTop: 48, backgroundColor: '#4caf50' }}
                        onPress={() => navigation.navigate("UbahProfil")}
                    >
                        <Text style={styles.textStatusDesc}>OK</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.statusContainer}>
                    <Image source={require('../../../assets/status_cancel.png')} />
                    <Text style={{ ...styles.textStatusTitle, color: '#f44336' }}>
                        Terdapat kesalahan.{"\n"}Silahkan coba lagi
                    </Text>
                    <TouchableOpacity
                        style={{ ...styles.nextButton, marginTop: 48, backgroundColor: '#f44336' }}
                        onPress={() => navigation.navigate("UbahTelepon")}
                    >
                        <Text style={styles.textStatusDesc}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 48
    },
    statusContainer: {
        flex: 1,
        paddingHorizontal: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStatusTitle: {
        fontWeight: 'bold',
        color: '#03A64A',
        fontSize: 18,
        textAlign: 'center'
    },
    textStatusDesc: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    nextButton: {
        height: 48,
        width: '100%',
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})