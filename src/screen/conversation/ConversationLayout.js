import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './auth/Login';
import Register from './auth/Register';
import ChatScreen from './chat/ChatScreen';
import TypingScreen from './chat/TypingScreen';
import { useChatContext } from '../../context/ChatContext';

const ConversationLayout = () => {
  const { userTeacherDataMemo, userTeacherTokenMemo } = useChatContext();
  const { userTeacherData } = userTeacherDataMemo;
  const { userTeacherToken } = userTeacherTokenMemo;

  return (
    // <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}>
    //   {!userTeacherData || !userTeacherToken ? (
    //     <>

    //     </>
    //   ) : (
    //     <>
    //       <Stack.Screen name="ChatScreen" component={ChatScreen} />
    //       <Stack.Screen name="TypingScreen" component={TypingScreen} />
    //     </>
    //   )}
    // </Stack.Navigator>
    !userTeacherData || !userTeacherToken ? (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="TypingScreen" component={TypingScreen} />
      </Stack.Navigator>
    )
  );
};

export default ConversationLayout;
