import React from 'react'
import { Text, View, StyleSheet, I18nManager, TouchableWithoutFeedback, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import Modal from "react-native-modal"

import MuyassarAr from '../../../constant/MuyassarAr.json'
import { ayaList } from '../../../constant/ayaList';

import CloseIcon from '../../../assets/icons/CloseIcon';
import fonts from '../../../assets/fonts';

import colors from '../../../colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 390;

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

export default ModalTafseer;

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