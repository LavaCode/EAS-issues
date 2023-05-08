import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Linking, View, Text } from 'react-native';
import { styles } from '../styles/HowStyle';
import { globalStyles } from '../styles/GlobalStyle';
import axios from 'axios';
import settings from '../user_settings/config.json';
import global from '../variables/global';

const url = `${settings.ipAddress}`

function How(props) {
    const [doorStatus, setDoorStatus] = useState('');
    const [sessionStatus, setSessionStatus] = useState('');

    useEffect(() => {
        setDoorStatus(global.doorState);
        getInfo();
        const interval = setInterval(() => {
            getInfo();
          }, global.interval);
          return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        global.doorState = doorStatus
        global.sessionState = sessionStatus
    }, [doorStatus, sessionStatus])

    async function getInfo() {
        try {
            const systemState = await axios.get(`${url}/api/lua?variables=door_state,how_state`);
            setDoorStatus(systemState.data.door_state);
            setSessionStatus(systemState.data.how_state);
        } catch (e) {
            console.error(e);
        }
    }

    async function openUrl(url) {
        await Linking.openURL(url);
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>How</Text>
            </View>
            <View style={styles.controlSection}>
                <TouchableOpacity 
                    style={[styles.button, globalStyles.button]} 
                    onPress={() => openUrl('https://brinks-solutions.my.salesforce.com/')}>
                        <Text style={globalStyles.buttonText}>Open Salesforce</Text>
                </TouchableOpacity>
                <Text style={styles.comment}>Pagina opent in browser na indrukken knop</Text>
            </View>
            <View style={styles.sessionState}>
                <Text style={styles.showState}>Status ruimte: {sessionStatus}</Text>
            </View>

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

export default How;