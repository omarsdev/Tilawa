import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, Pressable, Vibration, Image, I18nManager, Alert } from 'react-native'

import colors from '../../../colors'

import fonts from '../../../assets/fonts'
import hafsData from "../../../constant/hafsData_v18.json"

import StartSoraIcon from '../../../assets/icons/StartSoraIcon';
import BsimAllahIcon from "../../../assets/images/bismillah.png"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TouchableOpacity } from 'react-native'

import AudioRecord from 'react-native-audio-record';
import { Permission, PERMISSION_TYPE } from '../../../AppPermission'
import { AxiosInstance } from '../../../api/AxiosInstance'

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * .30;
const WIDTH_MARGIN = parseInt(SCREEN_WIDTH * .07);

const AyaComponents = ({ item, type, index, updatePage, favoriteBook }) => {
  const [hide, setHide] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false);

  String.prototype.EntoAr = function () {
    return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  const ayaTextFixAndroidHandler = () => {
    if (Platform.OS === 'android') {
      return item.aya_text.slice(0, -item.aya_no.toString().length) + item.aya_no.toString().split("").reverse().join("").EntoAr()
    } else return item.aya_text
  }

  const getAyaSplit = () => {
    const a = parseInt(item.aya_no.toString().length) + 1;
    return item.aya_text.slice(0, -a).split(" ")
  }
  const getLatestAyaNo = () => {
    const a = parseInt(item.aya_no.toString().length) + 1;
    return item.aya_text.slice(0, -a).split(" ")
  }

  const jozzTextHandler = () => {
    if (Platform.OS === 'android') {
      return hafsData[item.id].jozz.toString().split("").reverse().join("").EntoAr()
    } else return hafsData[item.id].jozz.toString().EntoAr();
  }

  const onHideHandler = () => {
    setHide(!hide)
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
        });

        formData.append('ayaId', item.aya_no)
        formData.append('soraId', item.sora)

        try {
          setLoading(true)
          const apiRes = await AxiosInstance.post(`/ai`, formData)
          setData(apiRes.data)
          console.log(apiRes.data)
        } catch (error) {
          Alert.alert(error.response.data.error)
        } finally {
          setLoading(false)
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
    item.isNewSora === true ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }} key={index}>
        <StartSoraIcon />
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
              fontFamily: fonts.title, fontSize: Platform.OS === 'ios' ? 20 : 18, color: colors.black,
            }}>{ayaList[item.sora - 1]['ar-font']}</Text>
          </View>
        </View>
      </View>
    ) : item.isStartSora === true ? (
      <Pressable style={[{ flex: 1, paddingHorizontal: 20, justifyContent: "center", alignItems: 'center', backgroundColor: index % 2 === 0 ? 'white' : colors.white }]} key={index}>
        <Image source={BsimAllahIcon} style={{
          flex: 1,
          resizeMode: 'contain',
          width: SCREEN_WIDTH / 1.5,
          height: type.h,
        }} />
      </Pressable>
    ) : (
      <View style={{ backgroundColor: index % 2 !== 0 ? 'white' : colors.white, height: type.h, width: type.w }}>
        {(hafsData[item.id - 1].jozz !== hafsData[item.id - 2 < 0 ? 0 : item.id - 2].jozz) && <Text style={styles.textJozz}> الجزء {jozzTextHandler()}</Text>}
        <View style={[{ backgroundColor: index % 2 === 0 ? 'white' : colors.white, flex: 1, justifyContent: 'center' }]}>
          <Text style={styles.ayaText}>
            {getAyaSplit().map((e, i) => (
              <Text style={data && data.falseWord.includes(i) ? { color: 'red' } : hide ? { color: index % 2 === 0 ? 'white' : colors.white } : null} key={i}>{e} </Text>
            ))}
            <Text>{item.aya_no.toString().split("").reverse().join("").EntoAr()}</Text>
          </Text>
          <View style={[{ position: 'absolute', flex: 1, bottom: 5, width: '100%', height: 20 }]}>
            <View style={[{ flexDirection: 'row', position: 'absolute', width: '100%' }, I18nManager.isRTL ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: index % 2 === 0 ? 'white' : colors.white, height: 40, width: '100%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={onHideHandler}>
            <MaterialCommunityIcons
              name={hide ? 'eye' : 'eye-off'}
              size={22}
              color={"#000"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onRecordHandler}>
            <MaterialCommunityIcons
              name={isRecording ? 'microphone' : 'microphone-off'}
              size={22}
              color={"#000"}
            />
          </TouchableOpacity>

          <Text></Text>
        </View>
      </View>
    )
  )
}

export default AyaComponents

const styles = StyleSheet.create({
  ayaText: {
    fontSize: 20,
    fontFamily: fonts.hafs,
    color: colors.black,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    marginHorizontal: WIDTH_MARGIN,
  },
  soraHeaderView: {
    backgroundColor: colors.dark,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  soraHeaderText: {
    fontSize: 25,
    fontFamily: fonts.hafs,
    color: colors.white,
  },
  soraText: [{
    fontFamily: fonts.hafs,
    fontSize: 12,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    marginHorizontal: WIDTH_MARGIN,
    color: colors.black,
  },
  ],
  bismAllahText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.hafs,
    color: colors.black,
    marginTop: 20
  },
  favoriteViewContainer: {
    backgroundColor: colors.red,
    flex: 1,
  },
  bookmarkViewContainer: {
    backgroundColor: colors.yellow,
    flex: 1,
  },
  favoriteViewCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkViewCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginFavoriteIcon: I18nManager.isRTL ? {
    marginRight: TRANSLATE_X_THRESHOLD * .6
  } : {
    marginLeft: TRANSLATE_X_THRESHOLD * .6
  },
  marginBookIcon: I18nManager.isRTL ? {
    marginLeft: TRANSLATE_X_THRESHOLD * .6
  } : {
    marginRight: TRANSLATE_X_THRESHOLD * .6
  },
  textJozz: {
    fontFamily: fonts.hafs,
    fontSize: 12,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    marginHorizontal: WIDTH_MARGIN,
    color: colors.black,
  }
})