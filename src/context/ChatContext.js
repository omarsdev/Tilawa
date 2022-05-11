import React, { useContext, createContext, useEffect, useState } from 'react';
import { AxiosInstance } from '../api/AxiosInstance';

import { getData, storeData } from '../utils';

const ChatContext = createContext();
export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const [userTeacherData, setUserTeacherData] = useState(null);
  const [userTeacherToken, setUserTeacherToken] = useState(null);

  const getMeInformation = async (resData) => {
    await AxiosInstance.get(`${resData.type}/me`).then((res) => {
      setUserTeacherData(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handlingData = async () => {
    const userTeacherDataStorage = await getData('token');
    if (userTeacherDataStorage) {
      setUserTeacherToken(JSON.parse(userTeacherDataStorage))
      getMeInformation(JSON.parse(userTeacherDataStorage))
    }
  }

  useEffect(() => {
    if (userTeacherData) return;
    handlingData();
  }, [])

  const storeNewTokenData = async (resData) => {
    await storeData('token', { token: resData.token, type: resData.type });
    getMeInformation(resData)
  }

  return (
    <ChatContext.Provider value={{
      userTeacherData, setUserTeacherData,
      userTeacherToken, setUserTeacherToken,
      storeNewTokenData
    }}>
      {children}
    </ChatContext.Provider>
  )
}
