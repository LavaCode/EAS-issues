import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    controls: {
        width: '100%',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    controlsWide: {
        width: '150%',
        maxWidth: 1000,
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
    },
    buttonStop: {
        backgroundColor: '#c93232',
        borderColor: 'red',
    },
    buttonMute: {
        backgroundColor: '#0e367b',
        borderColor: 'black',
    },
    buttonStopText: {
        color: '#fff',
        textAlign: 'center',
    },
    buttonMuteText: {
        color: '#fff',
        textAlign: 'center',
    },
    movieContainer: {
        margin: 25,
        justifyContent: 'center',
        padding: 20,
        width: '50%',
        maxWidth: 250,
        height: 75,
    },
    noteSection: {
        marginTop: 30,
    },
    notes: {
        color: '#0e367b',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 12,
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