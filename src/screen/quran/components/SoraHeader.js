import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, I18nManager } from 'react-native'

import BackIcons from '../../../assets/icons/BackIcons'

const SoraHeader = ({ goBackNavigation, soraName, favoriteBook, jozz }) => {

  return (
    <View style={styles.headerView}>
      <TouchableOpacity style={styles.pressBackView} onPress={goBackNavigation}>
        <View style={styles.flexCenter}>
          <BackIcons />
        </View>
      </TouchableOpacity>
      <Text style={[styles.soraHeaderText, favoriteBook && { fontFamily: fonts.regular, fontSize: 16 }]}>{soraName}</Text>
      <View style={styles.soraPageNumView}>
        <View style={styles.flexCenter}>
          {jozz && <Text style={styles.pageNumberHeaderText}>جزء {jozz}</Text>}
        </View>
      </View>
    </View>
  )
}

export default SoraHeader

const styles = StyleSheet.create({
  headerView: {
    height: 55,
    paddingHorizontal: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark,
    flexDirection: 'row'
  },
  pressBackView: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 0,
    marginLeft: 20,
    transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]
  },
  soraPageNumView: {
    width: 75,
    height: 60,
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
  flexCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
  soraHeaderText: {
    fontSize: 20,
    fontFamily: fonts.hafs,
    color: 'white',
  },
  pageNumberHeaderText: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: 'white',
  },
})