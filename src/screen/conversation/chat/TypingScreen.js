import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../colors';
import ChatTextInput from './ChatTextInput';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList ';
const TypingScreen = ({ navigation }) => {

  const goBackHandler = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <ChatHeader goBackHandler={goBackHandler} />

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 0.6,
          width: '90%',
          alignSelf: 'center',
        }}
      />

      <MessagesList />
      <View style={{ flex: 0.2 }}>
        <ChatTextInput />
      </View>
    </SafeAreaView>
  );
};

export default TypingScreen;

const styles = StyleSheet.create({});
