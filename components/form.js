import React, { Component } from 'react';
import { AppRegistry, TextInput, Picker, Text, View, Button, AsyncStorage, Modal, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import styles from './styles/formStyles';



export default class ReminderInput extends Component {
  

  constructor(props) {
    super(props);
    this.state = { 
      text1: '',
      text2: '',
      frequencyNum: '1',
      frequencySize:'Hour',
      success:'',
      modalVisible:false,
      date:"",
      timestamp:""
    };
  }

  save = () => {
    
    this.setState({
      success:'yolo',
    })
    let current = this.state;
    current.timestamp = Date.now();

    AsyncStorage.setItem(this.state.text1,JSON.stringify(current), ()=>{
      console.log(this.state)
      AsyncStorage.getItem(this.state.text1, (err,result)=>{
        //parse results here to show the window
        this.setModalVisible(true)
      })
    })
  }

  destroy = () => {
    AsyncStorage.clear();
      AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
   console.log('async data:',stores);
   
   
  });
});
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.recurringContainer}>
      <Button 
      title="Destroy Data"
      onPress={this.destroy}
      style={styles.destroyButton}
      />
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
      placeholderTextColor={'white'}
      placeholder={'Title'}
        style={styles.input}
        onChangeText={(text1) => this.setState({text1})}
        onFocus={()=>{this.setState({'text1':''})}}
        value={this.state.text1}
      />
      <TextInput
      placeholderTextColor={'white'}
      placeholder={'What is the thing'}
        style={styles.input}
        onChangeText={(text2) => this.setState({text2})}
        onFocus={()=>{this.setState({'text2':''})}}
        value={this.state.text2}
      />
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
        <Picker.Item label="Minute" value="Minute" />
        <Picker.Item label="Hour" value="Hour" />
        <Picker.Item label="Day" value="Day" />
        <Picker.Item label="Week" value="Week" />
        <Picker.Item label="Month" value="Month" />
      </Picker>
      <TouchableOpacity
        onPress={this.save}
        color="#841584"
        style={styles.save}
      >
      <Text style={styles.text}>Save it!</Text>
      </TouchableOpacity>
      </View>

     {/*} <View>
        <Text>Remind me in the future:</Text>
        <TextInput
        placeholderTextColor={'white'}
        placeholder={}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text1) => this.setState({text1})}
        value={this.state.text1}
      />
      <TextInput
      placeholderTextColor={'white'}
      placeholder={}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text2) => this.setState({text2})}
        value={this.state.text2}
      />
      <Picker
        selectedValue={this.state.frequencyNum}
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
        <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      </View>*/}
      </ScrollView>
    );
  }
}