import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: 'rgb(251, 251, 254)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginImage: {
      width: '80%',
      maxWidth: 500,
      height: 125,
    },
    logo: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#006ba1',
      padding: '10%',
      textAlign: 'center',
    },
    inputView: {
      width: '75%',
      maxWidth: 450,
      backgroundColor: 'lightgray',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 25,
    },
    inputPinView: {
      width: 175,
      backgroundColor: 'lightgray',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 25,
    },
    inputText: {
      height: 50,
      color: 'black',
      width: '100%',
    },
    inputPinText: {
      fontSize: 20,
      height: 50,
      width: '100%',
      color: 'black',
      textAlign: 'center',
    },
    loginBtn: {
      width: '75%',
      maxWidth: 450,
      backgroundColor: 'gray',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginBottom: 10
    },
    loginText:{
      color: 'black'
    },
    forgot: {
      color: '#001530',
      fontSize: 11,
      textAlign: 'center',
    },
    feedback: {
      marginTop: 50,
      width: 350,
      height: 100,
    }, 
    error: {
      color: 'red',
      textAlign: 'center',
    },
    reset: {
      color: 'gray',
      fontSize: 11,
      fontWeight: 'bold',
      textAlign: 'center',
    }
  });

  export { styles }