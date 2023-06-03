import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { TextInput as LabeledInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton } from 'react-native-paper'
import moment from "moment";

export default function FormMempelaiPria({
    pernikahanData,
    handleInputChange,
    countryList
}) {
    const [wargaNegara, setWargaNegara] = useState('');
    const [countryListOpen, setCountryListOpen] = useState(false);
    const [tanggalLahir, setTanggalLahir] = useState(moment().toDate());
    const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [selectedKPK, setSelectedKPK] = useState(null);
    const [babtis, setBabtis] = useState('')

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, marginBottom: 20 }}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4', marginBottom: 16, marginTop: 20 }}>
                    Mempelai Pria
                </Text>

                {/* Name field */}
                <LabeledInput
                    label='Nama'
                    style={styles.dateInput}
                    value={pernikahanData?.mempelaiPria?.nama || ''}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'nama')}
                />

                {/* Tempat lahir field */}
                <LabeledInput
                    label='Tempat lahir'
                    style={styles.dateInput}
                    value={pernikahanData?.mempelaiPria?.tempatLahir || ''}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'tempatLahir')}
                />

                {/* Tanggal lahir field */}
                <TouchableOpacity onPress={() => showDatePicker('tglLahir', 'mempelaiPria')}>
                    <LabeledInput
                        placeholder='Tanggal Lahir'
                        label='Tanggal Lahir'
                        style={styles.dateInput}
                        value={pernikahanData.mempelaiPria.tglLahir ? moment(pernikahanData.mempelaiPria.tglLahir).format('LL') : null}
                        editable={false}
                        mode="outlined"
                        outlineColor="black"
                        activeOutlineColor="black"
                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                        textColor="black"
                    />
                </TouchableOpacity>

                {/* Alamat field */}
                <LabeledInput
                    label='Alamat'
                    style={styles.dateInput}
                    value={pernikahanData?.mempelaiPria?.alamat || ''}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'alamat')}
                />

                {/* Kewarganegaraan dropdown */}
                <Text style={{ marginBottom: 5, color: 'grey', fontSize: 14 }}>
                    Kewarganegaraan
                </Text>
                <DropDownPicker
                    placeholder="Kewarganegaraan"
                    value={wargaNegara}
                    items={countryList}
                    open={countryListOpen}
                    setOpen={setCountryListOpen}
                    setValue={setWargaNegara}
                    onChangeValue={(e) => handleInputChange(e, 'mempelaiPria', 'wargaNegara')}
                    style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: 12 }]}
                    placeholderStyle={{ color: 'grey' }}
                    listMode="MODAL"
                    itemKey='id'
                    searchable
                    searchPlaceholder='Cari negara...'
                />

                <LabeledInput
                    label='Pekerjaan'
                    style={styles.dateInput}
                    value={pernikahanData?.mempelaiPria?.pekerjaan || ''}
                    mode='outlined'
                    outlineColor='black'
                    activeOutlineColor="#4281A4"
                    theme={{ colors: { onSurfaceVariant: 'grey' } }}
                    textColor="black"
                    onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'pekerjaan')}
                />

                <Text style={{ marginBottom: 5, marginTop: 10, fontSize: 16, color: '#4281A4', fontWeight: '600' }}>
                    Status Baptis
                </Text>
                <RadioButton.Group
                    // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiPria: { ...pernikahanData.mempelaiPria, baptis: value } })}
                    onValueChange={(e) => handleInputChange(e, 'mempelaiPria', 'baptis')}
                    value={pernikahanData.mempelaiPria.baptis}
                >
                    <RadioButton.Item label='Sudah baptis' value={true} />
                    <RadioButton.Item label='Belum baptis' value={false} />
                </RadioButton.Group>
                {
                    !pernikahanData.mempelaiPria.baptis === '' ? (
                        <></>
                    ) :
                        !pernikahanData.mempelaiPria.baptis ?
                            (<>
                                <View>
                                    <Text style={{ color: 'red' }}>*Anda harus sudah dibaptis untuk melanjutkan</Text>
                                </View>
                            </>) : (<>
                                <View>
                                    <LabeledInput
                                        label="Nomor Induk Jemaat"
                                        style={styles.dateInput}
                                        value={pernikahanData?.mempelaiPria?.noJemaat || ''}
                                        mode='outlined'
                                        outlineColor='black'
                                        activeOutlineColor='#4281A4'
                                        theme={{ colors: { onSurfaceVariant: 'grey' } }}
                                        textColor='black'
                                        onChangeText={(e) => handleInputChange(e, 'mempelaiPria', 'noJemaat')}
                                    />

                                    <Text style={{ marginBottom: 5, color: 'grey', fontSize: 14 }}>
                                        KPK Wilayah
                                    </Text>
                                    <DropDownPicker
                                        placeholder='KPK Wilayah'
                                        value={kpkWilayah}
                                        items={listKPKWilayan}
                                        open={kpkWilayahOpen}
                                        setOpen={setKPKWilayahOpen}
                                        setValue={setKPKWilayah}
                                        style={[styles.input, { backgroundColor: 'transparent', paddingHorizontal: 18, marginBottom: 12 }]}
                                        placeholderStyle={{ color: 'grey' }}
                                        listMode="SCROLLVIEW"
                                        itemKey='id'
                                    />

                                    <View style={{ marginTop: 16 }}>
                                        <Text style={{ marginBottom: 12, fontSize: 16, color: '#4281A4', fontWeight: '600' }}>
                                            Keterlibatan Pelayanan
                                        </Text>
                                        <Text style={{ fontSize: 16 }}>Ikut aktif dalam pelayanan?</Text>
                                        <RadioButton.Group
                                            // onValueChange={value => setPernikahanData({ ...pernikahanData, mempelaiPria: { ...pernikahanData.mempelaiPria, baptis: value } })}
                                            onValueChange={(e) => setIsTerlibatPelayanan(e)}
                                            value={isTerlibatPelayanan}
                                        >
                                            <RadioButton.Item disabled={listPelayanan.length == 0} label='Ya' value={true} labelStyle={{ fontSize: 16 }} />
                                            <RadioButton.Item disabled={listPelayanan.length == 0} label='Tidak' value={false} labelStyle={{ fontSize: 16 }} />
                                        </RadioButton.Group>
                                    </View>

                                    {
                                        isTerlibatPelayanan && (
                                            listPelayanan.length > 0 ?
                                                <View style={{ marginTop: 16 }}>
                                                    <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>Daftar Pelayanan Aktif</Text>
                                                    {
                                                        listPelayanan?.map((pelayanan, i) => {
                                                            return (
                                                                <View
                                                                    key={i}
                                                                    style={styles.cardContainer}
                                                                >
                                                                    <View style={{ flex: 3 }}>
                                                                        <Text style={styles.cardTextDesc}>Kode pelayanan:</Text>
                                                                        <Text style={styles.cardTextTitle}>{pelayanan.kodePelayanan}</Text>
                                                                        <View style={{ marginBottom: 10 }} />
                                                                        <Text style={styles.cardTextDesc}>Jenis pelayanan:</Text>
                                                                        <Text style={styles.cardTextTitle}>{pelayanan.JenisPelayanan.namaPelayanan}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flex: 2, justifyContent: 'center', alignItems: 'center',
                                                                        backgroundColor: pelayanan.statusApproval === 'pending' ? '#737373'
                                                                            : pelayanan.statusApproval === 'denied' ? '#fb7185'
                                                                                : '#10b981',
                                                                        borderRadius: 8
                                                                    }}>
                                                                        <Text style={styles.cardTextStatus}>{
                                                                            pelayanan.statusApproval === 'pending' ?
                                                                                "Menunggu persetujuan"
                                                                                : pelayanan.statusApproval === 'approved' ?
                                                                                    "Terdaftar"
                                                                                    : pelayanan.statusApproval === 'denied' &&
                                                                                    "Ditolak"
                                                                        }</Text>
                                                                    </View>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                                :
                                                <View>
                                                    <Text style={{ color: 'red' }}>*Anda belum terlibat dalam pelayanan</Text>
                                                </View>
                                        )
                                    }
                                </View>
                            </>)
                }

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => navigation.navigate('PernikahanDetailWanita')}
                >
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Selanjutnya</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
    },
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
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
    dateInput: {
        marginBottom: 12,
        backgroundColor: 'white',
        fontSize: 14,
        paddingHorizontal: 4
    },
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
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
    nextButton: {
        height: 48,
        backgroundColor: '#4281A4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    cardContainer: {
        backgroundColor: '#059669',
        marginBottom: 16,
        borderRadius: 8,
        padding: 12,
        flex: 1,
        flexDirection: 'row'
    },
    cardTextTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500'
    },
    cardTextDesc: {
        fontSize: 14,
        color: 'white',
    },
    cardTextStatus: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
})