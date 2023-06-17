import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UnauthorizedView({ type }) {
    const navigation = useNavigation()

    return (
        <View style={styles.unauthorizedContainer}>
            <Text style={styles.unauthorizedTitle}>
                {type && type === 'terdaftarPelayanan' ? 'Maaf, halaman ini tidak bisa diakses' : 'Anda belum login'}
            </Text>
            <Text style={styles.unauthorizedDesc}>
                {type && type === 'terdaftarPelayanan' ? 'Anda belum terdaftar sebagai pelayan ibadah' : 'Silahkan login untuk melanjutkan'}
            </Text>
            {!type || type !== 'terdaftarPelayanan' &&
                <TouchableOpacity
                    style={styles.unauthorizedButton}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.loginText}></Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    unauthorizedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    unauthorizedTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4281A4',
        textAlign: 'center'
    },
    unauthorizedDesc: {
        fontSize: 16,
        color: '#4281A4',
        marginBottom: 12,
        textAlign: 'center'
    },
    unauthorizedButton: {
        paddingVertical: 12,
        paddingHorizontal: 56,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    loginText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500'
    }
})