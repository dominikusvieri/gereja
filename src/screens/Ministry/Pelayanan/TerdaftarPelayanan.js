import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function TerdaftarPelayanan({ listPelayanan }) {
    const navigation = useNavigation()
    const daftarPelayanan = listPelayanan

    return (
        <View style={{ flex: 1, paddingTop: 48, paddingHorizontal: 24 }}>
            <Text style={styles.title}>Daftar Pelayanan Anda</Text>
            <ScrollView style={{ marginBottom: 32 }}>
                {daftarPelayanan.map((pelayanan, i) => {
                    return (
                        <View key={i} style={styles.cardContainer}>
                            <View style={{ flex: 3 }}>
                                <Text style={styles.cardTextDesc}>Kode pelayanan:</Text>
                                <Text style={styles.cardTextTitle}>{pelayanan.kodePelayanan}</Text>
                                <View style={{ marginBottom: 10 }} />
                                <Text style={styles.cardTextDesc}>Jenis Pelayanan:</Text>
                                <Text style={styles.cardTextTitle}>{pelayanan.JenisPelayanan.namaPelayanan}</Text>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9E9E9E', borderRadius: 8 }}>
                                <Text style={styles.cardTextStatus}>{
                                    pelayanan.statusApproval === 'pending' ?
                                        "Menunggu persetujuan"
                                        : pelayanan.statusApproval === 'approved' ?
                                            "Terdaftar"
                                            : pelayanan.statusApproval === 'denied' &&
                                            "Ditolak"
                                }</Text>
                            </View>
                        </View>
                    )
                })
                }
            </ScrollView>
            <TouchableOpacity
                style={styles.unauthorizedButton}
                onPress={() => navigation.navigate('RegistrasiPelayanan')}
            >
                <Text style={styles.loginText}>Tambah Pelayanan</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4281A4',
        marginBottom: 24
    },
    cardContainer: {
        backgroundColor: '#707070',
        marginBottom: 16,
        borderRadius: 8,
        padding: 12,
        flex: 1,
        flexDirection: 'row'
    },
    cardTextTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    cardTextDesc: {
        fontSize: 14,
        color: 'white',
    },
    cardTextStatus: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
    unauthorizedButton: {
        paddingVertical: 12,
        paddingHorizontal: 56,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    loginText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500'
    }
})