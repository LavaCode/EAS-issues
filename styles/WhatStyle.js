import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    controls: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleControls: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        marginBottom: 15,
    },
    subTitleControls: {
        marginTop: 50,
    },
    sessionState: {
        backgroundColor: 'lightgray',
        width: '15%',
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 75,
        justifyContent: 'center',
    },
    showState: {
        marginLeft: 10,
    },
    whatControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '65%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    whatButton: {
        maxMargin: 65,
        marginTop: 20,
        borderRadius: 100,
        backgroundColor: 'white',
        border: '1.5px solid #0e367b',
        justifyContent: 'center',  
        alignItems: 'center',
        padding: 20,
        width: 125,
        maxWidth: 250,
        height: 125,
    },
    whatButtonText: {
        color: '#0e367b',
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
    backImageContainer: {
        width: 75,
        height: 75,
        backgroundColor: '#0e367b',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
    },
    backImage: {
        tintColor: '#fff',
        width: 25,
        height: 25,
    },
  });

  export { styles }