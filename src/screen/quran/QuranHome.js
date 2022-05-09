import React, { useRef } from 'react'
import { StyleSheet, View, SafeAreaView, Image, Platform, Alert, Dimensions, I18nManager, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import QuranBackground from '../../assets/images/QuranBackground.png';

import QuranHeader from './components/QuranHeader';
import QuranBody from './components/QuranBody';

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("window");

const QuranHome = ({ route, navigation }) => {
  const flatListRef = useRef();

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#3D6264', '#1C383B']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} >
      <StatusBar backgroundColor={"#3D6264"} />
      <View style={[styles.imageStyleView, I18nManager.isRTL ? { right: WIDTH_SCREEN * .2 } : { left: WIDTH_SCREEN * .2 }]}>
        <Image source={QuranBackground} style={styles.imageStyle} resizeMode="contain" />
      </View>
      <SafeAreaView style={styles.container}>
        <QuranHeader
          flatListRef={flatListRef}
        />
        <QuranBody flatListRef={flatListRef} />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default QuranHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // marginBottom: Platform.OS === "ios" ? 60 : 70
  },
  imageStyleView: {
    flex: 1,
    position: 'absolute',
    zIndex: 0,
    opacity: .15,
    top: HEIGHT_SCREEN * .1,
    bottom: HEIGHT_SCREEN * .1
  },
  imageStyle: {
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN * .8,
  }
})