import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import Message from './Message';
import { useChatContext } from '../../../context/ChatContext';

import moment from "moment"
import colors from '../../../colors';
import { AxiosInstance } from '../../../api/AxiosInstance';

import uuid from "react-native-uuid"

const MessagesList = ({ id, messages, setAllMessagesInChat }) => {
  const { userTeacherTokenMemo } = useChatContext();

  const { userTeacherToken } = userTeacherTokenMemo

  const [refreshing, setRefreshing] = useState(false);

  const [isFinishLoading, setIsFinishLoading] = useState(messages.Messages.length === 0 ? true : false);
  const flatListRef = useRef(null);

  const loadMoreData = async () => {
    // await AxiosInstance.get(`message?${userTeacherToken.type === "user" ? "teacher" : "user"}=${id}&offset=${messages.Messages.length + 20}`).then((res) => {
    await AxiosInstance.get(`message?${userTeacherToken.type === "user" ? "teacher" : "user"}=${id}`).then((res) => {
      // if (res.data.data.Messages.length >= 1) {
      //   const newData = { ...messages };
      //   newData.Messages.push(...res.data.data.Messages);
      //   setAllMessagesInChat(newData);
      // } else {
      //   setIsFinishLoading(true)
      // }
      const newData = { ...messages };
      newData.Messages.push(...res.data.data.Messages);
      setAllMessagesInChat(newData);
    }).catch((err) => {
    }).finally(() => {
      setRefreshing(false);
    })
  }

  const handleLoadMore = async () => {
    if (!isFinishLoading) {
      setRefreshing(true);
      loadMoreData();
    }
  }



  const renderMyMessages = ({ item, index }) => {
    return (
      <Message
        time={moment(item.createdAt).format("hh:mm A")}
        isLeft={
          userTeacherToken.type === "user" ? !item.fromUserId : item.fromUserId}
        message={item.message}
        type={item.messageType}
      />
    )
  }

  const refreshingHeader = () => {
    return !isFinishLoading ? (
      <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.black} />
      </View>
    ) : null
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      ref={flatListRef}
      inverted
      data={messages.Messages}
      renderItem={renderMyMessages}
      keyExtractor={item => uuid.v4()}
      // ListFooterComponent={refreshingHeader}
      // onEndReached={handleLoadMore}
      onEndReachedThreshold={1}
      maxToRenderPerBatch={10}
    />
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
