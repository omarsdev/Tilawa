import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { AxiosInstance } from '../../../api/AxiosInstance';
import { useChatContext } from '../../../context/ChatContext';
import colors from '../../../colors';
import moment from 'moment';


const UserChat = (props) => {
  const { myChat, setMyChat, navigation } = props

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [allTeachers, setAllTeachers] = useState(null);

  useEffect(() => {
    const getAllTeachers = async () => {
      await AxiosInstance.get('chat/teachers')
        .then(res => {
          setAllTeachers(res.data.data);
        })
        .catch(err => {
        });
    };
    const getAllMyChat = async () => {
      await AxiosInstance.get('chat')
        .then(res => {
          setMyChat(res.data.data);
        })
        .catch(err => {
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
}

export default UserChat

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
})