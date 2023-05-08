import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, View, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/ControlStyle';
import { globalStyles } from '../styles/GlobalStyle';
import BlinkButton from '../components/BlinkButton';
import axios from 'axios';
import settings from '../user_settings/config.json';
import global from '../variables/global';

const url = `${settings.ipAddress}`

function Control(props) {
  const [showResults, setShowResults] = useState(false);
  const [systemStatus, setSystemStatus] = useState('');
  const [worklightStatus, setWorklightStatus] = useState('');
  const [doorStatus, setDoorStatus] = useState('');
  const [curtainStatus, setCurtainStatus] = useState('');
  const [movieStatus, setMovieStatus] = useState('');
  const [muteStatus, setMuteStatus] = useState('');
  const [username, setUsername] = useState('');
  const [online, toggleOnline] = useState(false);
  
  useEffect(() => {
    getData();
    getInfo();
    checkConnection();
    const interval = setInterval(() => {
      getInfo();
      checkConnection();
    }, global.interval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    global.worklightState = worklightStatus;
    global.systemState = systemStatus;
    global.doorState = doorStatus;
    global.curtainState = curtainStatus;
    global.movieState = movieStatus;
    global.muteState = muteStatus;
  }, [systemStatus]);

  async function getData() {
    try {
      const value = await AsyncStorage.getItem('activeUser')
      if(value !== null) {
        setUsername(value)
      } else {
        setUsername('UNKNOWN')
      }
    } catch(e) {
        console.error(e)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );
  
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
    }, [])
  );

  async function fireTrigger(num, conditions) { 
    try {
      await axios.post(`${url}/api/trigger`, 
        {
          num: num,
          conditions: conditions
         })
    } catch(e) {
      console.error(e)
      alert('Er is iets mis gegaan! Check de status van Pharos')
    }
  }

  async function openUrl(url) {
    await Linking.openURL(url);
  }

  async function getInfo() {
    try {
      const systemState = await axios.get(`${url}/api/lua?variables=worklight_state,system_state,door_state,curtain_state,movie_state,mute_state`);
      setSystemStatus(systemState.data.system_state);
      setWorklightStatus(systemState.data.worklight_state);
      setDoorStatus(systemState.data.door_state);
      setCurtainStatus(systemState.data.curtain_state);
      setMovieStatus(systemState.data.movie_state);
      setMuteStatus(systemState.data.mute_state);
      {global.debug && console.log(systemState)}
      setShowResults(true);  
    } catch(e) {
      setShowResults(false);  
      console.error(e);
    }
  }
  async function checkConnection() {
    try {
      const result = await axios.get(`${url}/api/controller`);
      toggleOnline(result.data.controllers[0].online);
    } catch(e) {
      toggleOnline(false);
      console.error(e);
    }
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>{settings.project} Controls </Text>
      </View>
        {global.fakeDevice || online ?
          <View style={styles.controls}>
            <TouchableOpacity 
              style={[globalStyles.button, styles.buttonStart]} 
              onPress={systemStatus === 'off' ? () => fireTrigger(settings.timelineNumbers.startSystem, true) : null}>
              {systemStatus === 'off' && <Text style={[globalStyles.buttonText, {fontWeight: 'bold'}]}>Start Systeem</Text>}
              {systemStatus === 'on' || systemStatus === 'stopping'
                ? <Text style={[globalStyles.buttonText, styles.buttonTextDim]}>Start Systeem</Text> 
                : null
              }
              {systemStatus === 'booting' && 
                <BlinkButton duration={500}>
                  <Text style={globalStyles.buttonText}>Start Systeem</Text>
                </BlinkButton>
              }
            </TouchableOpacity>
            <TouchableOpacity 
              style={[globalStyles.button, styles.buttonStop]} 
              onPress={systemStatus === 'on' ? () => fireTrigger(settings.timelineNumbers.stopSystem, true) : null}>
              {systemStatus === 'off' || systemStatus === 'booting'
                ? <Text style={[globalStyles.buttonText, styles.buttonTextDim]}>Stop Systeem</Text> 
                : null
              }
              {systemStatus === 'on' && <Text style={[globalStyles.buttonText, {fontWeight: 'bold'}]}>Stop Systeem</Text>}
              {systemStatus === 'stopping' && 
                <BlinkButton duration={500}>
                  <Text style={globalStyles.buttonText}>Stop Systeem</Text>
                </BlinkButton>
              }
            </TouchableOpacity>
            <TouchableOpacity 
              style={globalStyles.button} 
              onPress={() => props.navigation.navigate('Advanced')}>
              <Text style={globalStyles.buttonText}>Geavanceerd</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={globalStyles.button} 
              onPress={() => fireTrigger(settings.timelineNumbers.worklight, true)}>
            { worklightStatus === 'on' 
              ? <Text style={globalStyles.buttonText}>Zet werklicht UIT</Text>
              : <Text style={globalStyles.buttonText}>Zet werklicht AAN</Text>
            }
            </TouchableOpacity>
          </View>
        : null }
        <View style={styles.infoBox}>
        { showResults && online 
          ? <Text style={styles.info}>
            <Text style={{fontWeight: 'bold'}}>System status: </Text>{systemStatus} {'\n'}
            <Text style={{fontWeight: 'bold'}}>Worklight status: </Text>{worklightStatus} {'\n'}</Text>
          : <Text style={[styles.info, styles.infoError]}>
                Geen data om weer te geven{'\n'}
                Vermoedelijk is er geen verbinding met Pharos{'\n'}
                Controleer of uw WiFi-verbinding juist is ingesteld.{'\n'}
                Bij blijvende problemen, herstart de app en contact support
              </Text>                                                           
          }
      </View>
      {systemStatus === 'on' || global.fakeDevice ?
        <View style={styles.areaControls}>
          <TouchableOpacity 
            style={styles.areaButton} 
            onPress={() => props.navigation.navigate('Why')}>
            <Text style={styles.areaButtonText}>Why</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.areaButton} 
            onPress={() => props.navigation.navigate('How')}>
            <Text style={styles.areaButtonText}>How</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.areaButton} 
            onPress={() => props.navigation.navigate('What')}>
            <Text style={styles.areaButtonText}>What</Text>
          </TouchableOpacity>
        </View>
      : null}
  
        <View style={!global.pinLogin && global.login ? styles.footer : [styles.footer, styles.loweredFooter]}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
            <View style={styles.footerTouchArea}>
              <Image
                style={globalStyles.footerImage}
                source={require('../assets/app/icons/settings.png')}
                />
            </View>
          </TouchableOpacity>
          {global.login 
            ? <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <View style={styles.footerTouchArea}>
                  <Image
                    style={globalStyles.footerImage}
                    source={require('../assets/app/icons/log_off.png')}
                    />
                </View>
              </TouchableOpacity>
            : <Image
                style={styles.footerLogo}
                source={require('../user_settings/user_logo/logo.png')}
                />
            }
          <TouchableOpacity onPress={() => props.navigation.navigate('Help')}>
            <View style={styles.footerTouchArea}>
              <Image
                style={globalStyles.footerImage}
                source={require('../assets/app/icons/help.png')}
                />
            </View>
          </TouchableOpacity>
        </View>
      {!global.pinLogin && global.login && <Text style={styles.footerText}>Active user: <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{username}</Text></Text>} 
    </View>
  );
}

export default Control;