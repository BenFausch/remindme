import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';






export default class ReminderList extends React.Component {

constructor(props) {
    super(props);
    this.state = { 
   		dataSource:{}		
    };
  }

componentDidMount () {
	AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
   // console.log(stores);
   this.setState({dataSource:stores})
  });
});
}

componentWillUpdate(){
	AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
   // console.log(stores);
   this.setState({dataSource:stores})
  });
});	
}

 _renderRow = (rowData) => {
    // console.log(rowData);
    let values = JSON.parse(rowData.item[1])
    // console.log(values)
    if(values){
        return (
          <View style={{'marginTop':100}}>
          <Text>Index #{rowData.index}</Text>
          <Text>{values.text1}</Text>
          <Text>{values.text2}</Text>
          <Text>{values.frequencyNum} times every {values.frequencySize}</Text>
          <Text>Timestamp: {values.timestamp}</Text>
          </View>)
      }else{
        return(
           <View style={{'marginTop':100}}>
          <Text>Nothing yet!</Text>
          </View>
          )
      }
  }


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>hola muchacho</Text>
       {(this.state.dataSource).length > -1 ? 
        <FlatList
        data={this.state.dataSource}
        style={{flex:1}}
                  enableEmptySections
                  renderItem={this._renderRow} /> : <Text>Nothing</Text>
                }
      </View>
    );
  }
}


