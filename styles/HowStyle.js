import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    titleControls: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 75,
        marginBottom: 25,
    },
    controlSection: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    button: {
        marginTop: 25
    },
    comment: {
        fontStyle: 'italic',
        fontSize: 12,
    },
    sessionState: {
        backgroundColor: 'lightgray',
        width: '15%',
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 50,
        justifyContent: 'center',
    },
    showState: {
        marginLeft: 10,
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
        paddingBottom: 10,
        paddingTop: 10,
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