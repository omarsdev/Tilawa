import React, { useState, useEffect, useMemo } from 'react'
import { Dimensions, I18nManager, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import rnTextSize, { TSFontSpecs } from 'react-native-text-size'
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationActions } from 'react-navigation';

import fonts from '../../../assets/fonts'
import colors from '../../../colors'

import hafsData from "../../../constant/hafsData_v18.json"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const TEXT_SIZE = (SCREEN_WIDTH * 84) / 100
const fontSpecs: TSFontSpecs = {
  fontFamily: fonts.hafs,
  fontSize: 20,
}


const SearchBody = ({ searchAya, isSearchMode, moveToAnotherPage }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation()
  const [searchData, setSearchData] = useState([]);
  const [searchSoraHeight, setSearchSoraHeight] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const dataProvider = useMemo(() => searchData && (
    new DataProvider((r1, r2) => {
      return r1 !== r2
    }).cloneWithRows(searchData)
  ), [searchData]);

  const layoutProvider = useMemo(() => new LayoutProvider(
    (index) => {
      let size = {
        w: SCREEN_WIDTH,
        h: searchSoraHeight[index],
      }
      return size
    },
    (type, dim) => {
      dim.width = type.w
      dim.height = type.h
    }
  ), [searchSoraHeight]);

  const onPressAya = (item) => {
    moveToAnotherPage({
      pageNumber: item.page,
    })
  }

  const rowRenderer = (type, item, index) => {
    return (
      <TouchableOpacity onPress={() => onPressAya(item)} activeOpacity={.8} style={{ flex: 1, height: type.h, width: type.w, backgroundColor: index % 2 === 0 ? 'white' : colors.white, justifyContent: 'center' }}>
        <View style={{ flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse', justifyContent: 'space-between', marginHorizontal: 20 }}>
          <Text style={[{ color: colors.black, fontFamily: fonts.hafs, fontSize: 13, textAlign: I18nManager.isRTL ? "left" : 'right' }]}>{item.sora_name_ar} {item.aya_no}</Text>
          <Text style={[{ color: colors.black, fontFamily: fonts.hafs, fontSize: 13, textAlign: I18nManager.isRTL ? "left" : 'right' }]}>{item.page}</Text>
        </View>
        <Text style={[{ color: colors.black, fontFamily: fonts.hafs, fontSize: 20, textAlign: I18nManager.isRTL ? "left" : 'right', marginHorizontal: 20 }]}>{item.aya_text}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (searchAya.length <= 2) {
      setSearchData([])
      setSearchSoraHeight([])
    } else {
      const newData = hafsData.filter(({ aya_text_emlaey }) => aya_text_emlaey.match(searchAya))
      if (newData.length === 0) return

      const getTheHeight = async () => {
        const soraText = newData.map(e => e.aya_text_emlaey + " " + e.aya_no)

        const heights = await rnTextSize.flatHeights({
          text: soraText,
          width: TEXT_SIZE,
          ...fontSpecs,
        })
        const newDataHeight = heights.map(e => e + 40)
        setSearchSoraHeight(newDataHeight)
      }
      getTheHeight();
      setSearchData(newData)
    }
    return () => {
      setSearchData([])
      setSearchSoraHeight([])
    }
  }, [searchAya])

  return isSearchMode && (
    <View style={[styles.searchModeContainer, { top: 55 + insets.top }]}>
      <View style={styles.searchModeView}>
        {searchSoraHeight.length > 0 && searchData.length > 0 && (
          <TouchableWithoutFeedback style={{ flex: 1, height: '100%' }} onPress={Keyboard.dismiss}>
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRenderer}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  )
}

export default SearchBody

const styles = StyleSheet.create({
  searchModeContainer: {
    position: 'absolute',
    width: "100%",
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .32)',
    flex: 1
  },
  searchModeView: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
})