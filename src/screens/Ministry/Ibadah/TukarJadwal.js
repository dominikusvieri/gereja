import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";

export default function TukarJadwal({ route, navigation }) {
    const data = route.params.param

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.headerText}>Tukar Jadwal</Text>

                <View>
                    <Text style={styles.descTitle}>Kode jadwal</Text>
                    <Text>{data?.kodeJadwal}</Text>
                </View>
                <View>
                    <Text style={styles.descTitle}>Nama ibadah</Text>
                    <Text>{data?.Ibadah?.namaIbadah}</Text>
                </View>
                <View>
                    <Text style={styles.descTitle}>Tanggal</Text>
                    <Text>{moment(data?.tanggal).format('LL')}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.buttonTukarJadwal}
                        onPress={() => navigation.navigate('DetailTukarJadwal', { param: data })}
                    >
                        <Text style={styles.textButtonTukarJadwal}>Tukar jadwal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 20
    },
    scrollView: {
        paddingHorizontal: 24,
        paddingTop: 24
    },
    headerText: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 24
    },
    descTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4281A4'
    },
    buttonTukarJadwal: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 30
    },
    textButtonTukarJadwal: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})