import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

const IbadahScreen = () => {
    
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <View>
                <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 5 }}>
                        Ibadah Gereja Isa Almasih
                    </Text>

                    <TouchableOpacity
                        style={styles.changeButton}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>My Schedule</Text>
                    </TouchableOpacity>

                    <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 5 }}>
                        Jadwal Ibadah Per Bulan
                    </Text>

                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={()=> navigation.navigate('DetailIbadah')}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Juni 2023</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButton}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Juli 2023</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButton}
                    >
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Agustus 2023</Text>
                    </TouchableOpacity>

                    

                </ScrollView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerStyle: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#0885F8'
    },
    cardTextDesc: {
        fontSize: 14,
        color: 'white',
    },
    cardTextTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    textHeaderTitle: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16
    },
    unauthorizedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    unauthorizedTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4281A4'
    },
    unauthorizedDesc: {
        fontSize: 16,
        color: '#4281A4',
        marginBottom: 12,
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
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    changeButton: {
        height: 48,
        backgroundColor: '#DB4437',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
})

export default IbadahScreen