import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { styles } from '../styles/AdvancedStyle';
import { globalStyles } from '../styles/GlobalStyle';
import BlinkButton from '../components/BlinkButton';
import axios from 'axios';
import settings from '../user_settings/config.json';
import global from '../variables/global';

const url = `${settings.ipAddress}`

function Advanced(props) {
    const [presentationState, setPresentationState] = useState('');  
    const [doorState, setDoorState] = useState('');  
    const [curtainState, setCurtainState] = useState('')
    const [proj1State, setProj1State] = useState('');
    const [proj2State, setProj2State] = useState('');
    const [errorProj1, toggleErrorProj1] = useState(true);
    const [errorProj2, toggleErrorProj2] = useState(true);

    useEffect(() => {
        getProj1();
        getProj2();
        getInfo();
        const interval = setInterval(() => {
            getProj1();
            getProj2();
            getInfo();
          }, global.interval);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        global.projector1State = proj1State;
        global.projector2State = proj2State;
    }, [proj1State, proj2State])

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
            const systemState = await axios.get(`${url}/api/lua?variables=presentation_state,door_state,curtain_state`);
            setPresentationState(systemState.data.presentation_state);
            setDoorState(systemState.data.door_state);
            setCurtainState(systemState.data.curtain_state);
        } catch (e) {
            console.error(e);
        }
    }

    async function getProj1() {
        try { 
            const systemState = await axios.get(`${url}/api/lua?variables=proj1_state`);
            setProj1State(systemState.data.proj1_state);
            toggleErrorProj1(false);
        } catch (e) {
            console.error(e);
            toggleErrorProj1(true);
        }
    }

    async function getProj2() {
        try { 
            const systemState = await axios.get(`${url}/api/lua?variables=proj2_state`);
            setProj2State(systemState.data.proj2_state);
            toggleErrorProj2(false);
        } catch (e) {
            console.error(e);
            toggleErrorProj2(true);
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>Advanced</Text>
            </View>
            <Text style={styles.titleControls}>Bediening geavanceerd</Text>
            <View style={styles.controls}>
                <TouchableOpacity 
                        style={presentationState === 'on' ? [styles.button, globalStyles.buttonActive] : styles.button} 
                        onPress={() => fireTrigger(settings.timelineNumbers.presentation, true)}>
                    <Text style={presentationState === 'on' ? globalStyles.buttonTextActive : globalStyles.buttonText}>Showlicht</Text>
                </TouchableOpacity>
                {doorState === 'open' ?
                    <TouchableOpacity 
                            style={[styles.button, globalStyles.buttonActive]} 
                            onPress={() => fireTrigger(settings.timelineNumbers.doorClose, false)}>
                        <Text style={globalStyles.buttonTextActive}>Sluit deur</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => fireTrigger(settings.timelineNumbers.doorOpen, false)}>
                        <Text style={globalStyles.buttonText}>Open deur</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => fireTrigger(settings.timelineNumbers.loadShowPreset, true)}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <View style={styles.note}>
                    <Text style={styles.buttonNote}>Laad presentatiestand</Text>
                    <Text style={styles.buttonNote}>Open/Sluit deur</Text>
                    <Text style={styles.buttonNote}>Zet alles klaar voor tour</Text>
                </View>
                <View style={styles.note}>
                <Text style={styles.textNote}>Let op: het sluiten van de deur duurt altijd even! Wacht rustig af. </Text>
                </View>
            </View>
            <Text style={styles.titleControls}>Bediening projectoren & gordijnen</Text>
            <View style={styles.projectorInfo}>
                <View style={styles.projectorInfoSection}>              
                    <Text style={styles.projectorInfoTitle}>Status projector links:</Text>
                    <View style={styles.projectorInfoBox}>
                        {proj1State === 'cooling' &&
                            <BlinkButton duration={500}>
                                <Text style={styles.projectorInfoText}>Afkoelen...</Text>
                            </BlinkButton>
                        }
                        {proj1State === 'warmup' &&
                            <BlinkButton duration={500}>
                                <Text style={styles.projectorInfoText}>Opwarmen...</Text>
                            </BlinkButton>
                        }
                        {proj1State === 'on' || proj1State === 'off' 
                            ? <Text style={styles.projectorInfoText}>{proj1State}</Text>
                            : null
                        }
                        {errorProj1 && <Text style={styles.projectorInfoText}>offline</Text> }
                        </View>
                    <TouchableOpacity 
                        style={styles.projectorControlButton}
                        onPress={proj1State === 'off' ? (() => fireTrigger(settings.timelineNumbers.projector1on)) : null}>
                        {proj1State === 'off'
                            ?   <Text style={styles.projectorControlText}>Zet projector AAN</Text>
                            :   <Text style={[styles.projectorControlText, styles.projectorControlTextDim]}>Zet projector AAN</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.projectorControlButton}
                        onPress={proj1State === 'on' ? (() => fireTrigger(settings.timelineNumbers.projector1off)) : null}>
                        {proj1State === 'on'
                            ?   <Text style={styles.projectorControlText}>Zet projector UIT</Text>
                            :   <Text style={[styles.projectorControlText, styles.projectorControlTextDim]}>Zet projector UIT</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.projectorInfoSection}> 
                    <Text style={styles.projectorInfoTitle}>Bediening gordijnen:</Text>
                    <TouchableOpacity 
                            style={styles.curtainControlButton}
                            onPress={(() => fireTrigger(settings.timelineNumbers.curtainOpen))}>
                        <Text style={[styles.projectorControlText]}>Gordijn Open</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={styles.curtainControlButton}
                            onPress={(() => fireTrigger(settings.timelineNumbers.curtainStop))}>
                        <Text style={[styles.projectorControlText]}>Gordijn stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                            style={styles.curtainControlButton}
                            onPress={(() => fireTrigger(settings.timelineNumbers.curtainClose))}>
                        <Text style={[styles.projectorControlText]}>Gordijn dicht</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.projectorInfoSection}> 
                    <Text style={styles.projectorInfoTitle}>Status projector rechts:</Text>
                    <View style={styles.projectorInfoBox}>
                        {proj2State === 'cooling' &&
                            <BlinkButton duration={500}>
                                <Text style={styles.projectorInfoText}>Afkoelen...</Text>
                            </BlinkButton>
                        }
                        {proj2State === 'warmup' &&
                            <BlinkButton duration={500}>
                                <Text style={styles.projectorInfoText}>Opwarmen...</Text>
                            </BlinkButton>
                        }
                        {proj2State === 'on' || proj2State === 'off'
                            ? <Text style={styles.projectorInfoText}>{proj2State}</Text>
                            : null
                        }
                        {errorProj2 && <Text style={styles.projectorInfoText}>offline</Text> }
                    </View>
                    <TouchableOpacity 
                        style={styles.projectorControlButton}
                        onPress={proj2State === 'off' ? (() => fireTrigger(settings.timelineNumbers.projector2on)) : null}>
                        {proj2State === 'off'
                            ?   <Text style={styles.projectorControlText}>Zet projector AAN</Text>
                            :   <Text style={[styles.projectorControlText, styles.projectorControlTextDim]}>Zet projector AAN</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.projectorControlButton}
                        onPress={proj2State === 'on' ? (() => fireTrigger(settings.timelineNumbers.projector2off)) : null}>
                        {proj2State === 'on'
                            ?   <Text style={styles.projectorControlText}>Zet projector UIT</Text>
                            :   <Text style={[styles.projectorControlText, styles.projectorControlTextDim]}>Zet projector UIT</Text>
                        }
                    </TouchableOpacity>
                </View>
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
                    // source={require(`../user_settings/user_logo/logo.png`)}
                />
            </View>
        </View>
    )
}

export default Advanced;
