import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from 'react-navigation/material-bottom-tabs';

import HomeScreen from '../Screen/HomeScreen';
import QuranScreen from '../Screen/QuranScreen';
import Conversation from '../Screen/Conversation';

const ScreenNav = createStackNavigator({
  HomeScreen: HomeScreen,
  QuranScreen: QuranScreen,
  Conversation: Conversation,
});

const tabScreen = {
  HomeScreen: {
    Screen: ScreenNav,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Text>hell</Text>;
      },
    },
  },
  QuranScreen: {
    Screen: QuranScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <ion-icon name="search-outline"></ion-icon>;
      },
    },
  },
  Conversation: {
    Screen: Conversation,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <ion-icon name="search-outline"></ion-icon>;
      },
    },
  },
};
const bottomNav =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreen, {
        //labeled: false,

        activeColor: 'balck',
        shifting: false,

        barStyle: {
          backgroundColor: 'red',
        },
      })
    : createBottomTabNavigator(tabScreen, {
        tabBarOptions: {
          activeTintColor: 'green',
        },
      });
export default createAppContainer(bottomNav);
