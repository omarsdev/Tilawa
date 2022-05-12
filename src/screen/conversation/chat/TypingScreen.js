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
import ChatTextInput from '../components/ChatTextInput';
import ChatHeader from '../components/ChatHeader';
import MessagesList from '../components/MessagesList ';
const TypingScreen = ({ route, navigation }) => {
  const { chatId, userTeacherDInfo } = route.params

  const goBackHandler = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <ChatHeader goBackHandler={goBackHandler} userTeacherDInfo={userTeacherDInfo} />

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
