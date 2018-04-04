import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import {NotificationsAndroid,  NotificationAction, NotificationCategory } from 'react-native-notifications';
import BackgroundTimer from 'react-native-background-timer';


export default class TimerLogic  {


static echo(state){
	console.log(state)

}


static requestReminders(){
		AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
   console.log(stores);
   this.parseReminders(stores);
  });
});
}

static parseReminders(reminders){
	// console.log(JSON.parse(reminders[0][1]));
	// "{"text1":"test2","text2":"2","frequencyNum":"1","frequencySize":"Hour","success":"","modalVisible":false,"date":"","timestamp":1522864158802}"

	if(reminders&&reminders[0]&&reminders[0][1]){
		console.log(JSON.parse(reminders[0][1]));
		let i=0;
		reminders.forEach(function(reminder){
			
			console.log(i)
			console.log('a reminder named: '+reminder[0])
		

		//get first reminder to test
		let firstReminder = JSON.parse(reminders[i][1]);

		//get date.now in ms (ms since unix epoch)
		let now = Date.now();
		//get reminder timestamp
		let timestamp = firstReminder.timestamp;
		console.log('timestamp is',timestamp)

		//get frequency scale (frequencySize in ms / frequencyNum)
		let frequencyScale = TimerLogic.getFrequencyScale(firstReminder.frequencySize, firstReminder.frequencyNum);
		console.log('frequency scale in ms: '+frequencyScale);

		if(now>timestamp+frequencyScale){
			TimerLogic.notification(firstReminder);
		}

			i++;
		})
	}
}


static getFrequencyScale(size, number){
	let sizeMs = 0;
	switch(size){
		case 'Minute':
		sizeMs = 60000;
		break;
		case 'Hour':
		sizeMs = 3600000;
		break;
		case 'Day':
		sizeMs = 86400000;
		break;
		case 'Week':
		sizeMs = 604800000;
		break;
		case 'Month':
		sizeMs = 2592000000;
		break;
	}
	return sizeMs/number;
}


static notification(reminder){
console.log(reminder)
if(reminder){
	NotificationsAndroid.localNotification({
  			title: reminder.text1,
  			body: "It's time to "+reminder.text2+" you fucking fuck",
  			extra: "test123"
		});
	AsyncStorage.removeItem(reminder.text1);
	reminder.timestamp = Date.now();
	console.log('resetting reminder: ',reminder)
	AsyncStorage.setItem(reminder.text1, JSON.stringify(reminder));
	}
}


}