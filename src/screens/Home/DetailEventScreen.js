import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const DetailEventScreen = ({ route }) => {
    const data = route.params.param
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: 'relative', paddingTop: StatusBar.currentHeight }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff", position: 'relative' }} showsVerticalScrollIndicator={false}>

                <TouchableOpacity
                    style={{ position: 'absolute', zIndex: 15, margin: 16, width: 48, height: 48 }}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, backgroundColor: '#e9ecef', borderRadius: 36 }}>
                        <Image
                            source={require('../../../assets/back.png')}
                            style={{ width: 32, height: 32 }}
                        />
                    </View>
                </TouchableOpacity>

                <View style={{ zIndex: 5 }}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${data?.image}` }}
                        style={{ width: '100%', height: 260 }}
                    />
                </View>

                <View style={{ padding: 24, width: '100%', borderRadius: 24, backgroundColor: 'white', marginTop: -24, zIndex: 10 }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>
                        {data?.title}
                    </Text>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, backgroundColor: '#e9ecef', borderRadius: 36 }}>
                            <Image
                                source={require('../../../assets/form_blue.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 12, paddingRight: 32 }}>
                            <Text style={{ textAlign: 'left', color: 'gray' }}>
                                Registration date
                            </Text>
                            <Text style={{ textAlign: 'left', fontWeight: '500', fontSize: 15 }}>
                                {moment(data?.registration_date).format('LL')}
                            </Text>
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, backgroundColor: '#e9ecef', borderRadius: 36 }}>
                            <Image
                                source={require('../../../assets/date_blue.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 12, paddingRight: 32 }}>
                            <Text style={{ textAlign: 'left', color: 'gray' }}>
                                Scheduled
                            </Text>
                            <Text style={{ textAlign: 'left', fontWeight: '500', fontSize: 15 }}>
                                {moment(data?.schedule).format('LL')}
                            </Text>
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, backgroundColor: '#e9ecef', borderRadius: 36 }}>
                            <Image
                                source={require('../../../assets/place_blue.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 12, paddingRight: 32 }}>
                            <Text style={{ textAlign: 'left', color: 'gray' }}>
                                Venue
                            </Text>
                            <Text style={{ textAlign: 'left', fontWeight: '500', fontSize: 15, }}>
                                {data?.venue}
                            </Text>
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 24 }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, backgroundColor: '#e9ecef', borderRadius: 36 }}>
                            <Image
                                source={require('../../../assets/place_blue.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 12, paddingRight: 32 }}>
                            <Text style={{ textAlign: 'left', color: 'gray' }}>
                                Contact person
                            </Text>
                            <Text style={{ textAlign: 'left', fontWeight: '500', fontSize: 15, }}>
                                {data?.contact_person} - {data?.name_of_contact_person}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>
                        Description
                    </Text>
                    <Text style={{ textAlign: 'left', color: '#495057', fontWeight: '400', fontSize: 15, lineHeight: 20, letterSpacing: 0.5, marginTop: 12 }}>
                        {data?.desc}
                    </Text>

                </View>
            </ScrollView>
            <View style={{ padding: 24 }}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('DaftarEvent', { param: data?.id })}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Daftar Event</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
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
        backgroundColor: '#0079DE',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10,
        // marginBottom: 30
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