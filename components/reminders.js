import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReminderInput from './form';
export default class Reminders extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ReminderInput />
      </View>
    );
  }
}