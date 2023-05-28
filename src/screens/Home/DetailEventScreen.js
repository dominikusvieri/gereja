import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
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
                    {data?.registration_date}
                </Text>
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
                    {data?.schedule}
                </Text>
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
                    {data.venue}
                </Text>
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
                    {data?.desc}
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
                    {data?.contact_person}
                </Text>
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
                    {data?.name_of_contact_person}
                </Text>
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
                <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15, marginBottom: 20 }} onPress={() => navigation.navigate('DaftarEvent', {param: data?.title})} >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Daftar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailEventScreen