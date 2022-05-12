import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';

import Message from './Message';
import { useChatContext } from '../../../context/ChatContext';

import moment from "moment"

const MessagesList = ({ messages }) => {
  const { userTeacherToken, userTeacherData } = useChatContext();

  return (
    <ScrollView style={{ flex: 1 }}>
      {messages.map((message, index) => (
        <Message
          key={index}
          time={moment(message.createdAt).format("hh:mm")}
          isLeft={message[userTeacherToken.type ? "fromUserId" : "fromTeacherId"] !== userTeacherData.id}
          message={message.message}
        />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
