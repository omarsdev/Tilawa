import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screen/HomeScreen';
import Quran from '../Screen/Quran';
import Chat from '../Screen/Chat';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Quran" component={Quran} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
function ScreenNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Homepage" component={HomeScreen} />
      <Tab.Screen name="Quran" component={Quran} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}

export default ScreenNavigator;
