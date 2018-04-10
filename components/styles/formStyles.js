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

export default StyleSheet.create({
    container: {
        flex: 0,
        width: width,
        backgroundColor: '#403075',
        padding: 20,
    },
    recurringContainer: {
        alignItems: 'center',
        paddingTop:50,
        paddingBottom: 100
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
        backgroundColor: '#261758',
    },
    datepicker: {
        marginTop:20,
        marginBottom: 50,
        width: width - 120
    },
    picker: {
        color: 'white',
        flex: 0,
        width: width - 50,
        borderWidth: 1,
        backgroundColor: '#261758',
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
    },
    recurring: {
        flex: 0,
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
        width: (width - 70) / 2,
    },
    toggleText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    active: {
        borderColor: 'white',
    },
    inactive: {
        borderColor: '#ffffff53',
        backgroundColor: '#261758',
    },
    activeText: {
        color: 'white'
    },
    inactiveText: {
        color: '#ffffff53'
    }
});