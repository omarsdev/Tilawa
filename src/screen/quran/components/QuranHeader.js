import React from 'react'
import { StyleSheet, View, Pressable, TouchableOpacity, StatusBar } from 'react-native'
import DeviceInfo from 'react-native-device-info';

import QuranKaremIcons from "../../../assets/icons/QuranKaremIcons"

const QuranHeader = ({ flatListRef }) => {

  const setToTheTop = () => flatListRef.current?.scrollToOffset(0, 0, true);

  return (
    <View style={styles.headerView}>
      {/* <StatusBar backgroundColor={"#3D6264"} barStyle="light-content" /> */}
      <Pressable onPress={setToTheTop}>
        <QuranKaremIcons />
      </Pressable>
    </View>
  )
}

export default QuranHeader

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})