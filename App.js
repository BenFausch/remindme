import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/home';
import Reminders from './components/reminders';
import ReminderList from './components/reminderList';

console.disableYellowBox = true;

class App extends React.Component {

  
  render() {
      console.log("render")
    return (
      <View>
        <TabNavigator />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#403075',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'blue'
  },
  text:{
    color:'#fff',
    fontSize:20
  }
});

export default TabNavigator({
  Reminders: { screen: Reminders },
  Home: { screen: HomeScreen },
  ReminderList:{screen: ReminderList}
});