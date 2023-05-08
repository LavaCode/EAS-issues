import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './screens/Launcher';
import LoginScreen from './screens/Login';
import ControlScreen from './screens/Control';
import HelpScreen from './screens/Help';
import SettingsScreen from './screens/Settings';
import AdvancedScreen from './screens/Advanced';
import HowScreen from './screens/How';
import WhyScreen from './screens/Why';
import WhatScreen from './screens/What';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Launcher">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Controls" component={ControlScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Launcher" component={LaunchScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="How" component={HowScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="What" component={WhatScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Why" component={WhyScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;