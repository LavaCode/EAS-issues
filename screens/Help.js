import React, { useEffect, useState } from 'react';
import { Alert, Image, TouchableOpacity, TextInput, View, Text, BackHandler } from 'react-native';
import { styles } from '../styles/HelpStyle';
import { globalStyles } from '../styles/GlobalStyle';
import settings from '../user_settings/config.json';
import system from '../system/about.json';
import global from '../variables/global'
import text from '../system/text.json';

export default function Help(props) {
    const [feedback, setFeedback] = useState();

    function exitApp() {
        Alert.alert(
            "Are you sure?",
            "Use wisely: We would advise you to make sure the system is OFF",
            [
                {
                    text: "NO",
                    style: "cancel"
                },
                {   text: "YES", onPress: () => {BackHandler.exitApp()}},
            ]
        )
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}>HELP</Text>
            </View>
            <View style={styles.helpBox}>
                <Text style={styles.dataTitle}>HELP:</Text>
                {global.language === 'nl'
                ?   <>
                        <Text style={styles.help}>{text.help.instructions.nl}</Text>
                        <Text style={styles.notes}>{text.help.notes.nl}</Text>
                    </>
                :   <>
                        <Text style={styles.help}>{text.help.instructions.en}</Text>
                        <Text style={styles.notes}>{text.help.notes.en}</Text>
                    </>
                }
            </View>
            <View style={styles.supportBox}>
                <Text style={styles.dataTitle}>SUPPORT:</Text>
                <Text style={styles.infoBold}>Email: <Text style={styles.info}>{settings.support.contact.email}</Text></Text>
                <Text style={styles.infoBold}>Telephone: <Text style={styles.info}>{settings.support.contact.phone}</Text></Text>
            </View>
            <View style={styles.makerInfo}>
                <Text style={styles.dataTitle}>ABOUT:</Text>
                <Text style={styles.infoBold}>Author: <Text style={styles.info}>{system.creator.author}</Text></Text>
                <Text style={styles.infoBold}>Publish date: <Text style={styles.info}>{system.creator.publishDate}</Text></Text>
                <Text style={styles.infoBold}>App version: <Text style={styles.info}>{global.appVersion}</Text></Text>
            </View>
            <View style={styles.developerInfo}>
                <Text style={styles.developerText}>Developed by:</Text>
                <Image
                    style={styles.developerImage}
                    source={require(`../assets/app/support.png`)}
                />
            </View>
            {global.exitAppFunctionality &&
            <View style={styles.exitApp}>
                <TouchableOpacity onPress={exitApp}>
                    <View style={styles.exitAppButton}>
                        <Text style={styles.exitAppText}>EXIT APP</Text>
                    </View>
                </TouchableOpacity>
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
