import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import Signature from "react-native-signature-canvas";
import { useNavigation } from '@react-navigation/native'
import { useRef } from "react";

const TandaTanganPembabtisan = () => {
    const ref = useRef()
    const [signature, setSign] = useState(null);
    const navigation = useNavigation()

    const handleOK = (signature) => {
        console.log(signature);
        setSign(signature);
    };

    const handleEmpty = () => {
        console.log("Empty");
    };

    const style = `.m-signature-pad--footer
      .button {
        background-color: red;
        color: #FFF;
      }`;
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.preview}>
                <Text>Tanda Tangan Orang Tua / Wali</Text>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 335, height: 114 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            {/* <Signature
                ref={ref}
                onOK={handleOK}
                onEmpty={handleEmpty}
                descriptionText="Sign"
                clearText="Clear"
                confirmText="Save"
                webStyle={style}
            /> */}
            <TouchableOpacity style={{ backgroundColor: '#0885F8', padding: 15 }} onPress={() => navigation.navigate('TTDWanita')} >
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>SUBMIT</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10,
    },
});

export default TandaTanganPembabtisan;
