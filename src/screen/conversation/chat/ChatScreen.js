import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import uuid from "react-native-uuid"
import moment from 'moment';

import colors from '../../../colors';
import { useChatContext } from '../../../context/ChatContext';
import UserChat from './UserChat';
import TeacherChat from './TeacherChat';

const ChatScreen = ({ navigation }) => {
  const { userTeacherToken, userTeacherData, receiveMessage, setReceiveMessage } = useChatContext();

  const [myChat, setMyChat] = useState(null);

  useEffect(() => {
    if (!receiveMessage || !myChat) return
    const valueFromIdType = userTeacherToken.type === "user" ? "Teacher" : "User"
    const valueFromId = userTeacherToken.type === "user" ? "fromTeacherId" : "fromUserId";

    // const isUserTeacherChatFound = myChat.filter(item => item[valueFromIdType].id === receiveMessage[valueFromId]).length >= 1;
    // let teacherUserInfo
    // if (!isUserTeacherChatFound) {
    //   const getUserTeacherDataInfoById = async (id) => {
    //     const userTeacherValueType = userTeacherToken.type === "user" ? "teacher" : "user"
    //     try {
    //       const res = await AxiosInstance.get(`${userTeacherValueType}/${userTeacherValueType}-info/${id}`)
    //       return res.data.data
    //     } catch (err) {
    //     }
    //   }

    //   teacherUserInfo = getUserTeacherDataInfoById(receiveMessage[valueFromId])
    //   setMyChat(chats =>
    //     [...chats, {
    //       id: uuid.v4(),
    //       userId: userTeacherToken.type === "user" ? userTeacherData.id : receiveMessage.fromUserId,
    //       teacherId: userTeacherToken.type === "teacher" ? userTeacherData.id : receiveMessage.fromTeacherId,
    //       [valueFromIdType]: {
    //         id: receiveMessage[valueFromId],
    //         firstName: teacherUserInfo.firstName,
    //         lastName: teacherUserInfo.lastName
    //       },
    //       Messages: [{ id: receiveMessage.id, message: receiveMessage.message, createdAt: receiveMessage.createdAt }]
    //     }]
    //   )
    // } else {
    //   setMyChat(chats =>
    //     chats.map(chat =>
    //       chat[valueFromIdType].id === receiveMessage[valueFromId]
    //         ? { ...chat, Messages: [{ id: receiveMessage.id, message: receiveMessage.message, createdAt: receiveMessage.createdAt }] }
    //         : chat
    //     )
    //   )
    // }

    setMyChat(chats =>
      !receiveMessage[valueFromIdType]
        ? chats.map(chat =>
          chat[valueFromIdType].id === receiveMessage[valueFromId]
            ? { ...chat, Messages: [{ id: receiveMessage.id, message: receiveMessage.message, createdAt: receiveMessage.createdAt }] }
            : chat
        )
        : [...chats, {
          id: uuid.v4(),
          userId: userTeacherToken.type === "user" ? userTeacherData.id : receiveMessage.fromUserId,
          teacherId: userTeacherToken.type === "teacher" ? userTeacherData.id : receiveMessage.fromTeacherId,
          [valueFromIdType]: {
            id: receiveMessage[valueFromIdType].id,
            firstName: receiveMessage[valueFromIdType].firstName,
            lastName: receiveMessage[valueFromIdType].lastName
          },
          Messages: [{ id: receiveMessage.id, message: receiveMessage.message, createdAt: receiveMessage.createdAt }]
        }]
    )
    return () => {
      setReceiveMessage(null)
    }
  }, [receiveMessage])

  return userTeacherToken.type === 'user' ? (
    <UserChat myChat={myChat} setMyChat={setMyChat} navigation={navigation} />
  ) : userTeacherToken.type === 'teacher' ? (
    <TeacherChat myChat={myChat} setMyChat={setMyChat} navigation={navigation} />
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={colors.black} />
    </View>
  )
};

export default ChatScreen;

const styles = StyleSheet.create({
  choose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  info: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgChatlf: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
