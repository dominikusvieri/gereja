import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const DetailCommunity = ({ route }) => {
    const data = route.params.param
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: 'relative' }}>
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4' }}>
                    {data?.title}
                </Text>
                {/* <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.visi_misi}
                </Text> */}
                <Text style={{ textAlign: 'justify', fontWeight: 'bold', marginVertical: 10 }}>
                    Tanggal Komsel
                </Text>
                <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    2023-10-10
                </Text>
                {/* <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.komsel_date}
                </Text> */}
                <Text style={{ textAlign: 'justify', fontWeight: 'bold', marginVertical: 10 }}>
                    Alamat Komsel
                </Text>
                <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    Jl. Padjajaran No. 50
                </Text>
                {/* <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.alamat}
                </Text> */}
                <Text style={{ textAlign: 'justify', fontWeight: 'bold', marginVertical: 10 }}>
                    Contact Person 
                </Text>
                <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    0891828282
                </Text>
                {/* <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.contact_person}
                </Text> */}
                <Text style={{ textAlign: 'justify', fontWeight: 'bold', marginVertical: 10 }}>
                    Nama Contact Person 
                </Text>
                <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    Handika
                </Text>
                {/* <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.name_of_contact_person}
                </Text> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailCommunity