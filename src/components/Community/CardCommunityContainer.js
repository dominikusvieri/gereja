import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CardCommunityContainer = ({ imageSrc, title, data }) => {
    const navigation = useNavigation()
    return (
        <ScrollView>
            <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => navigation.navigate('DetailComm', { param: data })}
            >
                <Image
                    source={{ uri: imageSrc }}
                    style={{ width: 70, height: 70, borderRadius: 5, borderWidth: 2, borderColor: '#0885F8' }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', maxWidth: 70 }}>
                    {title.length > 20 ? `${title.slice(0, 20)}..` : title}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default CardCommunityContainer

const styles = StyleSheet.create({})