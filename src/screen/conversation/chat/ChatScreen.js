import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import uuid from "react-native-uuid"
import moment from 'moment';

import colors from '../../../colors';
import { AxiosInstance } from '../../../api/AxiosInstance';
import { useChatContext } from '../../../context/ChatContext';

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
    //   console.log(teacherUserInfo)
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

  if (userTeacherToken.type === 'user') {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [allTeachers, setAllTeachers] = useState(null);

    useEffect(() => {
      const getAllTeachers = async () => {
        await AxiosInstance.get('chat/teachers')
          .then(res => {
            setAllTeachers(res.data.data);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      };
      const getAllMyChat = async () => {
        await AxiosInstance.get('chat')
          .then(res => {
            setMyChat(res.data.data);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      };
      getAllTeachers();
      getAllMyChat();
      return () => {
        setAllTeachers(null);
        setMyChat(null);
      }
    }, []);

    useEffect(() => {
      if (!allTeachers || !myChat) return;
      setIsDataLoaded(true);
    }, [allTeachers, myChat]);

    const renderAllTeachers = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TypingScreen', { userTeacherDInfo: item });
          }}
          style={[styles.info, { marginRight: 10 }]}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&&background=random`,
            }}
            style={styles.imgChatlf}
          />
          <Text style={{ color: 'black', marginTop: 10, fontSize: 10 }}>
            {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
      );
    };

    const renderMyChats = ({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TypingScreen', {
              chatId: item.id,
              userTeacherDInfo: item.Teacher
            })
          }
          style={{
            flexDirection: 'row',
            position: 'relative',
            paddingVertical: 5,
          }}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.Teacher.firstName}+${item.Teacher.lastName}&&background=random`,
            }}
            style={[styles.imgChatlf, { marginRight: 5 }]}
          />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <Text style={{ color: 'black', fontSize: 14, fontWeight: '600' }}>
              {item.Teacher.firstName} {item.Teacher.lastName}
            </Text>
            <Text
              style={{ color: '#707070', fontSize: 12, fontWeight: '300', textAlign: 'left' }}
              numberOfLines={1}>
              {item.Messages[0].message}
            </Text>
          </View>
          <Text style={{ alignSelf: 'center', fontSize: 12, color: 'black' }}>
            {moment(item.Messages[0].createdAt).local().format('hh:mm')}
          </Text>
        </TouchableOpacity>
      );
    };

    return isDataLoaded ? (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.choose}>
          <FlatList
            data={allTeachers}
            renderItem={renderAllTeachers}
            keyExtractor={item => item.id}
            horizontal
            style={{ marginLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.dark,
            borderBottomWidth: 1,
            width: '90%',
            alignSelf: 'center',
          }}
        />

        <View style={{ marginHorizontal: 20, flex: 1 }}>
          <FlatList
            data={myChat}
            renderItem={renderMyChats}
            keyExtractor={item => item.id}
            style={{ marginBottom: 55 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.black} />
      </View>
    );
  } else if (userTeacherToken.type === 'teacher') {
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
      const getAllMyChat = async () => {
        await AxiosInstance.get('chat')
          .then(res => {
            setMyChat(res.data.data);
          })
          .catch(err => {
            console.log(err.response.data);
          });
      };
      getAllMyChat();
    }, []);

    useEffect(() => {
      if (!myChat) return;
      setIsDataLoaded(true);
    }, [myChat]);

    const renderMyChats = ({ item, index }) => {

      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TypingScreen', { userTeacherDInfo: item.User })
          }
          style={{
            flexDirection: 'row',
            position: 'relative',
            paddingVertical: 5,
          }}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.User.firstName}+${item.User.lastName}&&background=random`,
            }}
            style={[styles.imgChatlf, { marginRight: 5 }]}
          />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <Text style={{ color: 'black', fontSize: 14, fontWeight: '600' }}>
              {item.User.firstName} {item.User.lastName}
            </Text>
            <Text
              style={{ color: '#707070', fontSize: 12, fontWeight: '300' }}
              numberOfLines={1}>
              {item.Messages[0].message}
            </Text>
          </View>
          <Text style={{ alignSelf: 'center', fontSize: 12, color: 'black' }}>
            {moment(item.Messages[0].createdAt).local().format('hh:mm')}
          </Text>
        </TouchableOpacity>
      );
    };

    return isDataLoaded ? (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={{ marginHorizontal: 20, flex: 1 }}>
          <FlatList
            data={myChat}
            renderItem={renderMyChats}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 55 }}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.black} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.black} />
      </View>
    )
  }
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
