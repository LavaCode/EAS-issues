import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    controls: {
        width: '100%',
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    titleControls: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        marginBottom: 5,
    },
    button: {
        margin: 25,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: '#0e367b',
    },
    buttonText: {
        color: '#0e367b',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    note: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 5,
    },
    buttonNote: {
        color: 'gray',
        fontStyle: 'italic',
        fontSize: 14,
    },  
    textNote: {
        color: 'gray',
        fontStyle: 'italic',
        fontSize: 12,
        opacity: 0.7,
        marginTop: 5,
    },
    projectorInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectorInfoSection: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderColor: 'gray',
        borderWidth: 1,
    },  
    projectorInfoTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10
    },
    projectorInfoBox: {
        margin: 60,
        marginTop: 10,
        marginBottom: 40,
        borderRadius: 50,
        backgroundColor: '#0e367b',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
        width: 175,
        height: 65,
        borderWidth: 1,
        borderColor: '#0e367b',
    },
    projectorInfoText: {
        color: 'lightgray',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    projectorControlButton: {
        margin: 10,
        marginTop: 10,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
        width: 175,
        height: 65,
        borderWidth: 1,
        borderColor: '#0e367b',
    },
    curtainControlButton: {
        margin: 15,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20,
        width: 175,
        height: 65,
        borderWidth: 1,
        borderColor: '#0e367b',
    },
    projectorControlText: {
        fontWeight: 'bold',
        color: '#0e367b'
    },
    projectorControlTextDim: {
        opacity: 0.3,
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