import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";


export default function StatusRegister({ submitStatus }) {
    return (
        <View style={styles.container}>
            {submitStatus ?
                <View>
                    <Image source={require('../../../../assets/status_ok.png')} />
                    <Text style={styles.textHeaderTitle}>Jemaat berhasil didaftarkan</Text>
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
    }
})