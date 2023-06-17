import { View, Text, ScrollView, Modal, Alert, Pressable, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Card } from 'react-native-paper'
import moment from 'moment';

const Week1 = ({ week, data }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                {data && data?.filter(el => el.week == week).length > 0 ?
                    data?.map(jadwal => {
                        if (jadwal?.week == week) {
                            return (
                                <Card key={jadwal.kodeJadwal} style={{ backgroundColor: '#fff', marginVertical: 20, padding: 5 }}>
                                    <Text style={{ fontWeight: '700', fontSize: 20, color: '#fff', marginBottom: 5, backgroundColor: '#4281A4', padding: 10, marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                        {moment(jadwal?.tanggal).format('dddd')}, {moment(jadwal?.tanggal).format('LL')}
                                    </Text>
                                    <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 10, marginBottom: 10, backgroundColor: '#fff' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Nama Ibadah :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.Ibadah?.namaIbadah}
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
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'PBR')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                WL :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'WLR')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Singers :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'SGR')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Musik :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'MSC')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Choir :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'CHR')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Doa PRA :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'DPR')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Sound :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'SND')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Multimedia :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'MMD')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Kolektan :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'KLT')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Majelis Pen :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'MJP')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Usher :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'USR')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Perjamuan Kudus :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.DetailJadwals.find(el => el.kodePelayanan === 'PKD')?.Jemaat?.nama}
                                            </Text>
                                        </View>
                                    </View>
                                </Card>
                            )
                        }
                    })
                    :
                    <View style={{ display: 'flex', height: Dimensions.get('window').height - 220, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../../assets/not_found.png')}
                            style={{ width: 70, height: 70 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#adb5bd', marginTop: 12 }}>Tidak ada jadwal</Text>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

export default Week1