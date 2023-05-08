import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    controls: {
        width: '100%',
        maxWidth: 750,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    buttonStart: {
    },
    buttonStop: {
    },
    buttonInactive: {
        backgroundColor: 'red',
    },
    buttonActive: {
        backgroundColor: 'green',
    },
    buttonTextDim: {
        opacity: 0.3,
    },
    infoBox: {
        width: '40%',
        height: 100,
        backgroundColor: 'lightgray',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        marginTop: 10,
    },
    info: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        height: '100%',
        width: '100%',
        marginTop: 30,
    },
    infoError: {
        color: 'red',
        marginTop: 0,
    },
    areaControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    areaButton: {
        maxMargin: 65,
        marginTop: 60,
        borderRadius: 100,
        backgroundColor: '#0e367b',
        justifyContent: 'center',  
        alignItems: 'center',
        padding: 20,
        width: 115,
        maxWidth: 250,
        height: 115,
    },
    areaButtonText: {
        color: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 50, 
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: 75,
    },
    loweredFooter: {
        marginBottom: 35,
    },
    footerLogo: {
        width: 200,
        height: 40,
        opacity: 0.4,
    },
    footerText: {
        color: '#0e367b',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 15,
    },
    footerTouchArea: {
        padding: 15
    },
  });

  export { styles }