import React, { useState, useRef } from 'react';
import { FlatList, ScrollView } from 'react-native';

import Message from './Message';
import { useChatContext } from '../../../context/ChatContext';

import moment from "moment"

const MessagesList = ({ messages }) => {
  const { userTeacherToken, userTeacherData } = useChatContext();

  const flatListRef = useRef(null)

  const renderMyMessages = ({ item, index }) => (
    <Message
      time={moment(item.createdAt).format("hh:mm")}
      isLeft={item[userTeacherToken.type ? "fromUserId" : "fromTeacherId"] !== userTeacherData.id}
      message={item.message}
    />
  )

  return (
    <FlatList
      style={{ flex: 1 }}
      ref={flatListRef}
      onContentSizeChange={() => flatListRef.current.scrollToEnd()}
      data={messages}
      renderItem={renderMyMessages}
      keyExtractor={item => item.id}
    />
  );
};

export default MessagesList;
