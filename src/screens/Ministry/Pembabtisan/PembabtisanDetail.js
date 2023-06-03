import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import moment from 'moment';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput as LabeledInput } from "react-native-paper";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const PembabtisanDetail = () => {
  const [fotoKTP, setFotoKTP] = useState(null);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [fileTypeKtp, setFileTypeKtp] = useState(null);

  const [fotoBerwarna, setFotoBerwarna] = useState(null);
  const [fotoBerwarnaPreview, setFotoBerwarnaPreview] = useState(null);
  const [fileTypeFotoBerwarna, setFileTypeFotoBerwarna] = useState(null);

  const [pendidikan, setPendidikan] = useState('Tidak Sekolah')

  const [statusPerkawinan, setStatusPerkawinan] = useState(null)

  const [tanggalLahir, setTanggalLahir] = useState(moment().toDate());
  const [tanggalBaptis, setTanggalBaptis] = useState(moment().toDate());
  const [nama, setNama] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [alamat, setAlamat] = useState('')
  const [namaAyahorWali, setNamaAyahorWali] = useState('')
  const [namaIbuorWali, setNamaIbuorWali] = useState('')
  const [alamatOrtuorWali, setAlamatOrtuorWali] = useState('')
  const [isFormValid, setIsFormValid] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTerdaftarPelayanan, setIsTerdaftarPelayanan] = useState(false)
  const [listPelayanan, setListPelayanan] = useState([])

  const verifyAuth = async () => {
    setIsLoading(true)
    const accessToken = await SecureStore.getItemAsync('accessToken').finally(function () {
      setIsLoading(false)
    })
    if (accessToken) {
      setIsAuthorized(true)
    }
    else {
      setIsAuthorized(false)
    }
    console.log(accessToken)
  }

  useEffect(() => {
    verifyAuth()
  }, [isAuthorized, useIsFocused()])


  const navigation = useNavigation()

  const handleUploadKTP = (text) => {
    setFotoKTP(text);
    validateForm();
  };

  const handleNama = (text) => {
    setNama(text);
    validateForm();
  };

  const handleUploadFoto = (text) => {
    setFotoBerwarna(text);
    validateForm();
  };

  const handleTempatLahir = (text) => {
    setTempatLahir(text);
    validateForm();
  };

  const handleTanggalLahir = (text) => {
    setTanggalLahir(text);
    validateForm();
  };

  const handleAlamat = (text) => {
    setAlamat(text);
    validateForm();
  };

  const handleNamaAyahorWali = (text) => {
    setNamaAyahorWali(text);
    validateForm();
  };

  const handleNamaIbuorWali = (text) => {
    setNamaIbuorWali(text);
    validateForm();
  };

  const handleAlamatOrtuorWali = (text) => {
    setAlamatOrtuorWali(text);
    validateForm();
  };


  const validateForm = () => {
    setIsFormValid(nama !== '' && tanggalLahir !== '' && tempatLahir !== '' && alamat !== '' && fotoKTP !== '' && fotoBerwarna !== '' && namaAyahorWali !== '' && namaIbuorWali !== '' && alamatOrtuorWali !== '' && pendidikan !== '' && statusPerkawinan !== '');
  };

  const renderButton = () => {
    if (isFormValid) {
      return (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('BottomNavigation')}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Submit</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.nextButtonDisable} disabled={true}
      >
        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Submit</Text>
      </TouchableOpacity>
    );
  };

  const handleDaftar = () => {

    const baptisanRegister = {
      foto_ktp: fotoKTP,
      foto_pribadi: fotoBerwarna,
      nama: nama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      alamat: alamat,
      pendidikan: pendidikan,
      status_perkawinan: statusPerkawinan,
      nama_ayah_or_wali: namaAyahorWali,
      nama_ibu_or_wali: namaIbuorWali,
      alamat_ortu_or_wali: alamatOrtuorWali
    }
    axios.post(' https://e0ed-2001-448a-2020-8c4a-38b3-3995-dbe3-8d0e.ngrok-free.app/baptisan', baptisanRegister)
      .then(response => {
        // handle successful response
        console.log(response.data);
        navigation.navigate('BottomNavigation')
      })
      .catch(error => {
        // handle error
        console.error(error);
      });
  }

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

  const onTanggalLahirChange = (event, selectedDate) => (dateType) => {
    setTanggalLahir(selectedDate);
    handleInputChange(selectedDate, dateType);
  }

  const showDatePicker = (dateType) => {
    DateTimePickerAndroid.open({
      value: dateType === 'tglLahir' ? tanggalLahir : tanggalBaptis,
      onChange: (event, selectedDate) => onTanggalLahirChange(event, selectedDate)(dateType),
      mode: 'date',
      is24Hour: true,
      maximumDate: moment().toDate()
    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
      {isLoading ?
        <View style={styles.unauthorizedContainer}>
          <ActivityIndicator color="#4281A4" style={{ transform: [{ scaleX: 4 }, { scaleY: 4 }] }} />
        </View>
        :
        (isAuthorized ?
          <View>
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 10 }}>
              <Text style={{ fontWeight: '700', fontSize: 20, color: '#4281A4' }}>
                Form Pembaptisan
              </Text>
              <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Upload Foto KTP
              </Text>
              {ktpPreview && (
                <Image source={{ uri: ktpPreview }} style={{ width: 100, height: 100 }} />
              )}
              {fotoKTP &&
                <Text>{fotoKTP}</Text>
              }
              {!ktpPreview && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={pickDocumentKTP}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Select a document</Text>
                </TouchableOpacity>
              )}
              {ktpPreview && (
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={clearDocumentKTP}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Change a document</Text>
                </TouchableOpacity>
              )}

              <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Upload Foto Berwarna (3x4)
              </Text>
              {fotoBerwarnaPreview && (
                <Image source={{ uri: fotoBerwarnaPreview }} style={{ width: 100, height: 100 }} />
              )}
              {fotoBerwarna &&
                <Text>{fotoBerwarna}</Text>
              }
              {!fotoBerwarnaPreview && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={pickDocumentFotoBerwarna}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Select a document</Text>
                </TouchableOpacity>
              )}
              {fotoBerwarnaPreview && (
                <TouchableOpacity
                  style={styles.changeButton}
                  onPress={clearDocumentFotoBerwarna}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>Change a document</Text>
                </TouchableOpacity>
              )}

              <LabeledInput
                label='Nama'
                style={styles.dateInput}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor="#4281A4"
                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                textColor="black"
                onChangeText={handleNama}
              />

              <LabeledInput
                label='Tempat Lahir'
                style={styles.dateInput}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor="#4281A4"
                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                textColor="black"
                onChangeText={handleTempatLahir}
              />

              <TouchableOpacity style={{ marginTop: 15 }} onPress={() => showDatePicker('tglLahir')}>
                <LabeledInput
                  placeholder='Tanggal Lahir'
                  label='Tanggal Lahir'
                  style={styles.dateInput}
                  value={tanggalLahir && moment(tanggalLahir).format('LL')}
                  editable={false}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="black"
                  theme={{ colors: { onSurfaceVariant: 'grey' } }}
                  textColor="black"
                  onChangeText={handleTanggalLahir}
                />
              </TouchableOpacity>

              <LabeledInput
                label='Alamat'
                style={styles.dateInput}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor="#4281A4"
                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                textColor="black"
                onChangeText={handleAlamat}
              />

              <Text style={{ marginBottom: 5, marginTop: 10 }}>
                Pendidikan Terakhir
              </Text>
              <Picker
                style={{ backgroundColor: '#4281A4', color: '#fff', borderWidth: 2, borderColor: '#000' }}
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
                style={{ backgroundColor: '#4281A4', color: '#fff', borderWidth: 2, borderColor: '#000' }}
                selectedValue={statusPerkawinan}
                onValueChange={(itemValue, itemIndex) => setStatusPerkawinan(itemValue)}
              >
                <Picker.Item label='Belum Menikah' value='Belum Menikah' />
                <Picker.Item label='Menikah' value='Menikah' />
                <Picker.Item label='Janda' value='Janda' />
                <Picker.Item label='Duda' value='Duda' />
              </Picker>

              <LabeledInput
                label='Nama Ayah / Wali'
                style={styles.dateInput}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor="#4281A4"
                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                textColor="black"
                onChangeText={handleNamaAyahorWali}
              />

              <LabeledInput
                label='Nama Ibu / Wali'
                style={styles.dateInput}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor="#4281A4"
                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                textColor="black"
                onChangeText={handleNamaIbuorWali}
              />

              <LabeledInput
                label='Alamat Orang Tua / Wali'
                style={styles.dateInput}
                mode='outlined'
                outlineColor='black'
                activeOutlineColor="#4281A4"
                theme={{ colors: { onSurfaceVariant: 'grey' } }}
                textColor="black"
                onChangeText={handleAlamatOrtuorWali}
              />

              <Text style={{ marginBottom: 5, marginTop: 10, textAlign: 'justify' }}>
                Dengan ini saya bertanggung jawab dengan data yang saya masukkan untuk mengikuti babtisan air
              </Text>
              {renderButton()}
            </ScrollView>
          </View>
          :
          <View style={styles.unauthorizedContainer}>
            <Text style={styles.unauthorizedTitle}>
              Anda belum login
            </Text>
            <Text style={styles.unauthorizedDesc}>
              Silahkan login untuk melanjutkan
            </Text>
            <TouchableOpacity
              style={styles.unauthorizedButton}
              onPress={() => navigation.navigate('login')}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        )
      }

    </View>
  );
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
    backgroundColor: '#4281A4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  changeButton: {
    height: 48,
    backgroundColor: '#DB4437',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
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
  headerStyle: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#0885F8'
  },
  textHeaderTitle: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16
  },
  unauthorizedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  unauthorizedTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4281A4'
  },
  unauthorizedDesc: {
    fontSize: 16,
    color: '#4281A4',
    marginBottom: 12,
  },
  unauthorizedButton: {
    paddingVertical: 12,
    paddingHorizontal: 56,
    backgroundColor: '#4281A4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  loginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500'
  }
})


export default PembabtisanDetail
