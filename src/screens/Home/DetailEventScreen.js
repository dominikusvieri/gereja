import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'

const DetailEventScreen = ({ route }) => {
    const data = route.params.param
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
                    dd/mm/yy - dd/mm/yy
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
                    dd/mm/yy
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
                    Venue Acara
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
                    088888888888 - AG
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
                <Text style={{ textAlign: 'left', marginBottom: 20 }}>
                    link daftar
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailEventScreen