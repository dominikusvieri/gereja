import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const CommunityScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: '10px' }}>
          <Text style={styles.textHeaderTitle}>
            Pusat Komunitas
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Jemaat Purwodadi
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  headerStyle: {
    flexDirection: 'column',
    paddingHorizontal: '20px',
    paddingTop: '10px',
    backgroundColor: '#0885F8'
  },
  textHeaderTitle: {
    fontWeight: '600',
    color: '#fff',
    fontSize: '16px'
  },
})

export default CommunityScreen