import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { styles } from '../styles/WhyStyle';
import { globalStyles } from '../styles/GlobalStyle';
import BlinkButton from '../components/BlinkButton';
import axios from 'axios';
import settings from '../user_settings/config.json';
import global from '../variables/global';

const url = `${settings.ipAddress}`

function Why(props) {
    const [movieStatus, setMovieStatus] = useState('');
    const [muteStatus, setMuteStatus] = useState('');
    const [doorStatus, setDoorStatus] = useState('');
    const [curtainStatus, setCurtainStatus] = useState('');

    useEffect(() => {
        getInfo();
        const interval = setInterval(() => {
            getInfo();
          }, global.interval);
          return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        global.doorState = doorStatus;
        global.curtainState = curtainStatus;
        global.movieState = movieStatus;
        global.muteState = muteStatus;
    }, [doorStatus, curtainStatus, movieStatus, muteStatus])

    async function getInfo() {
        try {
            const systemState = await axios.get(`${url}/api/lua?variables=door_state,curtain_state,movie_state,mute_state`);
            setDoorStatus(systemState.data.door_state);
            setCurtainStatus(systemState.data.curtain_state);
            setMovieStatus(systemState.data.movie_state);
            setMuteStatus(systemState.data.mute_state);
        } catch(e) {
            console.error(e)
        }
    }

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

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>Why</Text>
            </View>
            <Text style={styles.titleControls}>Bediening film</Text>
            <View style={styles.controls}>
                <TouchableOpacity 
                        style={globalStyles.button} 
                        onPress={() => fireTrigger(settings.timelineNumbers.startMovieNL, true)}>
                    {movieStatus === 'runningNL' 
                        ?   <BlinkButton duration={500}>
                                <Text style={globalStyles.buttonText}>Film speelt</Text>
                            </BlinkButton>
                        :   <Text style={globalStyles.buttonText}>Start introductie 🇳🇱</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity 
                        style={globalStyles.button} 
                        onPress={() => fireTrigger(settings.timelineNumbers.startMovieEN, true)}>
                    {movieStatus === 'runningEN' 
                        ?   <BlinkButton duration={500}>
                                <Text style={globalStyles.buttonText}>Film speelt</Text>
                            </BlinkButton>   
                        :       <Text style={globalStyles.buttonText}>Start introductie 🇬🇧</Text>
                    }
                </TouchableOpacity>
                {movieStatus === 'runningNL' || movieStatus === 'runningEN' ?
                    <View style={styles.controls}>
                        <TouchableOpacity 
                                style={[globalStyles.button, styles.buttonStop]} 
                                onPress={() => fireTrigger(settings.timelineNumbers.stopMovie, true)}>
                            <Text style={styles.buttonStopText}>Stop introductiefilm</Text>
                        </TouchableOpacity>
                        {muteStatus === 'muted' ?
                            <TouchableOpacity 
                                    style={[globalStyles.button, styles.buttonMute]} 
                                    onPress={() => fireTrigger(settings.timelineNumbers.unmuteMovie, true)}>
                                <Text style={styles.buttonMuteText}>Unmute film</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity 
                                    style={[globalStyles.button, styles.buttonMute]} 
                                    onPress={() => fireTrigger(settings.timelineNumbers.muteMovie, true)}>
                                <Text style={styles.buttonMuteText}>Mute film</Text>
                            </TouchableOpacity> 
                        }                           
                    </View>
                    :
                    <View style={styles.movieContainer}></View>
                }
            </View>
            <Text style={styles.titleControls}>Bediening elementen</Text>
            <View style={styles.controls}>
                <TouchableOpacity 
                        style={doorStatus === 'open' ? [globalStyles.button, globalStyles.buttonActive] : globalStyles.button} 
                        onPress={() => fireTrigger(settings.timelineNumbers.doorOpen, true)}>
                    <Text style={doorStatus === 'open' ? globalStyles.buttonTextActive : globalStyles.buttonText}>Deur 'How' open</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                        style={doorStatus === 'closed' ? [globalStyles.button, globalStyles.buttonActive] : globalStyles.button} 
                        onPress={() => fireTrigger(settings.timelineNumbers.doorClose, false)}>
                    <Text style={doorStatus === 'closed' ? globalStyles.buttonTextActive : globalStyles.buttonText}>Deur 'How' dicht</Text>
                </TouchableOpacity>
                <View style={styles.controlsWide    }>
                    <TouchableOpacity 
                            style={curtainStatus === 'open' ? [globalStyles.button, globalStyles.buttonActive] : globalStyles.button} 
                            onPress={() => fireTrigger(settings.timelineNumbers.curtainOpen, true)}>
                        <Text style={curtainStatus === 'open' ? globalStyles.buttonTextActive : globalStyles.buttonText}>Gordijn open</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={curtainStatus === 'stopped' ? [globalStyles.button, globalStyles.buttonActive] : globalStyles.button} 
                            onPress={() => fireTrigger(settings.timelineNumbers.curtainStop, true)}>
                        <Text style={curtainStatus === 'stopped' ? globalStyles.buttonTextActive : globalStyles.buttonText}>Gordijn stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={curtainStatus === 'closed' ? [globalStyles.button, globalStyles.buttonActive] : globalStyles.button} 
                            onPress={() => fireTrigger(settings.timelineNumbers.curtainClose, true)}>
                        <Text style={curtainStatus === 'closed' ? globalStyles.buttonTextActive : globalStyles.buttonText}>Gordijn dicht</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.noteSection}>
                <Text style={styles.notes}>Let op: het sluiten van de deur duurt even, wacht rustig af.</Text>
                <Text style={styles.notes}>Indien de handbediening word gebruikt wordt dat hier niet weergegeven</Text>
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

export default Why;