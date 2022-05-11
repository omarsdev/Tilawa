import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View, StyleSheet, I18nManager, Pressable, Platform, TouchableWithoutFeedback, TouchableOpacity, PixelRatio, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message'
import Modal from "react-native-modal"

import hafsData from '../../../constant/hafsData_v18.json'
import MuyassarAr from '../../../constant/MuyassarAr.json'
import { ayaList } from '../../../constant/ayaList';

import { useMainStackContext } from '../../../context/MainStackContext';

import StartSoraIcon from '../../../assets/icons/StartSoraIcon';
import BsimAllahIcon from "../../../assets/icons/BsimAllahIcon"
import CloseIcon from '../../../assets/icons/CloseIcon';
import fonts from '../../../assets/fonts';

import colors from '../../../colors';
import QuranSoundPlay from './QuranSoundPlay';
import { useQuranContext } from '../../../context/QuranContext';

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
  const { bottomVisible, changeBottomVisible } = useMainStackContext();
  const { selectedAudioAya, setSelectedAudioAya } = useQuranContext();

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
                  <Text style={[{
                    fontFamily: fontSizeValue(),
                    fontSize: normalize(27),
                    color: colors.black,
                    height: '100%',
                  },
                  isAyaPress && selectedAya && selectedAya.ayaId === ayaText.ayaNo && selectedAya.soraId === ayaText.soraId && { backgroundColor: '#c8c8c8' },
                  selectedAudioAya && selectedAudioAya.ayaId === ayaText.ayaNo && selectedAudioAya.soraId === ayaText.soraId && { backgroundColor: colors.second },
                  ]}
                  >
                    {ayaText.ayaString}
                  </Text>
                </Pressable>
              )
            ))}
          </Pressable>
        ))}

        <View style={{ height: 20, width: '100%', alignSelf: 'center' }} >
          <Text style={{ fontSize: 14, textAlign: 'center', color: colors.black }}>{pageData.page.toString().EntoAr()}</Text>
        </View>
      </Pressable>
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
      {isBlackBackground ? <View style={{ position: 'absolute', zIndex: 10, width: SCREEN_WIDTH, height: SCREEN_HEIGHT, flex: 1 }}>
        <LinearGradient style={{ flex: 1 }} colors={['rgba(0,0,0,0.30)', 'rgba(0,0,0,0.33)']} />
      </View> : null}
    </SafeAreaView>
  )
}

export default AyaHozComponent

const ModalSora = ({
  modalVisible,
  setModalVisible,
  selectedSoraNameAyaNum,
  setSelectedAya,
  setIsTafseerModal,
  setIsBlackBackground,
}) => {

  String.prototype.EntoAr = function () {
    return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  const onCopyHandler = () => {
    setIsBlackBackground(false)
    setModalVisible(false)
    setSelectedAya(null);
    const newData = hafsData.find(({ sora, aya_no }) => selectedSoraNameAyaNum.soraId === sora && selectedSoraNameAyaNum.ayaId === aya_no)
    Clipboard.setString(newData.aya_text + '\n' + `سُورة ${newData.sora_name_ar}`);
    Toast.show({
      type: 'success',
      text1: 'Aya has been copied'
    });
  }

  const onCloseModal = () => {
    setIsBlackBackground(false)
    setModalVisible(false);
    setSelectedAya(null);
  }

  const _onSwipeComplete = () => {
    setModalVisible(false);
    setIsBlackBackground(false);
    setSelectedAya(null);
  }

  const soraTextAyaNumber = () => {
    // return `${ayaList[parseInt(selectedSoraNameAyaNum.soraId) - 1].ar}: ${selectedSoraNameAyaNum.ayaId.toString().EntoAr()}`
    return `سورة ${ayaList[parseInt(selectedSoraNameAyaNum.soraId) - 1].ar} : ${selectedSoraNameAyaNum.ayaId.toString().EntoAr()}`
  }

  const onTafseerPress = () => {
    setModalVisible(false);
  }

  return selectedSoraNameAyaNum && (
    <Modal
      isVisible={modalVisible}
      onSwipeComplete={_onSwipeComplete}
      customBackdrop={
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={modalStyles.flexOne} />
        </TouchableWithoutFeedback>
      }
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={100}
      animationOutTiming={100}
      onModalHide={() => {
        setIsTafseerModal(true);
      }}
    >
      <View style={[modalStyles.container, { position: 'absolute' }]}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='#9F9F9F'
        />
        <TouchableOpacity onPress={onCloseModal} style={[{ position: 'absolute', zIndex: 1, height: 60, top: 0, width: 30 },
        I18nManager.isRTL ? { left: '5%' } : { right: '5%' }]}>
          <View style={{ width: 15, alignSelf: 'center' }}>
            <CloseIcon />
          </View>
        </TouchableOpacity>
        <View style={[modalStyles.firstRowContainer, { height: 60 }]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={modalStyles.firstRowText}>{soraTextAyaNumber()}</Text>
          </View>
        </View>
        <TouchableOpacity style={modalStyles.secondRowContainer} onPress={onCopyHandler}>
          {I18nManager.isRTL ? (
            <Text style={modalStyles.textButtonStyle}>نسخ</Text>
          ) : (
            <Text style={modalStyles.textButtonStyle}>Copy</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={modalStyles.lastRowContainer} onPress={onTafseerPress}>
          <Text style={modalStyles.textButtonStyle}>{I18nManager.isRTL ? 'تفسير' : 'Tafseer'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const ModalTafseer = ({
  isTafseerModal,
  setIsTafseerModal,
  selectedSoraNameAyaNum,
  setSelectedAya,
  setIsBlackBackground
}) => {

  const _onSwipeComplete = () => {
    setIsBlackBackground(false);
    setIsTafseerModal(false);
    setSelectedAya(null);
  }

  const onCloseModal = () => {
    setIsBlackBackground(false);
    setIsTafseerModal(false);
    setSelectedAya(null);
  }

  const tafseerData = () => MuyassarAr.find(item => item.aya === selectedSoraNameAyaNum.ayaId && item.sura === selectedSoraNameAyaNum.soraId)

  const soraTextAyaNumber = () => {
    // return `${ayaList[parseInt(selectedSoraNameAyaNum.soraId) - 1].ar}: ${selectedSoraNameAyaNum.ayaId.toString().EntoAr()}`
    return `سورة ${ayaList[parseInt(selectedSoraNameAyaNum.soraId) - 1].ar} : ${selectedSoraNameAyaNum.ayaId.toString().EntoAr()}`
  }

  return selectedSoraNameAyaNum && (
    <Modal
      isVisible={isTafseerModal}
      onSwipeComplete={_onSwipeComplete}
      customBackdrop={
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={modalStyles.flexOne} />
        </TouchableWithoutFeedback>
      }
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={100}
      animationOutTiming={100}
    >
      <StatusBar barStyle='light-content'
        backgroundColor='#9F9F9F'
      />
      <View style={[modalStyles.container, { maxHeight: SCREEN_HEIGHT / 1.5, position: 'relative' }]}>
        <TouchableOpacity onPress={onCloseModal} style={[{ position: 'absolute', zIndex: 1, height: 60, top: 0, width: 30 },
        I18nManager.isRTL ? { left: '5%' } : { right: '5%' }
        ]}>
          <View style={{ width: 15, alignSelf: 'center' }}>
            <CloseIcon />
          </View>
        </TouchableOpacity>
        <View style={{ height: 60, width: '100%' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            {/* <Text style={{
              fontFamily: I18nManager.isRTL ? fonts.title : fonts.regular,
              color: colors.black,
              fontSize: I18nManager.isRTL ? 20 : 18
            }}>
              {ayaList[parseInt(selectedSoraNameAyaNum.soraId) - 1][I18nManager.isRTL ? 'ar-font' : 'en']}
            </Text>
            <View style={{ width: 10 }} />
            <SoraListIcon
              number={I18nManager.isRTL ? selectedSoraNameAyaNum.ayaId.toString().EntoAr() : selectedSoraNameAyaNum.ayaId}
              isBlack={true}
            /> */}
            <Text style={modalStyles.firstRowText}>{soraTextAyaNumber()}</Text>
          </View>
        </View>
        <View style={{ width: '90%', alignSelf: 'center', height: 2, backgroundColor: '#D9A15B' }} />
        <View style={{ marginVertical: 15, alignSelf: 'center' }}>
          <ScrollView style={{ marginBottom: 60 }}>
            <Text style={{ textAlign: I18nManager.isRTL ? 'left' : 'right', marginHorizontal: '5%', fontSize: 18, color: colors.black }}>{tafseerData().text}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const modalStyles = StyleSheet.create({
  flexOne: { flex: 1 },
  container: {
    width: SCREEN_WIDTH / 1.2,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  firstRowContainer: {},
  firstRowText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.dark,
  },
  secondRowContainer: {
    width: '100%'
  },
  textButtonStyle: {
    textAlign: 'left',
    color: colors.dark,
    marginLeft: 20,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingVertical: 15,
  },
  lastRowContainer: {
    marginBottom: 20,
    width: '100%',
  }
})