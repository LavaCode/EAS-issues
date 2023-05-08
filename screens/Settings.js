import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { styles } from '../styles/SettingsStyle';
import { globalStyles } from '../styles/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import settings from '../user_settings/config.json';
import global from '../variables/global';

const url = `${settings.ipAddress}`

export default function Settings(props) {
    const [ipAddress, setIpAddress] = useState();
    const [deviceIp, setDeviceIp] = useState();
    const [firmwareVersion, setFirmwareVersion] = useState();
    const [lastBoot, setLastBoot] = useState();
    const [reason, setReason] = useState();
    const [online, setOnline] = useState(false);
    const [error, setError] = useState(true);
    const [calibrationState, setCalibrationState] = useState('');
    const [systemState, setSystemState] = useState('');
    const [projectionState, setProjectionState] = useState('');
    const [feedback, setFeedback] = useState('default message');
    const [timelineNumbers, setTimelineNumbers] = useState();

    useEffect(() => {
        getNetworkInfo(); //run once at init
        getData();
        getInfo();
        const interval = setInterval(() => {
            getNetworkInfo(); //check constant
            getInfo();
        }, global.interval);
        return () => clearInterval(interval);
    }, []);

    async function getNetworkInfo() {
        try {
            const result = await axios.get(`${url}/api/system`);
            {global.debug && console.log(result.data)}
            setDeviceIp(result.data.ip_address);
            setFirmwareVersion(result.data.firmware_version);
            setLastBoot(result.data.last_boot_time);
            setReason(result.data.reset_reason);
            setOnline(true);
            setError(false);
        } catch (e) {
            setOnline(false);
            setError(true);
            console.error(e);
        } 
    }

    async function getData() {
        try {
          const jsonValue = await AsyncStorage.getItem('ipAddress')
          setIpAddress(JSON.parse(jsonValue))
          {ipAddress && console.log(ipAddress)}
        } catch(e) {
          alert(e)
        }
      }

    async function changeData(name) {
        try {
            alert(name)
        } catch(e) {
            console.error(e)
        }
    }

    async function getInfo() {
        try { 
            const systemState = await axios.get(`${url}/api/lua?variables=system_state,calibration_state,proj1_state,proj2_state`);
            setCalibrationState(systemState.data.calibration_state);
            setSystemState(systemState.data.system_state);
            setProjection(systemState.data.proj1_state, systemState.data.proj2_state);
        } catch (e) {
            console.error(e);
        }
    }

    function setProjection(a, b) {
        if (a && b === 'on') {
            setProjectionState('on')
        } else {
            setProjectionState('false')
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
                <Text style={globalStyles.title}>SETTINGS</Text>
            </View>
            <View style={styles.dataBox}>
                <Text style={styles.dataTitle}>DEVICE INFORMATION:</Text>
                <View style={[online ? styles.online : styles.offline]}></View>
                { error && <Text style={styles.error}>Er is geen verbinding met Pharos</Text>}
                { error && <Text style={styles.error}>Ingesteld IP is: {settings.ipAddress}</Text>}
                { deviceIp !== undefined && <Text style={styles.info}>IP-adres: <Text style={styles.data}>{deviceIp}</Text></Text>}
                { firmwareVersion !== undefined && <Text style={styles.info}>FW-version: <Text style={styles.data}>{firmwareVersion}</Text></Text>}
                { lastBoot !== undefined && <Text style={styles.info}>Laatste boot: <Text style={styles.data}>{lastBoot}</Text></Text>}
                { reason !== undefined && <Text style={styles.info}>Reden: <Text style={styles.data}>{reason}</Text></Text>}
                { online && global.advancedInformation ? <Text style={styles.info}>Interval: <Text style={styles.data}>{global.interval} ms</Text></Text> : null}
            </View>

            {global.login && 
                <View style={styles.settingsBox}>
                    <Text style={styles.dataTitle}>CUSTOM INFORMATION:</Text>

                    {global.pinLogin ?
                        <TouchableOpacity style={styles.changeButton}><Text style={styles.changeButtonText}>Change pincode</Text></TouchableOpacity>
                    :
                        <View style={styles.default}>
                            <Text style={styles.info}></Text>
                            <TouchableOpacity style={styles.changeButton}><Text style={styles.changeButtonText}>Change userdata</Text></TouchableOpacity>
                        </View>
                    }           
                </View>
            }

            {global.advancedInformation && 
                <View style={styles.settingsBox}>
                    <Text style={styles.dataTitle}>DEVELOPER INFORMATION:</Text>
                    {/* <ScrollView style={styles.timelineSection}>
                        {timelines.map((timeline) => (
                        <View style={styles.timelines} key={timeline.triggerNumber} >
                            <Text style={styles.timelinesInfoName}>{timeline.name}: {timeline.triggerNumber}</Text>
                            <TouchableOpacity 
                                style={styles.changeTimelinesButton}
                                onPress={() => changeData(timeline.name)}>
                                <Text style={styles.changeTimelinesText}>Change</Text>
                        </TouchableOpacity>
                        </View>
                        ))}
                    </ScrollView> */}
                </View>
            }
            {systemState === 'on' && projectionState === 'on' &&
                <View style={styles.settingsBox}>
                    <Text style={styles.dataTitle}>KALIBRATIE:</Text>
                        {calibrationState === 'on' ?
                            <TouchableOpacity 
                                    style={[globalStyles.button, globalStyles.buttonActive]}
                                    onPress={() => fireTrigger(settings.timelineNumbers.calibration)}>
                                <Text style={globalStyles.buttonTextActive}>Kalibratie UIT</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity 
                                style={globalStyles.button}
                                onPress={() => fireTrigger(settings.timelineNumbers.calibration)}>
                                    <Text style={globalStyles.buttonText}>Kalibratie AAN</Text>
                            </TouchableOpacity>
                        }
                </View>
            }

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
