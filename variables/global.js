/* DEVELOPER VARIABLES */
module.exports = {
    //advanced:
    appVersion: '1.0',
    interval: 500, //take notice: minimum is 100.
    
    //basic:
    debug: false,
    login: false,
    pinLogin: false, 
    bootRoute: 'Login', 
    alternativeRoute: 'Controls', 
    bootTime: 1000,
    exitAppFunctionality: false,
    advancedInformation: false,
    language: 'nl', 
    fakeDevice: true,

    //show related:
    systemState: null, 
    worklightState: null,
    curtainState: null,
    doorState: null,
    movieState: null,
    muteState: null,
    sessionState: null,
    projector1State: null,
    projector2State: null,
    howState: null,
    whatState: null,

    //Common styling: 
    backgroundColor: '#e6ecf2',
    headerBackgroundColor: '#0e367b',
    launchBackgroundColor: '#006ba1',
    titleColor: '#fff',
    buttonColor: '#fff',
    buttonBorderColor: '#0e367b',
    buttonTextColor: '#0e367b',
    buttonActiveColor: '#0e367b',
    buttonActiveTextColor: '#fff',
    tintColorBack: '#fff',
    tintColorBackgroundBack: '#0e367b',
    tintColorFooterImage: '#0e367b'
};

/*  *** NOTES ***  */
/// debug = debug mode (exta logs in app) when developing in IDE or browser.
/// login = enable/disable login screen; if true; there is a login (default method is: username/password)
/// pinLogin = if you want a login with PIN instead of username/password
/// bootRoute = where screen goes after login
/// alternativeRoute = the route you want to go if login is disabled
/// bootTime = speed of booting -- duration of launcher.. 
/// exitAppFunctionality = If you want to close the app within the app
/// advancedInformation = show detailed info of timelines
/// language = (default) language of app
/// fakeDevice = '(Almost) like there is a Pharos Device connected' - for testing/debugging/demonstration purpose

/*  *** ADVANCED *** */
/// developer only variables - only IF necessary change this
/// interval = This is the amount of polling to the controller

/*  *** SHOW RELATED *** */
/// define all show-related states of the project and keep track of them here.

/*  *** COMMON STYLING *** */
/// Basic styling for a quick setup / quick change of certain elements which are mostly used.

/*  *** EXTRA *** */
/// orientation = define this in app.json (auto, portrait or landscape)
/// username, password and PIN = define this in the config.json
