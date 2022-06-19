import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { AxiosInstance } from '../../../api/AxiosInstance';
import { useChatContext } from '../../../context/ChatContext';
import colors from '../../../colors';
import moment from 'moment';


const TeacherChat = (props) => {
  const { myChat, setMyChat, navigation } = props

  const { userTeacherToken, userTeacherData, receiveMessage, setReceiveMessage } = useChatContext();

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const getAllMyChat = async () => {
      await AxiosInstance.get('chat')
        .then(res => {
          setMyChat(res.data.data);
        })
        .catch(err => {

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
}

export default TeacherChat

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