import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('window');
const fontFamily = (Platform.OS === 'android' ? 'roboto' : 'HelveticaNeue-Light');
const weight = '300';
const size = 18;
const purple = '#261758CC';

export default StyleSheet.create({
  container: {
    flex: 0,
    width: width,
    backgroundColor: '#403075',
    
  },
  recurringContainer: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 70,
    height:height
  },
  input: {
    height: 60,
    color: 'white',
    marginBottom: 20,
    width: width - 50,
    fontFamily: fontFamily,
    fontWeight: weight,
    fontSize: size,
    textAlign: 'center',
    backgroundColor: purple,
    borderColor:'white',
    borderWidth:2
  },
  datepicker: {
    marginTop: 20,
    marginBottom: 50,
    width: width - 120,
    // color:'white'
  },
  picker: {
    color: 'white',
    flex: 0,
    width: width - 50,
    borderWidth: 1,
    backgroundColor: purple,
    marginBottom: 20,
    height: 60
  },
  pickerItem: {
    color: 'white',
    'height': 50,
    fontFamily: fontFamily,
    fontWeight: weight,
    fontSize: size + 5
  },
  destroyButton: {
    borderWidth: 1,
    borderColor: 'pink',
    fontFamily: fontFamily,
    fontWeight: weight,
    fontSize: size
  },
  text: {
    fontSize: size + 5,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  save: {
    borderWidth: 3,
    borderColor: 'white',
    width: width - 50,
    height: 60,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor:purple
  },
  recurring: {
    flex: 0
  },
  toggleGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 60,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  toggle: {
    padding: 10,
    borderWidth: 2,
    flex: 0,
    width: (width - 70) / 2
  },
  toggleText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  active: {
    borderColor: 'white',
    backgroundColor: purple,
  },
  inactive: {
    borderColor: '#ffffff53',
    
  },
  activeText: {
    color: 'white'
  },
  inactiveText: {
    color: '#ffffff53'
  }
});
