import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LoginTeacher from './auth/LoginTeacher';
import LoginUser from './auth/LoginUser';
import RegisterTeacher from './auth/RegisterTeacher';
import RegisterUser from './auth/RegisterUser';

const ConversationLayout = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginTeacher" component={LoginTeacher} />
      <Stack.Screen name="LoginUser" component={LoginUser} />
      <Stack.Screen name="RegisterTeacher" component={RegisterTeacher} />
      <Stack.Screen name="RegisterUser" component={RegisterUser} />
    </Stack.Navigator>
  );
};

export default ConversationLayout;

const styles = StyleSheet.create({});
