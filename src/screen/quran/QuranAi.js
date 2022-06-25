import React, { Fragment, useState, useLayoutEffect, useCallback, useMemo, useEffect } from 'react'
import { StyleSheet, SafeAreaView, LogBox, Dimensions, View, Text, ScrollView, Image } from 'react-native'
import { DataProvider, LayoutProvider } from "recyclerlistview"

import rnTextSize, { TSFontSpecs } from 'react-native-text-size'

import fonts from '../../assets/fonts';
import colors from '../../colors';
import hafsData from "../../constant/hafsData_v18.json"
import SoraHeader from './components/SoraHeader';
import SoraRecyclerListView from './components/SoraRecyclerListView';

import { storeData } from '../../utils';

const Header = React.memo(({ soraId }) => soraId !== 9 && soraId !== 1 && (
  <Image source={require('../../assets/images/bsim-allah-alrhman-alrhem.png')} style={{ width: BISM_ALLAH_WIDTH, height: BISM_ALLAH_HEIGHT, alignSelf: 'center', marginVertical: 10 }} />
))

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const TEXT_SIZE = (SCREEN_WIDTH * 84) / 100
const fontSpecs = {
  fontFamily: fonts.hafs,
  fontSize: 20,
}

const BISM_ALLAH_WIDTH = 93.494 * 1.2
const BISM_ALLAH_HEIGHT = 28.894 * 1.2

const QuranAi = ({ route, navigation }) => {
  const { soraId, y, initialIndex, page } = route.params;

  const sora = useMemo(() => hafsData.filter(e => e.page >= page && e.sora === soraId), [page])

  const [soraPage, setSoraPage] = useState(sora[0].page);
  const [partJozz, setPartJozz] = useState(sora[0].jozz);
  const [heights, setHeights] = useState(null);

  const goBackNavigation = () => navigation.goBack();

  const updatePage = useCallback(
    (pageNum) => {
      if (soraPage !== pageNum) setSoraPage(sora[pageNum].page);
    },
    [soraPage],
  );
  const updateJozz = useCallback(
    (pageNum) => {
      if (partJozz !== pageNum) setPartJozz(sora[pageNum].jozz);
    },
    [partJozz],
  )

  const onScrollHandler = async (event) => {
    await storeData('@lastScroll', { y: event.nativeEvent.contentOffset.y, soraId })
  }

  useLayoutEffect(() => {
    const soraText = sora.map(e => e.aya_text_emlaey + " " + e.aya_no)
    const getTheHeight = async () => {
      const heights = await rnTextSize.flatHeights({
        text: soraText,
        width: TEXT_SIZE,
        ...fontSpecs,
      })
      setHeights(heights.map(e => e + 40))
    }
    getTheHeight();
  }, []);

  const dataProvider = useMemo(() => new DataProvider((r1, r2) => {
    return r1.aya_no !== r2.aya_no
  }).cloneWithRows(sora), [sora]);

  const layoutProvider = useMemo(() => new LayoutProvider(
    (index) => {
      let size = {
        w: SCREEN_WIDTH,
        h: heights[index] + 40,
      }
      return size
    },
    (type, dim) => {
      dim.width = type.w
      dim.height = type.h
    }
  ), [heights]);

  String.prototype.EntoAr = function () {
    return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  const ScrollViewWithHeader = React.useMemo(() => React.forwardRef(({ children, headerComponent, ...props }, ref) => {
    return <ScrollView
      ref={ref}
      {...props}
    >
      {headerComponent}
      {children}
    </ScrollView>;
  }), []);

  return sora && heights && (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>

        <SoraHeader soraName={`سُورة ${sora[0].sora_name_ar}`} goBackNavigation={goBackNavigation} soraPage={`${soraPage}`.EntoAr()} jozz={`${partJozz}`.EntoAr()} />
        <View style={{ flex: 1 }}>
          <SoraRecyclerListView
            sora={sora}
            heights={heights}
            updatePage={updatePage}
            updateJozz={updateJozz}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            initialOffset={y ? y : 0}
            initialRenderIndex={initialIndex ? initialIndex : 0}
            onScroll={onScrollHandler}
            externalScrollView={ScrollViewWithHeader}
          // scrollViewProps={
          //   { headerComponent: <Header soraId={soraId} /> }
          // }
          />
        </View>

        <View style={styles.footerView}>
          <View style={styles.footerViewChild}>
            <Text style={styles.footerText}>{`${soraPage}`.EntoAr()}</Text>
          </View>
        </View>

      </View>

    </SafeAreaView >
  )
}

export default QuranAi;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark
    // paddingBottom: Platform.OS === "ios" ? 60 : 70,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  topSafeArea: { flex: 0, backgroundColor: colors.dark },
  footerView: { width: '100%', height: 30, backgroundColor: colors.dark },
  footerViewChild: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerText: { textAlign: 'center', fontFamily: fonts.bold, fontSize: 15, color: colors.white }
})  