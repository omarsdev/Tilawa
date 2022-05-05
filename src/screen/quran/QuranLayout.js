import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuranHome from "./QuranHome"
import QuranSora from "./QuranSora"

const Stack = createNativeStackNavigator();

const QuranLayout = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      initialRouteName="QuranHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="QuranHome" component={QuranHome} />
      <Stack.Screen name="QuranSora" component={QuranSora} />

    </Stack.Navigator>
  )
}

export default QuranLayout