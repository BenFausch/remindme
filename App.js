import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './components/home';
import Reminders from './components/reminders';
import ReminderList from './components/reminderList';
import FontAwesome, { Icons } from 'react-native-fontawesome';

console.disableYellowBox = true;

class App extends React.Component {

  render () {
    console.log('render');
    return (
      <View>
        <TabNavigator />
      </View>
    );
  }
}



export default TabNavigator(
  {
    'add one': { screen: Reminders,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome style={{'color':'white', fontSize:28}}>{Icons.mehO}</FontAwesome>
      }
    },
    'reminders': {screen: ReminderList,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome style={{'color':'white', fontSize:28}}>{Icons.coffee}</FontAwesome>
      }
    },
    'settings': { screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome style={{'color':'white', fontSize:28}}>{Icons.bolt}</FontAwesome>
      }
    }
  }, {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'red',
      activeBackgroundColor: 'purple',
      inactiveBackgroundColor: 'gray',
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#261758CC'
      }
    }
  }
);
