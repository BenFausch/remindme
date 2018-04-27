import React, { Component } from 'react';
import { TextInput, Picker, Text, View, Button, AsyncStorage, Modal, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from './styles/formStyles';
import TimerLogic from '../utilities/timer';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import BackgroundTask from 'react-native-background-task';
import { NotificationsAndroid } from 'react-native-notifications';
import {GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import Config from 'react-native-config';

const bg = require('../images/doge.jpg');

let newsAPI = Config.NEWS_API;
// newsapi.org is the api we're using to post articles from opposite political pages

// create stateless background task
BackgroundTask.define(() => {
  TimerLogic.requestReminders();
  BackgroundTask.finish();
});

function deleteOne (reminder) {
  AsyncStorage.removeItem(reminder);
}

// function to be used by push opens
function onNotificationOpened (notification) {
  Alert.alert(
  'Reminding your face about: ' + notification.data.title,
  'Hey there buddy, did you ' + notification.data.extra + '?',
    [
    {text: 'nope', onPress: () => postToFacebook(notification), style: 'cancel'},
      {text: 'i did leave me alone',
        onPress: () => Alert.alert('fine. wanna cancel this notification?', '', [
        {text: 'yeah', onPress: () => deleteOne(notification.data.title), style: 'cancel'},
        {text: 'nah', onPress: () => alert("k it's still there to bother you")}
        ])}
    ],
  { cancelable: false }
);
}

let postToFacebook = (notification) => {
  getStory(notification);
};

function getStory (notification) {
  let baseURL = 'https://newsapi.org/v2/everything?sources=breitbart-news&apiKey=' + newsAPI;
  fetch(baseURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }})
 .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);

      fbPost(responseJSON.articles[0].url, notification);
    }).catch((error) => {
      console.error(error);
    });
}

function fbPost (story, notification) {
  AccessToken.getCurrentAccessToken().then(
                (data) => {
                  let tempAccesstoken = data.accessToken;
                  const _responseInfoCallback = (error, result) => {
                    console.log(result + error);
                  };

                  const postRequestParams = {
                    message: {
                      string: 'Hola muchachos! \n Testing my app. \n Ben did not ' + notification.data.extra + '. \nAs punishment, here\'s a post from Breitbart shared on his behalf: \n' + story
                    }
                  };

                  const postRequestConfig = {
                    httpMethod: 'POST',
                    version: 'v2.9',
                    parameters: postRequestParams,
                    accessToken: tempAccesstoken
                  };

                  console.log(postRequestConfig);

                  const infoRequest = new GraphRequest(
                        '/me/feed',
                        postRequestConfig,
                        _responseInfoCallback,
                    );
                  console.log('infoRequest');
                  console.log(infoRequest);

                  new GraphRequestManager().addRequest(infoRequest).start();
                });
}

// handler for push notif opens
NotificationsAndroid.setNotificationOpenedListener(onNotificationOpened);

export default class ReminderInput extends Component {

  constructor (props) {
    super(props);
    this.state = {
      text1: '',
      text2: '',
      frequencyNum: '1',
      frequencySize: 'Hour',
      type: 'single',
      date: '',
      timestamp: '',
      success: '',
      modalVisible: false
    };

    // text1: title
    // text2: body
    // frequencyNum: times per frequencySize
    // frequencySize: unit for repeat (day/month etc)
    // timestamp: used for time comparisons on bg-timer
    // success: success message if needed
    // modalvisible: show/hide success modal
  }

  componentDidMount () {
    console.log('didmount');
    const intervalId = BackgroundTimer.setInterval(() => {
      TimerLogic.echo(Date.now());
      TimerLogic.requestReminders();
    }, 10000);
    BackgroundTask.schedule();
  }

  save = () => {
    this.setState({
      success: 'yolo'
    });
    let current = this.state;
    if (current.type === 'recurring') {
      current.timestamp = Date.now();
    }
    console.log(current);

    AsyncStorage.setItem(this.state.text1, JSON.stringify(current), () => {
      AsyncStorage.getItem(this.state.text1, (err, result) => {
        this.setModalVisible(true);
      });
    });
  }

  setDate = (date) => {
    console.log('setdate');
    console.log(moment(date, 'MMMM Do YYYY, h:mm a').valueOf());
    let timestamp = moment(date, 'MMMM Do YYYY, h:mm a').valueOf();
    this.setState({date: date, timestamp: timestamp});
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    return (
      <ScrollView style={styles.container}>
      <ImageBackground style={styles.recurringContainer} resizeMode='cover' source={bg}>

      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{this.state.text1}</Text>
              <Text>Do thing: {this.state.text2}</Text>
              <Text>{this.state.frequencyNum} times every {this.state.frequencySize}</Text>
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Hide modal">
              </Button>
            </View>
          </View>
        </Modal>
      <TextInput
      underlineColorAndroid='transparent'
      placeholderTextColor={'white'}
      placeholder={'Title your thing'}
        style={styles.input}
        onChangeText={(text1) => this.setState({text1})}
        onFocus={() => { this.setState({'text1': ''}); }}
        value={this.state.text1}
      />
      <TextInput
      underlineColorAndroid='transparent'
      placeholderTextColor={'white'}
      placeholder={"What is the thing you're supposed to do"}
        style={styles.input}
        onChangeText={(text2) => this.setState({text2})}
        onFocus={() => { this.setState({'text2': ''}); }}
        value={this.state.text2}
      />
      <View style={styles.toggleGroup}>

        <TouchableOpacity
        onPress={() => { this.setState({'type': 'single'}); }}
         style={[styles.toggle, this.state.type === 'single' ? styles.active : styles.inactive]}>

          <Text style={[styles.toggleText, this.state.type === 'single' ? styles.activeText : styles.inactiveText]}>Once</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => { this.setState({'type': 'recurring'}); }}
        style={[styles.toggle, this.state.type === 'recurring' ? styles.active : styles.inactive]}>
          <Text style={[styles.toggleText, this.state.type === 'recurring' ? styles.activeText : styles.inactiveText]}>
          Recurring</Text>
        </TouchableOpacity>

      </View>
      {this.state.type === 'recurring' ? (
      <View style={this.state.recurring}>
      <Picker
        selectedValue={this.state.frequencyNum}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => this.setState({frequencyNum: itemValue})}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      <Text style={styles.text}>Times every</Text>
      <Picker
        selectedValue={this.state.frequencySize}
        onValueChange={(itemValue, itemIndex) => this.setState({frequencySize: itemValue})}
        style={styles.picker}
        itemStyle={styles.pickerItem}>
        <Picker.Item label="15 Minutes" value="15 Minutes" />
        <Picker.Item label="Hour" value="Hour" />
        <Picker.Item label="Day" value="Day" />
        <Picker.Item label="Week" value="Week" />
        <Picker.Item label="Month" value="Month" />
      </Picker>
      </View>
      ) : (<View>
        <DatePicker
        style={styles.datepicker}
        date={this.state.date}
        mode="datetime"
        placeholder="select date"
        format="MMMM Do YYYY, h:mm a"
        minDate="2016-05-01"
        maxDate="2020-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            backgroundColor:'#00000000'
          },
          dateInput: {
            marginLeft: 36,
            backgroundColor:'#261758CC',
            // color:'white'
          },
          dateText: {
            // color: 'white',
            fontWeight: 'bold'
          },
          placeHolderText:{
            // color:'white',
            fontWeight:'bold',
            fontSize:'18'
          }
        }}
        onDateChange={(date) => { this.setDate(date); }}
      />
      </View>)}
      <TouchableOpacity
        onPress={this.save}
        color="#841584"
        style={styles.save}
      >
      <Text style={styles.text}>Save it!</Text>
      </TouchableOpacity>
      </ImageBackground>
      </ScrollView>
    );
  }
}
