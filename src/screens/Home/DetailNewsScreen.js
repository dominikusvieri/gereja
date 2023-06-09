import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'

const DetailNewsScreen = ({ route }) => {
    const data = route.params.param

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: 'relative' }}>
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>

                <Image
                    source={{ uri: `data:image/jpeg;base64,${data?.image}` }}
                    style={{ width: '100%', height: 290 }}
                />
                <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 10 }}>
                    {data?.title}
                </Text>

                <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.desc}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailNewsScreen