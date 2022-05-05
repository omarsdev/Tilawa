import React, { Fragment } from 'react'
import { I18nManager, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useMainStackContext } from '../../../context/MainStackContext'

import colors from '../../../colors'
import SearchIcon from '../../../assets/icons/SearchIcon'
import BackIcons from '../../../assets/icons/BackIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const SearchHeaderHorizontal = ({ isSearchMode, setIsSearchMode, handleSearch, searchAya, goBackNavigation }) => {
  const insets = useSafeAreaInsets();

  const { bottomVisible } = useMainStackContext()

  return bottomVisible && (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor={colors.dark} />
      <View style={{
        position: 'absolute', top: 0, right: 0, left: 0, width: "100%", height: 55 + insets.top, backgroundColor: colors.dark, zIndex: 1, flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', paddingHorizontal: '5%', paddingTop: insets.top
      }}>
        <View style={{ position: 'relative', flex: 1 }}>
          {isSearchMode ? (
            <View style={[{ flex: 1, flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse', alignItems: 'center' }, I18nManager.isRTL ? { marginLeft: 50 } : { marginRight: 50 }]}>
              <View style={{ flex: 1, height: 35, backgroundColor: '#D8D8D8', borderRadius: 12, flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' }}>
                <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <SearchIcon color="#1C383B" />
                </View>
                <TextInput
                  style={{ flex: 1, fontSize: 15, height: '100%', color: colors.black, padding: 0 }}
                  autoFocus={true}
                  textAlign="right"
                  onChangeText={handleSearch}
                  value={searchAya}
                  placeholder={'بحث'}
                  placeholderTextColor={"rgba(28, 56,59,0.5)"}
                />
              </View>
              <TouchableOpacity style={[{ paddingHorizontal: 10, alignSelf: 'center' }, I18nManager.isRTL ? { paddingLeft: 20 } : { paddingRight: 20 }]} onPress={() => {
                setIsSearchMode(false)
              }}>
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: colors.white }}>الغاء</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: !I18nManager.isRTL ? 'row-reverse' : 'row', justifyContent: !I18nManager.isRTL ? 'flex-start' : 'flex-end' }}>
              <View style={{ flexDirection: 'row-reverse', height: '100%' }}>

                <View style={{ height: '100%' }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }} onPress={() => {
                    setIsSearchMode(true)
                  }}>
                    <SearchIcon color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <TouchableOpacity style={{
            width: 40,
            // height: 40,
            position: 'absolute',
            left: 0,
            // backgroundColor: 'red',
            height: '100%',
            marginTop: 'auto',
            marginBottom: 'auto',
            transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]
          }} onPress={goBackNavigation}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <BackIcons />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  )
}

export default SearchHeaderHorizontal

const styles = StyleSheet.create({})