import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from "react-native-modal"


import { useQuranContext } from '../../../context/QuranContext';
import HafsData from "../../../constant/hafsData_v18.json"
import QuranAudioData from "../../../constant/QuranAudioData.json"
import PlayIcons from '../../../assets/icons/PlayIcons';
import { useMainStackContext } from '../../../context'
import colors from '../../../colors';
import PauseIcons from '../../../assets/icons/PauseIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


const QuranSoundPlay = ({ soraDetails, isSearchMode = false, soraScrollRef }) => {
  const insets = useSafeAreaInsets();

  const { bottomVisible, changeBottomVisible } = useMainStackContext()
  const { selectedAudioAya, setSelectedAudioAya, quranReader, startPlaying, stopPlaying, quranReaderType, isShouldRefreshPage, setIsShouldRefreshPage } = useQuranContext()

  const [isModalChangeReader, setIsModalChangeReader] = useState(false)

  const onPlayHandler = () => {
    changeBottomVisible();
    if (!selectedAudioAya) {
      const findFirstAya = HafsData.find((item) => item.page === soraDetails.page)
      setSelectedAudioAya({ ayaId: findFirstAya.aya_no, soraId: findFirstAya.sora, id: findFirstAya.id });
      startPlaying(findFirstAya.id);
    } else {
      startPlaying(selectedAudioAya.id);
    }
  }

  const onStopHandler = () => {
    stopPlaying();
  }

  const changeReader = () => {
    setIsModalChangeReader(true);
  }

  useEffect(() => {
    if (!isShouldRefreshPage) return;
    soraScrollRef.current?.scrollToOffset(soraScrollRef.current._scrollComponent._offset + SCREEN_WIDTH, 0, true);
    setIsShouldRefreshPage(false)
  }, [isShouldRefreshPage])

  const quranReaderMemo = useMemo(() => QuranAudioData.find(item => item.identifier === quranReader), [quranReader])

  return bottomVisible && !isSearchMode && (
    <Fragment>
      <View style={{ position: 'absolute', zIndex: 1, bottom: insets.bottom + 80, width: "100%" }}>
        <View style={{ borderRadius: 18, alignSelf: 'center', backgroundColor: colors.dark, flex: 1, justifyContent: 'center', width: "60%" }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => {
              !quranReaderType ? onPlayHandler() : onStopHandler();
            }} style={{ height: '100%', paddingVertical: 15, paddingHorizontal: 20 }}>
              {!quranReaderType ? (
                <PlayIcons />
              ) : (
                <View style={{ width: 20, height: 20 }}>
                  <PauseIcons />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{ height: '100%', paddingVertical: 15, paddingHorizontal: 20 }} onPress={changeReader}>
              <Text style={{
                color: colors.white,
                alignSelf: 'center',
              }} >{quranReaderMemo.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ReaderModal isModalChangeReader={isModalChangeReader} setIsModalChangeReader={setIsModalChangeReader} />
    </Fragment >
  )
}

export default QuranSoundPlay

const ReaderModal = ({ isModalChangeReader, setIsModalChangeReader }) => {
  const insets = useSafeAreaInsets();
  const { selectedAudioAya, setSelectedAudioAya, quranReader, setQuranReader } = useQuranContext()

  const onCloseModal = () => {
    setIsModalChangeReader(false);
  }

  const _onSwipeComplete = () => {
    setIsModalChangeReader(false);
  }

  const changeReaderHandler = item => e => {
    setQuranReader(item.identifier);
    setIsModalChangeReader(false);
  }

  return (
    <Modal
      isVisible={isModalChangeReader}
      onSwipeComplete={_onSwipeComplete}
      customBackdrop={
        <TouchableWithoutFeedback onPress={onCloseModal}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      }
      style={{
        margin: 0, marginTop: insets.top + SCREEN_HEIGHT * .2
      }}
      animationInTiming={400}
      animationOutTiming={400}
      propagateSwipe={true}
    >

      <View style={{
        flex: 1, backgroundColor: colors.white, position: 'absolute', width: '100%', height: '100%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
        <ScrollView style={{ flex: 1, marginBottom: insets.bottom }}>
          {QuranAudioData.map((e, i) => (
            <TouchableOpacity onPress={changeReaderHandler(e)} key={i}>
              <Text style={{ marginVertical: 10, textAlign: 'right', marginRight: 20, color: colors.black }}>{e.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({})