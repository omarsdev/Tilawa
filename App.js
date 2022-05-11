import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainBottomTabs from './src/stack/MainBottomTabs';
import { ChatContextProvider } from './src/context/ChatContext';

const App = () => {
  return (
    <ChatContextProvider>
      <NavigationContainer>
        <MainBottomTabs />
      </NavigationContainer>
    </ChatContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
