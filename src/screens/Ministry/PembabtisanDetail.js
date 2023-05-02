import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const PembabtisanDetail = () => {
  const [fotoKTP, setFotoKTP] = useState(null);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [fileTypeKtp, setFileTypeKtp] = useState(null);

  const [fotoBerwarna, setFotoBerwarna] = useState(null);
  const [fotoBerwarnaPreview, setFotoBerwarnaPreview] = useState(null);
  const [fileTypeFotoBerwarna, setFileTypeFotoBerwarna] = useState(null);
  

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
    <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 20 }}>
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
      </ScrollView>
    </View>
  );
}

export default PembabtisanDetail
