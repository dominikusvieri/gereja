import { View, Text, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Week1 from './Week1';
import Week2 from './Week2';
import Week3 from './Week3';
import Week4 from './Week4';
import Week5 from './Week5';

const DetailIbadah = () => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'week1', title: 'Minggu ke-1' },
        { key: 'week2', title: 'Minggu ke-2' },
        { key: 'week3', title: 'Minggu ke-3' },
        { key: 'week4', title: 'Minggu ke-4' },
        { key: 'week5', title: 'Minggu ke-5' },
    ])

    const renderScene = SceneMap({
        week1: Week1,
        week2: Week2,
        week3: Week3,
        week4: Week4,
        week5: Week5
    });

    const layout = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyle}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.textHeaderTitle}>
                        Jadwal Ibadah Gereja 
                    </Text>
                    <Text style={styles.textHeaderTitle}>
                        Juni 2023
                    </Text>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color }) => (
                            <Text style={{ color: '#fff' }}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: '#0885F8' }}
                    />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerStyle: {
        flexDirection: 'column',
        paddingHorizontal: 20,
        backgroundColor: '#0885F8'
    },
    textHeaderTitle: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 16
    },

})

export default DetailIbadah