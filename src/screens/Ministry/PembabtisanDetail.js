import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'


const PembabtisanDetail = () => {
  const [fotoKTP, setFotoKTP] = useState(null);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [fileTypeKtp, setFileTypeKtp] = useState(null);

  const [fotoBerwarna, setFotoBerwarna] = useState(null);
  const [fotoBerwarnaPreview, setFotoBerwarnaPreview] = useState(null);
  const [fileTypeFotoBerwarna, setFileTypeFotoBerwarna] = useState(null);

  const [pendidikan, setPendidikan] = useState('Tidak Sekolah')

  const [statusPerkawinan, setStatusPerkawinan] = useState(null)


  const navigation = useNavigation()

  async function pickDocumentKTP() {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      setFotoKTP(result.name);
      setKtpPreview(result.uri);
    }
  }

  function clearDocumentKTP() {
    setFotoKTP(null);
    setKtpPreview(null);
    setFileTypeKtp(null);
  }

  async function pickDocumentFotoBerwarna() {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      setFotoBerwarna(result.name);
      setFotoBerwarnaPreview(result.uri);
    }
  }

  function clearDocumentFotoBerwarna() {
    setFotoBerwarna(null);
    setFotoBerwarnaPreview(null);
    setFileTypeFotoBerwarna(null);
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <Text style={{ fontWeight: '500', fontSize: 18 }}>
          Form Pembabtisan
        </Text>
        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Upload Foto KTP
        </Text>
        {ktpPreview && (
          <Image source={{ uri: ktpPreview }} style={{ width: 100, height: 100 }} />
        )}
        {fotoKTP && <Text>{fotoKTP}</Text>}
        {!ktpPreview && (
          <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 10 }} onPress={pickDocumentKTP}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Select a document</Text>
          </TouchableOpacity>
        )}
        {ktpPreview && (
          <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 10 }} onPress={clearDocumentKTP}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Change document</Text>
          </TouchableOpacity>
        )}

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Upload Foto Berwarna (3x4)
        </Text>
        {fotoBerwarnaPreview && (
          <Image source={{ uri: fotoBerwarnaPreview }} style={{ width: 100, height: 100 }} />
        )}
        {fotoBerwarna && <Text>{fotoBerwarna}</Text>}
        {!fotoBerwarnaPreview && (
          <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 10 }} onPress={pickDocumentFotoBerwarna}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Select a document</Text>
          </TouchableOpacity>
        )}
        {fotoBerwarnaPreview && (
          <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 10 }} onPress={clearDocumentFotoBerwarna}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Change document</Text>
          </TouchableOpacity>
        )}

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Nama
        </Text>
        <TextInput
          placeholder='Masukkan Nama'
          style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
        />

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Tempat, Tanggal Lahir
        </Text>
        <TextInput
          placeholder='Contoh: Jakarta, 10-01-1999'
          style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}

        />

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Alamat
        </Text>
        <TextInput
          placeholder='Masukkan Alamat'
          style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
        />

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Pendidikan Terakhir
        </Text>
        <Picker
          style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
          selectedValue={pendidikan}
          onValueChange={(itemValue, itemIndex) => setPendidikan(itemValue)}
        >
          <Picker.Item label='Tidak Sekolah' value='Tidak Sekolah' />
          <Picker.Item label='TK' value='TK' />
          <Picker.Item label='SD' value='SD' />
          <Picker.Item label='SMP' value='SMP' />
          <Picker.Item label='SMA/Sederajat' value='SMA/Sederajat' />
          <Picker.Item label='Diploma' value='Diploma' />
          <Picker.Item label='Sarjana' value='Sarjana' />
          <Picker.Item label='Pasca Sarjana' value='Pasca Sarjana' />
          <Picker.Item label='Doktoral' value='Doktoral' />
        </Picker>

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Status Perkawinan
        </Text>
        <Picker
          style={{ backgroundColor: '#0885F8', color: '#fff', borderWidth: 2, borderColor: '#000' }}
          selectedValue={statusPerkawinan}
          onValueChange={(itemValue, itemIndex) => setStatusPerkawinan(itemValue)}
        >
          <Picker.Item label='Belum Menikah' value='Belum Menikah' />
          <Picker.Item label='Menikah' value='Menikah' />
          <Picker.Item label='Janda' value='Janda' />
          <Picker.Item label='Duda' value='Duda' />
        </Picker>

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Nama Ayah / Wali
        </Text>
        <TextInput
          placeholder='Masukkan Nama Ayah / Wali'
          style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
        />

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Nama Ibu / Wali
        </Text>
        <TextInput
          placeholder='Masukkan Nama Ibu / Wali'
          style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
        />

        <Text style={{ marginBottom: 5, marginTop: 10 }}>
          Alamat Orang Tua / Wali
        </Text>
        <TextInput
          placeholder='Masukkan Alamat Orang Tua / Wali'
          style={{ borderWidth: 1, borderColor: '#000', padding: 10 }}
        />

        <Text style={{ marginBottom: 5, marginTop: 10, textAlign: 'justify' }}>
          Dengan ini saya bertanggung jawab dengan data yang saya masukkan untuk mengikuti babtisan air
        </Text>
        <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15 }} onPress={() => navigation.navigate('BottomNavigation')} >
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default PembabtisanDetail
