import React from 'react'
import { Dimensions, Text, View, StyleSheet, I18nManager, TouchableWithoutFeedback, TouchableOpacity, StatusBar } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message'
import Modal from "react-native-modal"

import hafsData from '../../../constant/hafsData_v18.json'
import { ayaList } from '../../../constant/ayaList';

import CloseIcon from '../../../assets/icons/CloseIcon';
import fonts from '../../../assets/fonts';

import colors from '../../../colors';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 390;

const ModalSora = ({
  modalVisible,
  setModalVisible,
  selectedSoraNameAyaNum,
  setSelectedAya,
  setIsTafseerModal,
  setIsBlackBackground,
  pageData
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

export default ModalSora

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