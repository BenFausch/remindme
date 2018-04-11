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
const purple = '#403075';
const white = '#fff';
export default StyleSheet.create({
  reminderTitle: {
    color: white,
    fontSize: size * 2
  },
  container: {
    flex: 1,
    backgroundColor: purple
  },
  subcontainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  destroyButton: {
    backgroundColor: '#EE0087',
    width: 60,
    alignSelf: 'flex-end',
    padding: 5
  },
  destroyButtonText: {
    color: white,
    fontSize: size * 0.6,
    textAlign: 'center'
  },
  destroyAllButton: {
    backgroundColor: '#EE0087',
    padding: 10,
    width: width
  },
  destroyAllButtonText: {
    color: white,
    fontSize: size * 0.6,
    textAlign: 'center'
  },
  index: {
    color: '#EE0087',
    fontSize: size * 1.5,
    alignSelf: 'flex-end',
    paddingRight: 10,
    marginBottom: -35
  },
  reminder: {
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingLeft: 10,
    paddingTop: 5,
    marginTop: 20,
    width: width - 60,
    backgroundColor: '#13073B'
  },
  nothing: {
    marginTop: 50,
    color: '#ffffff80',
    fontSize: size * 1.5,
    width: width - 100,
    height: 300,
    textAlign: 'center'
  },
  title: {
    fontSize: size * 1.5,
    color: white
  },
  thing: {
    color: white,
    fontSize: size,
    borderBottomColor: '#ffffff80',
    borderBottomWidth: 1,
    margin: 10,
    marginLeft: 0
  },
  frequency: {
    color: '#ffffff80',
    marginBottom: 5
  },
  timestamp: {
    color: '#ffffff60',
    marginBottom: -15,
    marginTop: 5,
    fontSize: size * 0.6
  }
});
