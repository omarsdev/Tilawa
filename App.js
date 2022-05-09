import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainBottomTabs from './src/stack/MainBottomTabs';

const App = () => {
  return (
    <NavigationContainer>
      <MainBottomTabs />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
