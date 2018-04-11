import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import styles from './styles/reminderListStyles';
import moment from 'moment';

export default class ReminderList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
   		dataSource: {}
    };
  }

  componentDidMount () {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        this.setState({dataSource: stores});
      });
    });
  }

  componentWillUpdate () {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        this.setState({dataSource: stores});
      });
    });
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

  destroyOne = (reminder) => {
    Alert.alert(
  'Yo Dawg You sure?',
  "I don't want to tell you what to do, but this won't remind you anymore",
      [
    {text: 'I guess not', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'K.', onPress: () => clearOne(reminder)}
      ],
  { cancelable: false }
);

    let clearOne = (reminder) => {
      AsyncStorage.removeItem(reminder);
    };
  }

  _renderRow = (rowData) => {
    let values = JSON.parse(rowData.item[1]);
    if (values) {
      let time = moment(values.timestamp).format('MMMM Do YYYY, h:mm a');
      return (
          <View style={styles.reminder}>
          <Text style={styles.index}>{rowData.index + 1}</Text>
          <Text style={styles.title}>{values.text1}</Text>
          <Text style={styles.thing}>{values.text2}</Text>
          {values.type === 'recurring' ? (
          <Text style={styles.frequency}>Fucking up your shit {values.frequencyNum} time{values.frequencyNum > 1 ? 's' : ''} every {(values.frequencySize).toLowerCase()}</Text>
          ) : (
          <Text style={styles.frequency}>Will bother you at: {values.date}</Text>
          )}
          <Text style={styles.timestamp}>Created: {time}</Text>
           <TouchableOpacity
      onPress={() => this.destroyOne(rowData.item[0])}
      style={styles.destroyButton}
      >
      <Text style={styles.destroyButtonText}>kill me :x</Text>
      </TouchableOpacity>
          </View>);
    } else {
      return (
           <View style={{'marginTop': 100}}>
          <Text>Nothing yet!</Text>
          </View>
      );
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.reminderTitle}>hola muchacho {'\n'}here's your crap</Text>
       {(this.state.dataSource).length > 0
        ? <FlatList
        data={this.state.dataSource}
        style={{paddingTop: 10, paddingBottom: 50}}
                  enableEmptySections
                  renderItem={this._renderRow} /> : <Text style={styles.nothing}>Nothing here, why don't you try to do something with your life through reminders?</Text>
                }
        <TouchableOpacity
      onPress={this.destroy}
      style={styles.destroyAllButton}
      ><Text style={styles.destroyAllButtonText}>): Destroy Data :(</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

