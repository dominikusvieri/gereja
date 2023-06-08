import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

const IbadahScreen = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const verifyAuth = async () => {
        setIsLoading(true)
        const accessToken = await SecureStore.getItemAsync('accessToken').finally(function () {
            setIsLoading(false)
        })
        if (accessToken) {
            setIsAuthorized(true)
        }
        else {
            setIsAuthorized(false)
        }
        console.log(accessToken)
    }

    useEffect(() => {
        verifyAuth()
    }, [isAuthorized, useIsFocused()])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <View>
                <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 5 }}>
                        Ibadah Gereja Isa Almasih
                    </Text>

                    <Text style={{ fontWeight: '700', fontSize: 20, color: '#fff', marginBottom: 5, backgroundColor: '#4281A4', padding: 10 }}>
                        Senin, 5-6-2023
                    </Text>
                    <View style={{ borderWidth: 1, padding: 10, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Nama Ibadah :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Ibadah Raya Pagi
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Jam :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                07.00
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Pembicara :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Pendeta 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                WL :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                WL 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Singers :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yohanna
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Musik :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Choir :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Doa PRA :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yonathan
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Sound :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Multimedia :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Kolektan :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Majelis Pen :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Usher :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Perjamuan Kudus :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, padding: 10, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Nama Ibadah :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Ibadah Raya Pagi
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Jam :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                17.00
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Pembicara :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Pendeta 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                WL :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                WL 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Singers :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yohanna
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Musik :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Choir :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Doa PRA :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yonathan
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Sound :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Multimedia :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Kolektan :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Majelis Pen :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Usher :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Perjamuan Kudus :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                    </View>
                    <Text style={{ fontWeight: '700', fontSize: 20, color: '#fff', marginBottom: 5, backgroundColor: '#4281A4', padding: 10 }}>
                        Selasa, 6-6-2023
                    </Text>
                    <View style={{ borderWidth: 1, padding: 10, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Nama Ibadah :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Ibadah Raya Pagi
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Jam :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                07.00
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Pembicara :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Pendeta 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                WL :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                WL 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Singers :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yohanna
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Musik :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Choir :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Doa PRA :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yonathan
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Sound :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Multimedia :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Kolektan :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Majelis Pen :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Usher :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Perjamuan Kudus :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, padding: 10, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Nama Ibadah :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Ibadah Raya Pagi
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Jam :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                17.00
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Pembicara :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Pendeta 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                WL :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                WL 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Singers :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yohanna
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Musik :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Choir :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Workshipeer
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Doa PRA :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Yonathan
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Sound :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Multimedia :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Kolektan :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Majelis Pen :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Usher :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 5 }}>
                                Perjamuan Kudus :
                            </Text>
                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                Teguh
                            </Text>
                        </View>
                    </View>

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
})

export default IbadahScreen