import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import QuranScreen from '../screen/quran/QuranScreen';
import ConversationScreen from '../screen/conversation/ConversationScreen';

const Tab = createBottomTabNavigator();

const MainBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="QuranScreen" component={QuranScreen} />
      <Tab.Screen name="ConversationScreen" component={ConversationScreen} />
    </Tab.Navigator>
  );
}

export default MainBottomTabs;