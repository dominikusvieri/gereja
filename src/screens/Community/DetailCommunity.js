import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import React from 'react'

const DetailCommunity = ({ route }) => {
    const data = route.params.param
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: 'relative' }}>
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <Text style={{ textAlign: 'justify', fontWeight: 'bold', marginVertical: 10 }}>
                    {data?.title}
                </Text>
                <Text style={{ textAlign: 'justify', marginTop: 10 }}>
                    {data?.description}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailCommunity