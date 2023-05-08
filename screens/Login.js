import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/LoginStyle';
import settings from '../user_settings/config.json';
import global from '../variables/global';

function Login(props){
  const [username, setUsername] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pinLength, setPinLength] = useState(0);
  const [userPinData, setUserPinData] = useState('');
  const [placeholder, setPlaceholder] = useState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [reset, setReset] = useState(false);
  const [users, setUsers] = useState({});
  const [userAmount, setUserAmount] = useState(0);

  useEffect(() => {
    if(global.pinLogin) {
      getPin();
    } else if(global.login) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    placeholderLength();
  }, [pinCode]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      }
      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
    }, [])
  );

  async function getPin() {
    try {
      const jsonValue = await AsyncStorage.getItem('pincode')
      const loadedPin = JSON.parse(jsonValue)
      setPinLength(loadedPin.length);
      setPinCode(loadedPin);
    } catch(e) {
      alert(e)
    }
  }

  async function getUsers() {
    try {
      const jsonValue = await AsyncStorage.getItem('users')
      return jsonValue != null ? setUsers(JSON.parse(jsonValue)) : alert('issue: no users found');
    } catch(e) {
      alert(e)
    }
  }

  useEffect(() => {
    const userAmount = Object.keys(users).length; 
    setUserAmount(userAmount);
    {global.debug &&
      console.log(userAmount); //find amount of users
    }
  }, [users])

  async function submit() {
    try {
      if (global.pinLogin) {
        if(userPinData === pinCode) {
          setError(false);
          props.navigation.navigate('Controls');
          setUserPinData('')
        } else {
          setUserPinData('');
          setError(true);
        }
      } else if (!global.pinLogin) {
        for (let i = 1; i <= userAmount; i++) {
          if(username === users[i].username && 
                password === users[i].password) {
            setError(false);
            storeActiveUser(username);
            props.navigation.navigate('Controls');
            setUsername('');
            setPassword('');
            return;
          } else {
            setUsername('');
            setPassword('');
            setError(true);
          }
        }
      }
    } catch(e) {
      alert(e);
    }
  }

  async function storeActiveUser(name) {
    try {      
      await AsyncStorage.setItem('activeUser', name);      
    } catch (e) {
      console.error(e);
    }
  }

  function forgotPassword() {
    setReset(true);
    setTimeout(() => {
      setReset(false)
    }, 2500)
  }

  async function placeholderLength() {
    let sentence = '';

    for(let i = 0; i < pinLength; i++) {
        sentence += '◦'
    }
    {global.debug &&
      console.log(sentence)
    } 
    setPlaceholder(sentence);
  }

  return (  
    <View style={styles.container}>
      <Image
        style={styles.loginImage}
        source={require(`../user_settings/user_logo/logo.png`)}
        />
      <Text style={styles.logo}>{settings.project} Showcontrol</Text>
      {global.pinLogin && placeholder ? 
        <View style={styles.inputPinView} >
          <TextInput  
            secureTextEntry
            style={styles.inputPinText}
            placeholder={placeholder}
            placeholderTextColor='gray'
            value={userPinData}
            onChangeText={(pin) => setUserPinData(pin)}
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            maxLength={pinLength}
            caretHidden={true}
          />
        </View>
      : null }
      {!global.pinLogin && 
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor='gray'
            value={username}
            onChangeText={(text) => setUsername(text)}
            underlineColorAndroid='transparent'
            />
        </View>
      }     
        {!global.pinLogin &&
          <View style={styles.inputView} >  
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..." 
              placeholderTextColor='gray'
              value={password}
              onChangeText={(text) => setPassword(text)}
              underlineColorAndroid="transparent"
              />
          </View>
        }
        <TouchableOpacity style={styles.loginBtn} onPress={submit}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={forgotPassword}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.feedback}>
          {reset && <Text style={styles.reset}>Please ask your supervisor</Text>} 
          {error && <Text style={styles.error}>Invalid credentials! Please try again.</Text>}
        </View>
    </View>
  );
}

export default Login;