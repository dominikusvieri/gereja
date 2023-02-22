import { View, Text, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NewsView from './NewsView';
import EventView from './EventView'

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'news', title: 'News' },
    { key: 'event', title: 'Event' },
  ]);


  const renderScene = SceneMap({
    news: NewsView,
    event: EventView,
  });

  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textHeaderTitle}>
            Pusat Informasi
          </Text>
          <Text style={styles.textHeaderTitle}>
            Gereja Isa Almasih Jemaat Purwodadi
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
    paddingTop: 20,
    backgroundColor: '#0885F8'
  },
  textHeaderTitle: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16
  },

})

export default HomeScreen