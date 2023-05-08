import { StyleSheet } from 'react-native';
import global from '../variables/global';

const globalStyles = StyleSheet.create({
    launchContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global.launchBackgroundColor,
        width: '100%',
        height: '100%',
      },
    container: {
        height: '100%',
        backgroundColor: global.backgroundColor,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: global.headerBackgroundColor,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: global.titleColor,
        marginTop: 20,
        marginBottom: 10,
    },
    backImageContainer: {
        width: 75,
        height: 75,
        backgroundColor: global.tintColorBackgroundBack,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
    },
    backImage: {
        tintColor: global.tintColorBack,
        width: 25,
        height: 25,
    },
    footerImage: {
        tintColor: global.tintColorFooterImage,
        width: 30,
        height: 30,
    },
    button: {
        margin: 15,
        borderRadius: 50,
        backgroundColor: global.buttonColor,
        justifyContent: 'center',
        padding: 20,
        width: '30%',
        maxWidth: 250,
        height: 75,
        borderWidth: 1,
        borderColor: global.buttonBorderColor,
    },
    buttonText: {
        color: global.buttonTextColor,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonActive: {
        backgroundColor: global.buttonActiveColor,
    },
    buttonTextActive: {
        color: global.buttonActiveTextColor,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export { globalStyles }