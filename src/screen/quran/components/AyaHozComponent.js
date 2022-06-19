import React, { Fragment, useEffect, useState } from 'react'
import { Dimensions, Text, View, StyleSheet, I18nManager, Pressable, Platform, PixelRatio, SafeAreaView } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LinearGradient from 'react-native-linear-gradient';

import { useMainStackContext } from '../../../context/MainStackContext';

import StartSoraIcon from '../../../assets/icons/StartSoraIcon';
import BsimAllahIcon from "../../../assets/icons/BsimAllahIcon"
import fonts from '../../../assets/fonts';

import colors from '../../../colors';
import { useQuranContext } from '../../../context/QuranContext';
import ModalSora from './ModalSora';
import ModalTafseer from './ModalTafseer';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 390;
function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
  }
}

const AyaHozComponent = ({ pageData, height }) => {

  // console.log(pageData.lines)

  const { bottomVisible, changeBottomVisible } = useMainStackContext();
  const { selectedAudioAya, setSelectedAudioAya, readerVoice, setReaderVoice } = useQuranContext();

  const [selectedAya, setSelectedAya] = useState(null)

  const [isAyaPress, setIsAyaPress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isTafseerModal, setIsTafseerModal] = useState(false);
  const [isBlackBackground, setIsBlackBackground] = useState(false);

  const fontSizeValue = () => {
    return Platform.OS === 'ios' ?
      `AQF_P${pageData.page.toString().length === 1
        ? `00${pageData.page}`
        : pageData.page.toString().length === 2
          ? `0${pageData.page}`
          : pageData.page}_HA`
      : `page-${pageData.page}`
  }
  String.prototype.EntoAr = function () {
    return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  const _onLongPressHandlerAya = (ayaId, soraId, ayaText) => {
    if (readerVoice) return;
    if (bottomVisible) changeBottomVisible()
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger("selection", options);
    setSelectedAya({ ayaId, soraId });
    setIsBlackBackground(true);
    setIsAyaPress(true);
    setModalVisible(true);
  }

  const _onTouchEnd = () => {
    setIsAyaPress(false)
  }

  useEffect(() => {
    return () => {
      setSelectedAya(null)
      setIsAyaPress(false)
      setModalVisible(false);
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable style={[{ flex: 1 }, !I18nManager.isRTL && { transform: [{ scaleX: -1 }] }]} onPress={changeBottomVisible}>
        <View style={{ height: 20, width: '100%', flexDirection: !I18nManager.isRTL ? 'row' : "row-reverse", justifyContent: 'space-between', paddingHorizontal: 20 }} >
          <Text style={{ fontSize: 14, color: colors.black }}>{pageData.sora_name_ar.join(' ')}</Text>
          <Text style={{ fontSize: 14, color: colors.black }}>جزء {pageData.jozz.toString().EntoAr()}</Text>
        </View>


        {pageData.lines.map((line, lineIndex) => (
          <Pressable onPress={changeBottomVisible} style={{ flexDirection: I18nManager.isRTL ? 'row' : "row-reverse", alignSelf: 'center', flex: 1 }} key={lineIndex}>
            {Array.isArray(line) && line.map((ayaText, ayaTextIndex) => (
              ayaText.isSora ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }} key={ayaTextIndex}>
                  <StartSoraIcon />
                  <View style={{ position: 'absolute', zIndex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{
                        fontFamily: fonts.title, fontSize: Platform.OS === 'ios' ? 23 : 20, color: colors.black,
                      }}>{ayaText.ayaString}</Text>
                    </View>
                  </View>
                </View>
              ) : ayaText?.isBismAllah ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={ayaTextIndex}>
                  <BsimAllahIcon />
                </View>
              ) : (
                <Pressable
                  onPress={changeBottomVisible}
                  onLongPress={() => _onLongPressHandlerAya(ayaText.ayaNo, ayaText.soraId, ayaText)}
                  onTouchEndCapture={_onTouchEnd}
                  key={ayaTextIndex}
                  delayLongPress={170}
                >
                  <View style={{ flexDirection: 'row-reverse' }}>
                    {ayaText.ayaString.split('').map((e, i) => {
                      // console.log(pageData.lines[pageData.lines.length !== lineIndex ? lineIndex + 1 : lineIndex][ayaTextIndex])
                      // console.log(pageData.lines.length, line)
                      // console.log(readerVoice.ayaId, ayaText)
                      return (
                        <Text style={[{
                          fontFamily: fontSizeValue(),
                          fontSize: normalize(27),
                          color:
                            readerVoice?.ayaId > ayaText.ayaNo &&
                              readerVoice?.soraId === ayaText.soraId
                              ? colors.black : ayaText.ayaString.length - 1 === i && (
                                (
                                  pageData.lines[lineIndex][ayaTextIndex + 1] &&
                                  pageData.lines[lineIndex][ayaTextIndex + 1].ayaNo !== ayaText.ayaNo
                                )
                                ||
                                (
                                  pageData.lines[lineIndex + 1]?.[0] &&
                                  pageData.lines[lineIndex + 1][0].ayaNo !== ayaText.ayaNo
                                )
                                ||
                                (
                                  pageData.lines.length - 1 === lineIndex
                                )
                              ) ? colors.black : colors.white,
                          height: '100%',
                          // display: ayaText.ayaString.length - 1 === i ? 'flex' : 'none'
                        },
                        isAyaPress && selectedAya && selectedAya.ayaId === ayaText.ayaNo && selectedAya.soraId === ayaText.soraId && { backgroundColor: '#c8c8c8' },
                        selectedAudioAya && selectedAudioAya.ayaId === ayaText.ayaNo && selectedAudioAya.soraId === ayaText.soraId && { backgroundColor: colors.second },
                        ]}
                          key={i}
                        >
                          {/* {ayaText.ayaString} */}
                          {e}
                        </Text>
                      )
                    })}
                  </View>
                </Pressable>
              )
            ))}
          </Pressable>
        ))}

        <View style={{ height: 20, width: '100%', alignSelf: 'center' }} >
          <Text style={{ fontSize: 14, textAlign: 'center', color: colors.black }}>{pageData.page.toString().EntoAr()}</Text>
        </View>
      </Pressable>
      {!readerVoice && (
        <Fragment>
          <ModalSora
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedSoraNameAyaNum={selectedAya}
            setSelectedAya={setSelectedAya}
            isTafseerModal={isTafseerModal}
            setIsTafseerModal={setIsTafseerModal}
            setIsBlackBackground={setIsBlackBackground}
          />
          <ModalTafseer
            isTafseerModal={isTafseerModal}
            setIsTafseerModal={setIsTafseerModal}
            selectedSoraNameAyaNum={selectedAya}
            setSelectedAya={setSelectedAya}
            setIsBlackBackground={setIsBlackBackground}
          />
        </Fragment>
      )}
      {isBlackBackground ? <View style={{ position: 'absolute', zIndex: 10, width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flex: 1 }}>
        <LinearGradient style={{ flex: 1 }} colors={['rgba(0,0,0,0.30)', 'rgba(0,0,0,0.33)']} />
      </View> : null}
    </SafeAreaView>
  )
}

export default AyaHozComponent;


/*
ayaText.ayaString.length - 1 === i && (
  (
    pageData.lines[lineIndex][ayaTextIndex + 1] &&
    pageData.lines[lineIndex][ayaTextIndex + 1].ayaNo !== ayaText.ayaNo
  )
  ||
  (
    pageData.lines[lineIndex + 1]?.[0] &&
    pageData.lines[lineIndex + 1][0].ayaNo !== ayaText.ayaNo
  )
  ||
  (
    pageData.lines.length - 1 === lineIndex
  )
)




(readerVoice && readerVoice.ayaId <= ayaText.ayaNo && readerVoice.soraId === ayaText.soraId) && (ayaText.ayaString.length - 1 === i) && (
  (
    pageData.lines[lineIndex][ayaTextIndex + 1] &&
    pageData.lines[lineIndex][ayaTextIndex + 1].ayaNo !== ayaText.ayaNo // ayaText.ayaNo
  )
  ||
  (
    pageData.lines[lineIndex + 1]?.[0] &&
    pageData.lines[lineIndex + 1][0].ayaNo !== ayaText.ayaNo // ayaText.ayaNo
  )
  ||
  (
    pageData.lines.length - 1 === lineIndex
  )
)


readerVoice && 
readerVoice.ayaId <= ayaText.ayaNo && 
readerVoice?.soraId === ayaText.soraId && 
ayaText.ayaString.length - 1 !== i

ayaText.ayaString.length - 1 === i && (
  (
    pageData.lines[lineIndex][ayaTextIndex + 1] &&
    pageData.lines[lineIndex][ayaTextIndex + 1].ayaNo !== ayaText.ayaNo
  )
  ||
  (
    pageData.lines[lineIndex + 1]?.[0] &&
    pageData.lines[lineIndex + 1][0].ayaNo !== ayaText.ayaNo
  )
  ||
  (
    pageData.lines.length - 1 === lineIndex
  )
)
  ? colors.black : colors.white,
  {readerVoiceMode && readerVoiceMode.ayaId === ayaText.ayaNo && readerVoiceMode.soraId === ayaText.soraId ? ayaText.ayaString : ayaText.ayaString}
*/