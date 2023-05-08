import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Linking, Image, View, Text } from 'react-native';
import { styles } from '../styles/WhatStyle';
import { globalStyles } from '../styles/GlobalStyle';
import axios from 'axios';
import settings from '../user_settings/config.json';
import global from '../variables/global';

const url = `${settings.ipAddress}`

function What(props) {
    const [whatState, setWhatState] = useState('');
    const [howState, setHowState] = useState('');
    const [showRoomState, setShowRoomState] = useState('');
    
    useEffect(() => {
        getInfo();
        const interval = setInterval(() => {
            getInfo();
          }, global.interval);
          return () => 
            clearInterval(interval);
    }, [])

    useEffect(() => {
        global.whatState = whatState;
    }, [whatState])

    async function fireTrigger(num, conditions) { 
        try {
          await axios.post(`${url}/api/trigger` , 
            {
              num: num,
              conditions: conditions
             })
        } catch(e) {
          console.error(e)
        }
      }

    async function getInfo() {
        try {
            const systemState = await axios.get(`${url}/api/lua?variables=what_state,how_state,showroom_state`); //add vault_state to Pharos and app to keep track of state of vault
            setWhatState(systemState.data.what_state);
            setHowState(systemState.data.how_state);
            setShowRoomState(systemState.data.showroom_state)
        } catch(e) {
            console.error(e)
        }
    }

    async function openUrl(url) {
        await Linking.openURL(url);
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>What</Text>
            </View>
            <Text style={styles.titleControls}>Bediening verlichting</Text>
            <View style={styles.controls}>
                {howState === 'inactive' && 
                    <>
                        {whatState === 'demo' || whatState == 'recap' ?
                            <TouchableOpacity 
                                    style={[globalStyles.button, globalStyles.buttonActive]} 
                                    >
                                <Text style={globalStyles.buttonTextActive}>Vault is actief...</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                    style={globalStyles.button} 
                                    onPress={() => fireTrigger(settings.timelineNumbers.lightWhatDemo, true)}>
                                <Text style={globalStyles.buttonText}>Start Vault</Text>
                            </TouchableOpacity>
                        }
                    </>
                }
                {showRoomState === 'on' ?
                    <TouchableOpacity   
                            style={[globalStyles.button, globalStyles.buttonActive]} 
                            onPress={() => fireTrigger(settings.timelineNumbers.showroomOff, true)}>
                        <Text style={globalStyles.buttonTextActive}>Showroom UIT</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity 
                            style={globalStyles.button} 
                            onPress={() => fireTrigger(settings.timelineNumbers.showroomOn, true)}>
                        <Text style={globalStyles.buttonText}>Showroom AAN</Text>
                    </TouchableOpacity>
                }
            </View>
            <Text style={[styles.titleControls, styles.subTitleControls]}>Bediening kluis</Text>
            <View style={styles.whatControls}>
                <TouchableOpacity 
                    style={globalStyles.button} 
                    onPress={() => openUrl('https://douzvzgdqlo0b.cloudfront.net/api/session/standalone-vault?locale=nl&location=Utrecht')}>
                    <Text style={globalStyles.buttonText}>Start NL 🇳🇱</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity 
                    style={globalStyles.button} 
                    onPress={() => fireTrigger(settings.timelineNumbers.resetVault)}>
                    <Text style={globalStyles.buttonText}>Reset kluis</Text>
                </TouchableOpacity> */}
                <TouchableOpacity 
                    style={globalStyles.button} 
                    onPress={() => openUrl('https://douzvzgdqlo0b.cloudfront.net/api/session/standalone-vault?locale=en&location=Utrecht')}>
                    <Text style={globalStyles.buttonText}>Start EN 🇬🇧</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.sessionState}>
                <Text style={styles.showState}>Status ruimte: {whatState}</Text>
            </View> */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Controls')}>
                    <View style={globalStyles.backImageContainer}>
                        <Image
                            style={globalStyles.backImage}
                            source={require('../assets/app/icons/back.png')}
                        />
                    </View>
                </TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require(`../user_settings/user_logo/logo.png`)}
                />
            </View>
        </View>
    )
}

export default What;
