import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';

import { AxiosInstance } from '../../../api/AxiosInstance';
import { useChatContext } from '../../../context/ChatContext';

import colors from '../../../colors';

import ChatTextInput from '../components/ChatTextInput';
import ChatHeader from '../components/ChatHeader';
import MessagesList from '../components/MessagesList ';

const TypingScreen = ({ route, navigation }) => {
  const { userTeacherToken } = useChatContext();
  const { chatId, userTeacherDInfo } = route.params;

  const [messages, setMessages] = useState(null)

  const goBackHandler = () => navigation.goBack();

  useEffect(() => {
    if (!chatId) return
    const getAllMyMessages = async () => {
      await AxiosInstance.get(`message?${userTeacherToken.type === "user" ? "teacher" : 'user'}=${userTeacherDInfo.id}`).then((res) => {
        setMessages(res.data.data.Messages)
      }).catch((err) => {

      })
    }
    getAllMyMessages();
  }, [chatId, userTeacherDInfo])

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

      {messages ? (
        <Fragment>
          <MessagesList messages={messages} />
          <View style={{ flex: 0.2 }}>
            <ChatTextInput />
          </View>
        </Fragment>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={colors.black} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default TypingScreen;

const styles = StyleSheet.create({});
