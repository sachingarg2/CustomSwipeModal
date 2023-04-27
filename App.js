import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions, Animated, ScrollView } from 'react-native';
import CircularTabView from './CircularTabView';

const App = () => {
  const [tabs, setTabs] = useState([{ id: 1, title: 'Tab 1' }, { id: 2, title: 'Tab 2' }]);
  const [maxIndex, setMaxIndex] = useState(3);

  const addNewTab = () => {
    setTabs([...tabs, { id: maxIndex, title: `Tab ${maxIndex}` }]);
    setMaxIndex(maxIndex + 1);
  } 

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={addNewTab}><Text style={style.addNewTabText}>Add New Tab</Text></TouchableOpacity>
      <ScrollView horizontal style={{ margin: 30 }} contentContainerStyle={{ justifyContent: 'space-evenly' }}>
        {tabs.map((item, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, backgroundColor: 'grey' }}>
            <Text style={{ fontSize: 30 }}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
      <CircularTabView tabs= {tabs}/>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    flex: 1
  },
  addNewTabText: {
    fontSize: 20,
    backgroundColor: 'blue',
    color: 'white',
    padding: 10
  },
});

export default App;
