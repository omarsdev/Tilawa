import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import uuid from "react-native-uuid"

import { AxiosInstance } from '../../../api/AxiosInstance';
import { useChatContext } from '../../../context/ChatContext';

import colors from '../../../colors';

import ChatTextInput from '../components/ChatTextInput';
import ChatHeader from '../components/ChatHeader';
import MessagesList from '../components/MessagesList';
import { KeyboardShift } from '../../../utils/KeyboardShift';

const TypingScreen = ({ route, navigation }) => {
  const { userTeacherTokenMemo, receiveMessageMemo } = useChatContext();

  const { userTeacherToken } = userTeacherTokenMemo;
  const { receiveMessage, setReceiveMessage } = receiveMessageMemo;

  let { chatId, userTeacherDInfo } = route.params;

  if (!chatId) chatId = uuid.v4()

  const [allMessagesInChat, setAllMessagesInChat] = useState(null)

  const handleNewSendMessage = (messageData) => {
    const newData = { ...allMessagesInChat };
    newData.Messages.unshift(messageData)
    setAllMessagesInChat(newData)
  }


  useEffect(() => {
    if (!receiveMessage || !allMessagesInChat) return
    const valueFromIdType = userTeacherToken.type === "user" ? "fromTeacherId" : "fromUserId";
    if (receiveMessage[valueFromIdType] === userTeacherDInfo.id) handleNewSendMessage(receiveMessage)
    return () => {
      setReceiveMessage(null)
    }
  }, [receiveMessage])

  const goBackHandler = () => navigation.goBack();

  const getAllMyMessages = async () => {
    await AxiosInstance.get(`message?${userTeacherToken.type === "user" ? "teacher" : 'user'}=${userTeacherDInfo.id}`).then((res) => {
      setAllMessagesInChat(res.data.data || { id: uuid.v4(), Teacher: { ...userTeacherDInfo }, Messages: [] })
    }).catch((err) => {
    })
  }

  useEffect(() => {
    if (!userTeacherDInfo) return;
    getAllMyMessages();
    return () => {
      setAllMessagesInChat(null)
    }
  }, [userTeacherDInfo])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardShift>
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

        {allMessagesInChat ? (
          <Fragment>
            <MessagesList id={userTeacherDInfo.id} messages={allMessagesInChat} setAllMessagesInChat={setAllMessagesInChat} />
            <View style={{ height: 70 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ChatTextInput id={userTeacherDInfo.id} chatId={chatId} handleNewSendMessage={handleNewSendMessage} />
              </View>
            </View>
          </Fragment>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={colors.black} />
          </View>
        )}
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default TypingScreen;

const styles = StyleSheet.create({});
