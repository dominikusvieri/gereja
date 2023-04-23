import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";


export default function BiodataRegister({ nextPage, prevPage, data, handleInputChange, isLoading, setLoading, countries }) {
    const [wargaNegaraOpen, setWargaNegaraOpen] = useState(false);
    const [wargaNegara, setWargaNegara] = useState(data?.wargaNegara || "IDN");

    return (
        <React.Fragment>
            <KeyboardAwareScrollView>
                <Text style={styles.title}>
                    Data Diri
                </Text>
                <Text style={styles.description}>
                    Masukkan data diri Anda
                </Text>
                <TextInput
                    placeholder='NIK'
                    style={styles.input}
                    keyboardType="numeric"
                    value={data.nik}
                    onChangeText={(e) => handleInputChange(e, 'nik')}
                />
                <TextInput
                    placeholder='Nomor KK'
                    style={styles.input}
                    value={data.noKk}
                    onChangeText={(e) => handleInputChange(e, 'noKk')}
                />
                <TextInput
                    placeholder='Nama'
                    style={styles.input}
                    value={data.nama}
                    onChangeText={(e) => handleInputChange(e, 'nama')}
                />
                <DropDownPicker
                    placeholder="Warga Negara"
                    searchPlaceholder="Warga negara..."
                    value={wargaNegara}
                    items={countries}
                    searchable
                    open={wargaNegaraOpen}
                    setOpen={setWargaNegaraOpen}
                    loading={isLoading}
                    setValue={setWargaNegara}
                    onChangeValue={(e) => console.log(e)}
                    listMode="MODAL"
                    language="ID"
                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18 }]}
                />
                <TextInput
                    placeholder='Alamat'
                    style={styles.input}
                    value={data.alamat}
                    onChangeText={(e) => handleInputChange(e, 'alamat')}
                />
                <TextInput
                    placeholder='Telepon'
                    style={styles.input}
                    keyboardType="numeric"
                    value={data.telepon}
                    onChangeText={(e) => handleInputChange(e, 'telepon')}
                />
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => prevPage()}
                >
                    <Text style={styles.nextText}>Sebelumnya</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </React.Fragment>
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
    nextText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})