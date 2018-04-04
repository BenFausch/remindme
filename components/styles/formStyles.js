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
const size = 20;
export default StyleSheet.create({
    container: {
        flex: 0,
        width: width,
        backgroundColor: '#403075',
        padding: 20,

    },
    recurringContainer: {
        alignItems: 'center',
        paddingBottom:100
    },
    input: {
        height: 60,
        // borderColor: 'white',
        // borderWidth: 1,
        color: 'white',
        marginBottom: 20,
        width: width - 50,
        fontFamily: fontFamily,
        fontWeight: weight,
        fontSize: size,
        textAlign: 'center',
        backgroundColor: '#00000053',
    },
    picker: {
        color: 'white',
        flex: 0,
        width: width - 50,
        borderWidth: 1,
        backgroundColor: '#00000053',
        marginBottom: 20,
        height:60
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

    },
    recurring:{
        flex:0,
        // height:500
    },
    toggleGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        
        width: width - 60,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20
    },
    toggle: {
        
        padding: 10,
        borderWidth:2,
        flex: 0,
        
        width: (width-70) / 2,
    },

    toggleText:{
        
        fontWeight:'bold',
textAlign: 'center',
    },
    active:{
        borderColor:'red',
        
    },
    inactive:{
        borderColor:'blue',
        backgroundColor:'#00000053',
        
    },
    activeText:{
        color:'red'
    },
    inactiveText:{
        color:'blue'
    }
});