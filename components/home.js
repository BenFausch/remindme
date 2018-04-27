import React from 'react';
import { Text, View, Button, ImageBackground, AsyncStorage, TouchableOpacity, Picker, Alert } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import ReactNativeAN from 'react-native-alarm-notification';
import moment from 'moment';
import styles from './styles/homeStyles';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const home = require('../images/home.jpg');

export default class HomeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      flavor: 'Musical',
      mean: 'BRUTAL'
    };

  }

  schedule = () => {
    let currentDate = new Date();
    let time = moment(new Date(currentDate.getTime() + (6 * 1000))).format('DD-MM-YYYY HH:mm:ss');
    console.log('now is' + moment(currentDate.getTime()).format('DD-MM-YYYY HH:mm:ss'));
    console.log('time is' + time);
    let alarmNotifData = {
      id: '12345',                                  // Required
      title: 'My Notification Title',               // Required
      message: 'My Notification Message',           // Required
      // ticker: 'My Notification Ticker',
      auto_cancel: false,                            // default: true
      vibrate: true,
      vibration: 100,                               // default: 100, no vibration if vibrate: false
      small_icon: 'ic_launcher',                    // Required
      // large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: 'mmmbop.mp3',                             // Plays custom notification ringtone if sound_name: null
      color: 'red',
      schedule_once: true                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
      // tag: 'some_tag',
     // fire_date: time              // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm. Format: dd-MM-yyyy HH:mm:ss
    };
    alert('scheduling using time' + time);
    ReactNativeAN.sendNotification(alarmNotifData);
  }

  destroy = () => {
    Alert.alert(
  'Yo Dawg what the fuck?',
  "I don't want to tell you what to do, but all this work you've done is for nothing",
      [
    {text: 'oh shit i guess i wont', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'stfu i do wat i want', onPress: () => clearAllData()}
      ],
  { cancelable: false }
);

    let clearAllData = () => {
      AsyncStorage.clear();
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          console.log('async data cleared, proof:', stores);
        });
      });
    };
  }

flavorTown = () =>{

  let musicArr = {
    "rock":"justin bieber",
    "classical":"justin bieber",
    "jazz":"justin bieber",
  }

  let pickers = (musicArr)=> {
    let output = [];
    for(var key in musicArr){
      console.log(key, musicArr[key])
      output.push(<Picker.Item label={key} value={musicArr[key]} />)
    }
    return output;
  }


  return(
    <View>
    <Text style={styles.subtitle}>What's your favorite type of music?</Text>
     <Picker
        selectedValue={'rock'}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => alert(itemValue)}>
        {pickers(musicArr)}
        </Picker>
    </View>
    )
}  


  render () {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} resizeMode='stretch' source={home}>
        <Text style={styles.title}>Settings!</Text>
          <Text style={styles.subtitle}>Connect all the socials!</Text>
         <LoginButton
         publishPermissions={['publish_actions']}
         />
         <Text style={styles.subtitle}>What flavor of reminders do you want</Text>
         <Picker
        selectedValue={this.state.flavor}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => this.setState({flavor: itemValue})}>
        <Picker.Item label="🤵 Political" value="Political" />
        <Picker.Item label="🎵 Musical" value="Musical" />
        <Picker.Item label="⛹ Sportical" value="Sportical" />
        </Picker>
        {this.flavorTown()}
        <Text style={styles.subtitle}>how mean do you want them to be?</Text>
        <Picker
        selectedValue={this.state.mean}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => this.setState({mean: itemValue})}>
        <Picker.Item label="🧐 nice" value="nice" />
        <Picker.Item label="😶 less nice" value="less nice" />
        <Picker.Item label="😮 mean" value="mean" />
        <Picker.Item label="😱 BRUTAL" value="BRUTAL" />
        </Picker>
         {/* <Button onPress={() => this.schedule()} title="Schedule an Alarm!"/> */}

         <TouchableOpacity
                    onPress={this.destroy}
                    style={styles.destroyAllButton}
                    >
                      <Text style={styles.destroyAllButtonText}>): Destroy Data :(</Text>
                  </TouchableOpacity>
         </ImageBackground>
      </View>
    );
  }
}
