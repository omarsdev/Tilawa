import React, { Fragment, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
  I18nManager,
  SafeAreaView,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainStackContextProvider } from '../context';

import ConversationLayout from '../screen/conversation/ConversationLayout';
import QuranLayout from '../screen/quran/QuranLayout';

import QuranIcon from '../assets/icons/QuranIcon';
import ConversationIcon from '../assets/icons/ConversationIcon';
import colors from '../colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyTabBar = ({ state, descriptors, navigation, screen, setScreen }) => {
  const insets = useSafeAreaInsets();

  return state.routes[0].state?.index === 1 || state.routes[1].state?.index === 1 ? null : (
    <View
      style={[
        styles.tabBottomBar,
        {
          backgroundColor:
            screen === 'ConversationScreen' ? colors.white : colors.dark,
          height: 50,
          marginBottom: insets.bottom,
        },
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          if (screen !== route.name) setScreen(route.name);
          if (route.name === 'QuranScreen') {
            navigation.navigate('QuranScreen', { screen: 'QuranHome' });
          } else navigation.navigate({ name: route.name, merge: true });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            testID={options.tabBarTestID}
            style={styles.iconTabBarBottom}
            key={index}>
            {route.name === 'QuranScreen' ? (
              <QuranIcon isFocus={isFocused} />
            ) : route.name === 'ConversationScreen' ? (
              <ConversationIcon width={25} height={25} isFocus={isFocused} />
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MainBottomTabs = () => {
  const [screen, setScreen] = useState('QuranScreen');
  return (
    <MainStackContextProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.dark,
          },
          tabBarHideOnKeyboard: true,
          keyboardHidesTabBar: true,
        }}
        tabBar={props => (
          <MyTabBar {...props} screen={screen} setScreen={setScreen} />
        )}
        initialRouteName="QuranScreen">
        <Tab.Screen name="QuranScreen" component={QuranLayout} />
        <Tab.Screen name="ConversationScreen" component={ConversationLayout} />
      </Tab.Navigator>
    </MainStackContextProvider>
  );
};

export default MainBottomTabs;

const styles = StyleSheet.create({
  tabBottomBar: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3.5,
    },
    shadowOpacity: 0.09,
    shadowRadius: 1.62,

    elevation: 10,
  },
  iconTabBarBottom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
