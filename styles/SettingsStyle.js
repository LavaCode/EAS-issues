import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    text: {
        color: '#fff',
        marginLeft: 20,
        marginTop: 20,
    },
    dataBox: {
        width: '90%',
        backgroundColor: '#fff',
        height: 'auto',
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    dataTitle: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    info: {
        width: '100%',
        marginTop: 10,
        color: 'black',
    },
    data: {
        color: 'green',
        fontWeight: 'bold',
    },
    online: {
        backgroundColor: 'green',
        width: 15,
        height: 15,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 'auto',
    },
    offline: {
        backgroundColor: 'red',
        width: 15,
        height: 15,
        borderRadius: 50,
        marginRight: 10,
        marginLeft: 'auto',
    },
    error: {
        color: 'red',
    },
    button: {
        marginTop: 25,
        height: 40,
        width: 200, 
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    feedbackText: {
        color: 'green',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10
    },
    settingsBox: {
        width: '90%',
        backgroundColor: '#fff',
        height: 'auto',
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    changeButton: {
        width: '50%',
        backgroundColor: '#0e367b',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: '#00114a',
        marginTop: 15,
    },
    changeButtonText: {
        color: '#fff',
    },
    timelineSection: {
        width: '100%',
        minHeight: 250,
        maxHeight: 500,
        marginTop: 10,
    }, 
    timelines: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'lightgray',
        alignItems: 'center',
        width: '90%',
        height: 40,
        margin: 5, 
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    timelinesInfoName: {
        width: '100%',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    changeTimelinesButton: {
        width: 100,
        marginRight: -1,
        backgroundColor: '#0e367b',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    changeTimelinesText: {
        color: '#fff',
    },
    viewButtonText: {
        color: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: 25,
    },
    logo: {
        marginBottom: 0,
        marginTop: 'auto',
        marginRight: 20,
        marginLeft: 'auto',
        width: 250,
        height: 100,
        opacity: 0.8
    },
  });

  export { styles }