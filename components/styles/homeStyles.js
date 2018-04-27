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
const white = '#fff';
export default StyleSheet.create({
  title: {
    color: white,
    fontSize: size * 2.5,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    marginTop: 15
  },
  subtitle: {
    color: white,
    fontSize: size,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    marginTop: 15,
    backgroundColor:purple,
    width:width
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
    backgroundColor: 'black',
    padding: 10,
    width: width,
    marginTop: 50
  },
  destroyAllButtonText: {
    color: white,
    fontSize: size * 0.6,
    textAlign: 'center'
  },
    picker: {
    color: 'white',
    flex: 0,
    width: width,
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
    fontSize: size + 5,
    borderWidth:1,
    borderColor:white
  }
});
