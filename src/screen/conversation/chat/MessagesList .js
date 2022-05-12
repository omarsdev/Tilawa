import React, {useState, useRef} from 'react';
import {ScrollView} from 'react-native';
import Message from './Message';
const MessagesList = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: 'Hello feras',
      createdAt: '2022-05-10T17:17:17.968Z',
      fromUserId: null,
    },
    {
      id: 2,
      message: 'Hello omar',
      createdAt: '2022-05-10T17:17:20.768Z',
      fromUserId: 1,
    },
    {
      id: 3,
      message: 'how are you',
      createdAt: '2022-05-10T17:17:22.509Z',
      fromUserId: null,
    },
    {
      id: 4,
      message: 'good how about u',
      createdAt: '2022-05-10T17:17:24.322Z',
      fromUserId: 1,
    },
    {
      id: 5,
      message: 'thanxs',
      createdAt: '2022-05-10T17:17:25.910Z',
      fromUserId: null,
    },
    {
      id: 6,
      message: 'Hello Teacher',
      createdAt: '2022-05-10T17:17:27.789Z',
      fromUserId: 1,
    },
    {
      id: 7,
      message: 'Hello Teacher',
      createdAt: '2022-05-10T17:17:28.558Z',
      fromUserId: 1,
    },
    {
      id: 8,
      message: 'Hello Teacher',
      createdAt: '2022-05-10T17:17:29.163Z',
      fromUserId: 1,
    },
    {
      id: 9,
      message: 'Hello User',
      createdAt: '2022-05-10T17:17:31.249Z',
      fromUserId: null,
    },
    {
      id: 10,
      message: 'Hello User',
      createdAt: '2022-05-10T17:17:31.606Z',
      fromUserId: null,
    },
    {
      id: 11,
      message: 'Hello Teacher',
      createdAt: '2022-05-10T17:17:33.552Z',
      fromUserId: 1,
    },
    {
      id: 12,
      message: 'Hello User',
      createdAt: '2022-05-10T17:17:34.979Z',
      fromUserId: null,
    },
  ]);

  const fromUserId = useRef(1);

  return (
    <ScrollView style={{flex: 1}}>
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.createdAt}
          isLeft={message.fromUserId !== fromUserId.current}
          message={message.message}
        />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
