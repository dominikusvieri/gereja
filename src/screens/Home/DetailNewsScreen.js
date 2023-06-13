import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import moment from 'moment'

const DetailNewsScreen = ({ route }) => {
    const data = route.params.param

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: 'relative' }}>
            <ScrollView style={{ paddingHorizontal: 24, paddingTop: 24 }}>
                <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>
                    {data?.title}
                </Text>

                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 6, marginBottom: 10 }}>
                    <Text style={{ marginRight: 10, color: '#495057', fontWeight: '500', fontSize: 13 }}>{data?.penulis || 'Anonim'}</Text>
                    <Text style={{ color: '#495057', fontSize: 13 }}>{moment(data?.createdAt).format('Do MMMM YYYY LT')}</Text>
                </View>

                {data?.image ?
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${data?.image}` }}
                        style={{ width: '100%', height: 190, borderRadius: 12, marginVertical: 16 }}
                    />
                    :
                    <Image
                        source={require('../../../assets/noimage_news.png')}
                        style={{ width: '100%', height: 190, borderRadius: 12, marginVertical: 16, resizeMode: 'contain', backgroundColor: '#e9ecef' }}
                    />
                }

                <View style={{ marginTop: 10, paddingBottom: 32, marginBottom: 32 }}>
                    <Text style={{ textAlign: 'left', color: '#495057', fontWeight: '400', fontSize: 15, lineHeight: 20, letterSpacing: 0.5 }}>
                        {data?.desc}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailNewsScreen