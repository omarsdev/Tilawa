import React, {useState, useEffect} from 'react';
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
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

import colors from '../../../colors';
import {AxiosInstance} from '../../../api/AxiosInstance';
import {useChatContext} from '../../../context/ChatContext';

const ChatScreen = ({navigation}) => {
  const {userTeacherToken} = useChatContext();

  if (userTeacherToken.type === 'user') {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [allTeachers, setAllTeachers] = useState(null);
    const [myChat, setMyChat] = useState(null);

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
    }, []);

    useEffect(() => {
      if (!allTeachers || !myChat) return;
      setIsDataLoaded(true);
    }, [allTeachers, myChat]);

    const renderAllTeachers = ({item, index}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TypingScreen', {teacherId: item.id});
          }}
          style={styles.info}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&&background=random`,
            }}
            style={styles.imgChatlf}
          />
          <Text style={{color: 'black'}}>
            {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
      );
    };

    const renderMyChats = ({item, index}) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TypingScreen', {
              chatId: item.id,
              teacherId: item.Teacher.id,
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
            style={[styles.imgChatlf, {marginRight: 5}]}
          />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              {item.Teacher.firstName} {item.Teacher.lastName}
            </Text>
            <Text
              style={{color: '#707070', fontSize: 12, fontWeight: '300'}}
              numberOfLines={1}>
              {item.Messages[0].message}
            </Text>
          </View>
          <Text style={{alignSelf: 'center', fontSize: 12}}>
            {moment(item.Messages[0].createdAt).local().format('hh:mm')}
          </Text>
        </TouchableOpacity>
      );
    };

    return isDataLoaded ? (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.choose}>
          <FlatList
            data={allTeachers}
            renderItem={renderAllTeachers}
            keyExtractor={item => item.id}
            horizontal
            style={{marginLeft: 20}}
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

        <View style={{marginHorizontal: 20, flex: 1}}>
          <FlatList
            data={myChat}
            renderItem={renderMyChats}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.black} />
      </View>
    );
  } else {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [myChat, setMyChat] = useState(null);

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

    const renderMyChats = ({item, index}) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TypingScreen', {
              chatId: item.id,
              userId: item.User.id,
            })
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
            style={[styles.imgChatlf, {marginRight: 5}]}
          />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              {item.User.firstName} {item.User.lastName}
            </Text>
            <Text
              style={{color: '#707070', fontSize: 12, fontWeight: '300'}}
              numberOfLines={1}>
              {item.Messages[0].message}
            </Text>
          </View>
          <Text style={{alignSelf: 'center', fontSize: 12}}>
            {moment(item.Messages[0].createdAt).local().format('hh:mm')}
          </Text>
        </TouchableOpacity>
      );
    };

    return isDataLoaded ? (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={{marginHorizontal: 20, flex: 1}}>
          <FlatList
            data={myChat}
            renderItem={renderMyChats}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    ) : (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.black} />
      </View>
    );
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
