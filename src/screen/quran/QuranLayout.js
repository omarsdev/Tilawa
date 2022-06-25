import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuranHome from "./QuranHome"
import QuranSora from "./QuranSora"
import QuranAi from "./QuranAi"
import { QuranContextProvider } from '../../context/QuranContext';

const Stack = createNativeStackNavigator();

const QuranLayout = ({ navigation, route }) => {
  return (
    <QuranContextProvider>
      <Stack.Navigator
        initialRouteName="QuranHome"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="QuranHome" component={QuranHome} />
        <Stack.Screen name="QuranSora" component={QuranSora} />
        <Stack.Screen name="QuranAi" component={QuranAi} />

      </Stack.Navigator>
    </QuranContextProvider>
  )
}

export default QuranLayout