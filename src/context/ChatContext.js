import React, { useContext, createContext, useEffect, useState, useRef, useMemo } from 'react';
import io, { Manager } from 'socket.io-client';
import uuid from 'react-native-uuid';

import { AxiosInstance } from '../api/AxiosInstance';
import { deleteData, getData, storeData } from '../utils';
import { socketApi } from '../api/socketApi';

const ChatContext = createContext();
export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const [userTeacherData, setUserTeacherData] = useState(null);
  const [userTeacherToken, setUserTeacherToken] = useState(null);

  const [socketConnections, setSocketConnections] = useState(false);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socketRef = React.useRef(null);

  const getMeInformation = async (resData) => {
    await AxiosInstance.get(`${resData.type}/me`).then((res) => {
      setUserTeacherData(res.data.data)
    }).catch((err) => {
    })
  }

  const handlingData = async () => {
    // await deleteData('token');
    const userTeacherDataStorage = await getData('token');
    if (userTeacherDataStorage) {
      setUserTeacherToken(JSON.parse(userTeacherDataStorage))
      getMeInformation(JSON.parse(userTeacherDataStorage))
    }
  }


  const storeNewTokenData = async (resData) => {
    setUserTeacherToken({ token: resData.token, type: resData.type })
    await storeData('token', { token: resData.token, type: resData.type });
    getMeInformation(resData)
  }

  useEffect(() => {

    if (userTeacherData) return;
    handlingData();
  }, []);

  useEffect(() => {
    if (!userTeacherToken || socketConnections) return;
    const manager = new Manager(socketApi, {
      reconnectionDelayMax: 10000,
    });
    socketRef.current = manager.socket("/", {
      auth: {
        token: userTeacherToken.token
      }
    });
    setSocketConnections(true)
  }, [userTeacherToken])

  useEffect(() => {
    if (!socketConnections || !socketRef.current) return;
    socketRef.current.on('receive', data => {
      setReceiveMessage(data)
    });

    socketRef.current.on('connect_error', async err => {
      await deleteData('token');
      setUserTeacherToken(null);
      setUserTeacherData(null);
      setSocketConnections(false)
    });

    return () => {
      socketRef.current.on('disconnect', () => {
        setSocketConnections(false);
        socketRef.current.disconnect();
      });
    };
  }, [socketConnections, socketRef.current]);

  const sendMessage = (message, userTeacherId, type) => {
    const valueId = userTeacherToken.type === "user" ? "teacherId" : "userId"
    // const value = userTeacherToken.type === "user" ? "fromUserId" : "fromTeacherId"
    socketRef.current.emit('message', {
      [valueId]: userTeacherId,
      message: message,
      type: type ? type : "text"
    });
    // setReceiveMessage({
    //   id: uuid.v4(),
    //   message: message,
    //   createdAt: new Date(),
    //   [value]: userTeacherData.id,
    //   chatId
    // })
  };

  const userTeacherDataMemo = useMemo(
    () => ({
      userTeacherData, setUserTeacherData
    }),
    [userTeacherData, setUserTeacherData]
  );

  const userTeacherTokenMemo = useMemo(
    () => ({
      userTeacherToken, setUserTeacherToken
    }),
    [userTeacherToken, setUserTeacherToken]
  );

  const receiveMessageMemo = useMemo(
    () => ({
      receiveMessage, setReceiveMessage
    }),
    [receiveMessage, setReceiveMessage]
  );

  return (
    <ChatContext.Provider value={{
      userTeacherDataMemo,
      userTeacherTokenMemo,
      receiveMessageMemo,
      storeNewTokenData,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  )
}
