import { View, Text, ScrollView, Modal, Alert, Pressable, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-native-paper'
import moment from 'moment';

const Week1 = ({ week, data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [jadwals, setJadwals] = useState([])

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
                                                {jadwal?.kodeIbadah === 'IRP-001' ? '07.00' : '17.00'}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Pembicara :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.find(el => el.kodePelayanan === 'PBR')?.jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                WL :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.find(el => el.kodePelayanan === 'WLR')?.jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Singers :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'SGR').map((sg, i) => {
                                                    return i === jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'SGR').length - 1 ? `${sg?.jemaat?.nama}` :
                                                        `${sg?.jemaat?.nama}, `
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Musik :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'MSC').map((msc, i) => {
                                                    return i === jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'MSC').length - 1 ? `${msc?.jemaat?.nama}` :
                                                        `${msc?.jemaat?.nama}, `
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Choir :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'CHR').map((chr, i) => {
                                                    return i === jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'CHR').length - 1 ? `${chr?.jemaat?.nama}` :
                                                        `${chr?.jemaat?.nama}, `
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Doa PRA :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.find(el => el.kodePelayanan === 'DPR')?.jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Sound :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.find(el => el.kodePelayanan === 'SND')?.jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Multimedia :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'MMD').map((mmd, i) => {
                                                    return i === jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'MMD').length - 1 ? `${mmd?.jemaat?.nama}` :
                                                        `${mmd?.jemaat?.nama}, `
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Kolektan :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'KLT').map((klt, i) => {
                                                    return i === jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'KLT').length - 1 ? `${klt?.jemaat?.nama}` :
                                                        `${klt?.jemaat?.nama}, `
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Majelis Pendamping :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.find(el => el.kodePelayanan === 'MJP')?.jemaat?.nama}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Usher :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'USR').map((usr, i) => {
                                                    return i === jadwal?.detailjadwals.filter(el => el.kodePelayanan === 'USR').length - 1 ? `${usr?.jemaat?.nama}` :
                                                        `${usr?.jemaat?.nama}, `
                                                })}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 5 }}>
                                                Perjamuan Kudus :
                                            </Text>
                                            <Text style={{ marginBottom: 5, textAlign: 'left' }}>
                                                {jadwal?.detailjadwals.find(el => el.kodePelayanan === 'PKD')?.jemaat?.nama}
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