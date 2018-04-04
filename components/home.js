import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NotificationsAndroid,  NotificationAction, NotificationCategory } from 'react-native-notifications';
import BackgroundTimer from 'react-native-background-timer';
import TimerLogic from '../utilities/timer';

export default class HomeScreen extends React.Component {

componentDidMount () {
  console.log("didmount")
  const intervalId = BackgroundTimer.setInterval(() => { 
        TimerLogic.echo(Date.now());
        TimerLogic.requestReminders();
    }, 10000);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}