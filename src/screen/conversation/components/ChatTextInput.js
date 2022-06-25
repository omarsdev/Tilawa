import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AudioRecord from 'react-native-audio-record';

import colors from '../../../colors';
import { useChatContext } from '../../../context/ChatContext';
import { Permission, PERMISSION_TYPE } from '../../../AppPermission'

import uuid from "react-native-uuid"

import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { AxiosInstance } from '../../../api/AxiosInstance';


const ChatTextInput = ({ id, chatId, handleNewSendMessage }) => {
  const { userTeacherDataMemo, userTeacherTokenMemo, sendMessage } = useChatContext();

  const { userTeacherData } = userTeacherDataMemo;
  const { userTeacherToken } = userTeacherTokenMemo;

  const [message, setMessages] = useState('');
  const [isRecording, setIsRecording] = useState(false)

  const sendMessageHandler = (fileUrl, type) => {
    const userTeacherFromValue = userTeacherToken.type === "user" ? 'fromUserId' : "fromTeacherId"
    if (message.length > 0) {
      handleNewSendMessage({ message, id: uuid.v4(), chatId, createdAt: new Date(), [userTeacherFromValue]: userTeacherData.id })
      sendMessage(message, id);
      setMessages('')
    } else {
      handleNewSendMessage({ message: fileUrl, id: uuid.v4(), chatId, createdAt: new Date(), [userTeacherFromValue]: userTeacherData.id })
      sendMessage(fileUrl, id, type);
    }
  }

  const launchImagePickerHandler = async () => {
    try {
      const res = await launchImageLibrary({ mediaType: 'mixed' })
      const photo = res.assets[0];
      const type = res.assets[0].type.split("/")[0];
      const formData = new FormData();

      formData.append('file', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });

      try {
        const apiRes = await AxiosInstance.post(`/media/chat/${chatId}`, formData)
        sendMessageHandler(apiRes.data.data, type);
      } catch (apiResError) {
        Alert.alert(apiResError.response.data.error)
      }


    } catch (error) {
      console.log(error)
    }
  }

  const onRecordHandler = async () => {
    const checkPermissionRequest = [await Permission.checkPermission(PERMISSION_TYPE.microphone) && await Permission.checkPermission(PERMISSION_TYPE.readFile) && await Permission.checkPermission(PERMISSION_TYPE.writeFile)];
    if (checkPermissionRequest) {
      setIsRecording(isRecording => !isRecording);
      if (!isRecording) {
        AudioRecord.start();
      } else {
        AudioRecord.stop();
        audioFile = await AudioRecord.stop();

        const formData = new FormData();

        formData.append('file', {
          name: 'test.wav',
          type: 'audio/wav',
          uri: audioFile
          // uri:
          //   Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        try {
          const apiRes = await AxiosInstance.post(`/media/chat/${chatId}`, formData)
          sendMessageHandler(apiRes.data.data, 'audio');
        } catch (apiResError) {
          Alert.alert(apiResError.response.data.error)
        }

        // console.log(audioFile)
      }
    } else {
      Alert.alert("Please Allow Microphone")
    }
  }

  useEffect(() => {
    const options = {
      sampleRate: 16000,  // default 44100
      channels: 1,        // 1 or 2, default 1
      bitsPerSample: 16,  // 8 or 16, default 16
      audioSource: 6,     // android only (see below)
      wavFile: 'test.wav' // default 'audio.wav'
    };
    AudioRecord.init(options);
    AudioRecord.on('data', data => {
      // console.log(data)
      // do something with audio chunk
    });
  }, [])

  return (
    <View style={[styles.mainView]}>
      <View style={styles.textInput}>
        <View style={{ width: '80%' }}>
          <TextInput
            placeholderTextColor="#292C30"
            onChangeText={text => setMessages(text)}
            style={{ padding: 0, margin: 0, height: '100%', color: "#000" }}
            textAlign="right"
            value={message}
          />
        </View>

        <View style={styles.iconTextinput}>
          <TouchableOpacity onPress={launchImagePickerHandler} style={{ height: "100%", width: 25, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Entypo name="attachment" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => message ? sendMessageHandler() : onRecordHandler()} style={{ height: "100%", width: 25, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name={message ? 'send' : isRecording ? 'microphone' : 'microphone-off'}
              size={22}
              color={"#000"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatTextInput;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 13,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: '90%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    alignSelf: 'center',
  },
  iconTextinput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '20%',
  },
});
