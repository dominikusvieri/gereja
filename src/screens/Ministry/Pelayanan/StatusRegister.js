import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";


export default function StatusRegisterPelayanIbadah({ route, navigation }) {
    const { submitStatus } = route.params

    return (
        <View style={styles.container}>
            {submitStatus ?
                <View style={styles.innerContainer}>
                    <Image source={require('../../../../assets/status_ok.png')} />
                    <Text style={styles.textHeaderTitle}>Berhasil daftar pelayan ibadah, menunggu persetujuan</Text>
                    <TouchableOpacity
                        style={{ ...styles.nextButton, marginTop: 48, backgroundColor: '#4caf50' }}
                        onPress={() => navigation.navigate('Pelayanan')}
                    >
                        <Text style={styles.nextText}>OK</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.innerContainer}>
                    <Image source={require('../../../../assets/status_cancel.png')} />
                    <Text style={{ ...styles.textHeaderTitle, color: '#f44336' }}>Terjadi kendala dalam pendaftaran</Text>
                    <TouchableOpacity
                        style={{ ...styles.nextButton, marginTop: 48, backgroundColor: '#f44336' }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.nextText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 56
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