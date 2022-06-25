import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useQuranContext } from '../../../context/QuranContext'

import MicOnIcons from "../../../assets/icons/MicOnIcons"
import MicOffIcons from "../../../assets/icons/MicOffIcons"
import { Permission, PERMISSION_TYPE } from '../../../AppPermission'
import { Alert } from 'react-native';

// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType,
// } from 'react-native-audio-recorder-player';

// import AudioRecord from 'react-native-audio-record';


const ModalReader = () => {
  // const { readerVoice, setReaderVoice } = useQuranContext();
  // const [isRecording, setIsRecording] = useState(false);

  // const [recordState, setRecordState] = useState({
  //   isLoggingIn: false,
  //   recordSecs: 0,
  //   recordTime: '00:00:00',
  //   currentPositionSec: 0,
  //   currentDurationSec: 0,
  //   playTime: '00:00:00',
  //   duration: '00:00:00',
  // })

  // const audioRecorderPlayer = useRef(new AudioRecorderPlayer());
  // audioRecorderPlayer.current.setSubscriptionDuration(0.09); // optional. Default is 0.1

  // const onHideHandle = () => {
  //   setReaderVoice(null)
  // }

  // const onRecordHandler = async () => {
  //   const checkPermissionRequest = [await Permission.checkPermission(PERMISSION_TYPE.microphone) && await Permission.checkPermission(PERMISSION_TYPE.readFile) && await Permission.checkPermission(PERMISSION_TYPE.writeFile)];
  //   if (checkPermissionRequest) {
  //     setIsRecording(isRecording => !isRecording);
  //     if (!isRecording) {
  //       const path = 'hello.wav';
  //       const audioSet = {
  //         AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //         AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //         AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  //         AVNumberOfChannelsKeyIOS: 2,
  //         AVFormatIDKeyIOS: AVEncodingOption.aac,
  //       };
  //       console.log('audioSet', audioSet);
  //       const uri = await audioRecorderPlayer.current.startRecorder(path, audioSet);
  //       audioRecorderPlayer.current.addRecordBackListener((e) => {
  //         setRecordState({
  //           ...recordState,
  //           recordSecs: e.current_position,
  //           recordTime: audioRecorderPlayer.current.mmssss(
  //             Math.floor(e.current_position),
  //           ),
  //         })
  //       });
  //       console.log(`uri: ${uri}`);
  //     } else {
  //       const result = await audioRecorderPlayer.current.stopRecorder();
  //       audioRecorderPlayer.current.removeRecordBackListener();
  //       setRecordState({ ...recordState, recordSecs: 0 })

  //       console.log(result);

  //     }
  //   } else {
  //     Alert.alert("Please Allow Microphone")
  //   }

  // }

  // const onStartPlay = async (e) => {
  //   console.log('onStartPlay');
  //   const path = 'hello.wav'
  //   const msg = await audioRecorderPlayer.current.startPlayer(path);
  //   audioRecorderPlayer.current.setVolume(1.0);
  //   console.log(msg);
  //   audioRecorderPlayer.current.addPlayBackListener((e) => {
  //     if (e.current_position === e.duration) {
  //       console.log('finished');
  //       audioRecorderPlayer.current.stopPlayer();
  //     }
  //     setRecordState({
  //       ...recordState,
  //       currentPositionSec: e.current_position,
  //       currentDurationSec: e.duration,
  //       playTime: audioRecorderPlayer.current.mmssss(
  //         Math.floor(e.current_position),
  //       ),
  //       duration: audioRecorderPlayer.current.mmssss(Math.floor(e.duration)),
  //     });
  //   });
  // };

  const onRecordHandler = async () => {
    // const checkPermissionRequest = [await Permission.checkPermission(PERMISSION_TYPE.microphone) && await Permission.checkPermission(PERMISSION_TYPE.readFile) && await Permission.checkPermission(PERMISSION_TYPE.writeFile)];
    // if (checkPermissionRequest) {
    //   setIsRecording(isRecording => !isRecording);
    //   if (!isRecording) {
    //     AudioRecord.start();
    //   } else {
    //     AudioRecord.stop();
    //     audioFile = await AudioRecord.stop();
    //     console.log(audioFile)
    //   }
    // } else {
    //   Alert.alert("Please Allow Microphone")
    // }
  }
  const onStartPlay = () => { };
  const onHideHandler = () => { };

  useEffect(() => {
    // const options = {
    //   sampleRate: 16000,  // default 44100
    //   channels: 1,        // 1 or 2, default 1
    //   bitsPerSample: 16,  // 8 or 16, default 16
    //   audioSource: 6,     // android only (see below)
    //   wavFile: 'test.wav' // default 'audio.wav'
    // };
    // AudioRecord.init(options);
    // AudioRecord.on('data', data => {
    //   // console.log(data)
    //   // do something with audio chunk
    // });
  }, [])

  return readerVoice && (
    <View style={{ width: '100%', height: 50 }} >
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', transform: [{ scaleX: -1 }] }}>
        <TouchableOpacity onPress={onStartPlay}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRecordHandler}>
          {isRecording ? (
            <MicOnIcons height={30} />
          ) : (
            <MicOffIcons height={30} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onHideHandler}>
          <Text>Hide</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ModalReader

const styles = StyleSheet.create({})