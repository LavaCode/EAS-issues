import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import { styles } from '../styles/LaunchStyle';
import { globalStyles } from '../styles/GlobalStyle';
import axios from 'axios';
import global from '../variables/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import settings from '../user_settings/config';

const url = `${settings.ipAddress}`

function LaunchScreen(props) {
  const [loading, toggleLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('');
  const [worklightStatus, setWorklightStatus] = useState('');

  useEffect(() => {
    loadData();
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      if(global.login) {
      props.navigation.navigate(global.bootRoute); 
      } else {
        props.navigation.navigate(global.alternativeRoute);
      }
    }, global.bootTime);  
  }, [loading])

  // async function setTimelines(name, number) {
  //   const triggerNumber = JSON.stringify(number); 
  //   await AsyncStorage.setItem(name, triggerNumber);
  // }

  async function loadData() {
    try {
      const userData = JSON.stringify(settings.users)
      const pinData = JSON.stringify(settings.pin)
      const ipData = JSON.stringify(settings.ipAddress)
      
      await AsyncStorage.setItem('pincode', pinData);
      await AsyncStorage.setItem('users', userData);
      await AsyncStorage.setItem('ipAddress', ipData);

      // timelines.map((timeline) => {
      //   setTimelines(timeline.name, timeline.triggerNumber)
      // })

      const systemState = await axios.get(`${url}/api/lua?variables=system_state, worklight_state`);
      setSystemStatus(systemState.data.system_state);
      setWorklightStatus(systemState.data.worklight_state);

      global.systemState = worklightStatus;
      global.systemState = systemStatus;

      toggleLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={globalStyles.launchContainer}>
      <ActivityIndicator syle={styles.loader} color='black' size='large'/>
      <Text style={styles.text}>Bezig met opstarten...</Text>
    </View>
  );
}

export default LaunchScreen;