import React, { useCallback, useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Dimensions, Platform, I18nManager } from 'react-native';
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { useNavigation } from '@react-navigation/native';

import SoraListIcon from '../../../assets/icons/SoraListIcon'
import { ayaList } from '../../../constant/ayaList';
import fonts from "../../../assets/fonts";
import colors from '../../../colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

let InitialScroll = 0;

const QuranBody = ({ flatListRef }) => {
  const navigation = useNavigation();

  const navigateToAnotherScreen = id => e => {
    navigation.navigate("QuranSora", {
      quranTypeViaParams: 1,
      soraId: id.id
    })
  }

  const rerenderItem = (type, item) => {
    return (
      <View style={{ height: type.h, width: type.w }}>
        <TouchableOpacity onPress={navigateToAnotherScreen(item)} activeOpacity={.6} style={{ flex: 1, justifyContent: 'center' }}>
          <View style={[styles.row]}>
            <View style={styles.englishRow}>
              <SoraListIcon number={item.id} />
              <Text style={styles.textEn}>{item.en}</Text>
            </View>
            <Text style={styles.textAr}>سُورة {item.ar}</Text>
          </View>
        </TouchableOpacity>
        {item.id !== 114 && <View style={styles.breakLine} />}
      </View>
    )
  }

  const dataProvider = useMemo(() => new DataProvider((r1, r2) => {
    return r1.id !== r2.id
  }).cloneWithRows(ayaList))

  const layoutProvider = new LayoutProvider(
    (index) => {
      let size = {
        w: SCREEN_WIDTH,
        h: 70,
      }
      return size
    },
    (type, dim) => {
      dim.width = type.w
      dim.height = type.h
    }
  )


  return (
    <View style={styles.container}>
      <RecyclerListView
        ref={flatListRef}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rerenderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default QuranBody

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flex: 1
  },
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : "row",
    marginHorizontal: 30,
    justifyContent: 'space-between'
  },
  englishRow: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : "row",
    marginTop: 4,
  },
  viewParentIcons: {
    width: 28,
    height: 26,
    position: 'absolute',
    zIndex: 1,
  },
  viewIcons: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcons: {
    color: colors.white,
    fontSize: 10,
    fontFamily: fonts.regular,
  },
  textAr: {
    fontFamily: fonts.hafs,
    color: colors.white,
    fontSize: 20,
  },
  textEn: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: 18,
  },
  breakLine: {
    marginVertical: 9,
    height: 1,
    backgroundColor: colors.white,
    marginHorizontal: 20,
  }
})