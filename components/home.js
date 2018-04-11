import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NotificationsAndroid, NotificationAction, NotificationCategory } from 'react-native-notifications';
import BackgroundTimer from 'react-native-background-timer';

export default class HomeScreen extends React.Component {

  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}
