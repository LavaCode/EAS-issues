import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        marginLeft: 20,
        marginTop: 20,
    },
    backImage: {
        tintColor: '#fff',
        width: 25,
        height: 25,
        marginLeft: 15,
    },
    helpBox: {
        width: '90%',
        backgroundColor: '#fff',
        height: 'auto',
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        alignItems: 'center',
    },
    supportBox: {
        width: '90%',
        backgroundColor: '#fff',
        height: 'auto',
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        alignItems: 'center',
    },
    makerInfo: {
        width: '90%',
        backgroundColor: '#fff',
        height: 'auto',
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        alignItems: 'center',
    },
    dataTitle: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    info: {
        fontWeight: 'normal',
    },
    infoBold: {
        fontWeight: 'bold',
    },
    help: {
        marginLeft: 20,
        width: '100%',
    },  
    notes: {
        marginLeft: 50,
        marginTop: 15,
        width: '100%',
        fontStyle: 'italic',
    },
    button: {
        width: 250,
        height: 100,
        backgroundColor: 'red',
        color: '#fff',
    },
    developerInfo: {
        width: '20%',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    developerText: {
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic',
    },
    developerImage: {
        tintColor: 'gray',
        resizeMode: 'stretch',
        height: 100,
        width: 100,
        marginTop: 15
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
    exitApp: {
        height: 75,
        alignItems: 'center',
        marginLeft: 'auto',
        marginTop: '-9%',
        marginRight: 75,
    },
    exitAppButton: {
        width: 75,
        height: 75,
        backgroundColor: 'darkred',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    exitAppText: {
        color: '#fff',
        fontSize: 12,
    },
  });

  export { styles }