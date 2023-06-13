import { View, Text, ScrollView, Modal, Alert, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Card } from 'react-native-paper'

const Week5 = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
            <Card style={{ backgroundColor: '#fff', marginVertical: 20, padding: 5 }}>
                <Text style={{ fontWeight: '700', fontSize: 20, color: '#fff', marginBottom: 5, backgroundColor: '#4281A4', padding: 10, marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    Senin, 5-6-2023
                </Text>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 10, marginBottom: 10, backgroundColor: '#fff' }}>
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

                <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 10, marginBottom: 10, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 5 }}>
                            Nama Ibadah :
                        </Text>
                        <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                            Ibadah Raya
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
            </Card>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Week5