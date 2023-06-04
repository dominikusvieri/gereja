import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DetailEventScreen = ({ route }) => {
    const data = route.params.param
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: 'relative' }}>
            <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                <Image
                    source={{
                        uri: data.image
                    }}
                    style={{ width: '100%', height: 290, }}
                />
                <Text style={{ textAlign: 'justify', fontWeight: 'bold', marginTop: 10 }}>
                    {data?.title}
                </Text>
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Registration :
                </Text>
                <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    2023-10-15
                </Text>
                {/* <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    {data?.registration_date}
                </Text> */}
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Schedule :
                </Text>
                <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    2023-11-20
                </Text>
                {/* <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    {data?.schedule}
                </Text> */}
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Venue :
                </Text>
                <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    Purwodadi
                </Text>
                {/* <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    {data.venue}
                </Text> */}
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Description :
                </Text>
                <Text style={{ textAlign: 'justify', marginBottom: 5 }}>
                    {data?.description}
                </Text>
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Contact Person :
                </Text>
                <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    089310100110
                </Text>
                {/* <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    {data?.contact_person}
                </Text> */}
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Nama Contact Person :
                </Text>
                <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    Adi
                </Text>
                {/* <Text style={{ textAlign: 'left', marginBottom: 5 }}>
                    {data?.name_of_contact_person}
                </Text> */}
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#000",
                    }}
                />
                <Text style={{ textAlign: 'left', marginTop: 10 }}>
                    Daftar Disini :
                </Text>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('DaftarEvent', { param: data?.title })}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Daftar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4281A4'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black'
    },
    dateInput: {
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        fontSize: 14,
        paddingHorizontal: 4
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10, 
        marginBottom:30
    },
    nextButtonDisable: {
        height: 48,
        backgroundColor: '#b1b1b1',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    nextText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    dateInput: {
        marginBottom: 12,
        backgroundColor: 'white',
        fontSize: 14,
        paddingHorizontal: 4
    },
})

export default DetailEventScreen