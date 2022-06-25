import React, { useState, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, SafeAreaView, Dimensions, View, ActivityIndicator, I18nManager, StatusBar } from 'react-native'
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

import fonts from '../../assets/fonts';

import colors from '../../colors';

import { useMainStackContext } from '../../context';

import { storeData } from '../../utils';

import QuranPageList from "../../constant/QuranPageList.json"
import hafsData from "../../constant/hafsData_v18.json"

import Sora2Data from "../../constant/2.json"
import AyaHozComponent from './components/AyaHozComponent';
import SearchHeaderHorizontal from './components/SearchHeaderHorizontal';
import SearchBody from './components/SearchBody';
import QuranSoundPlay from './components/QuranSoundPlay';
import { QuranContextProvider, useQuranContext } from '../../context/QuranContext';
import ModalReader from './components/ModalReader';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const QuranSora = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();

  const { soraId, quranTypeViaParams, contentOffsetY, initialIndex, pageNumber } = route.params;

  const quranShowType = initialIndex ? 0 : quranTypeViaParams ? quranTypeViaParams : useMainStackContext().quranShowTypeMemo.quranShowType;

  const { changeBottomVisible } = useMainStackContext()
  const { soraDetailsMemo } = useQuranContext();
  const { soraDetails, setSoraDetails } = soraDetailsMemo;

  const soraScrollRef = useRef(null);

  const [initialIndexState, setInitialIndexState] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchAya, setSearchAya] = useState('');

  const goBackNavigation = () => navigation.goBack()
  const navigateQuranAiScreen = () =>
    navigation.navigate("QuranAi", { soraId: soraDetails.soraId, page: soraDetails.page })


  String.prototype.EntoAr = function () {
    return this.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  const dataProviderQuranHorizontal = useMemo(() => (
    new DataProvider((r1, r2) => {
      return r1.page !== r2.page
    }).cloneWithRows(Sora2Data)
  ), []);

  const layoutProviderQuranHorizontal = useMemo(() => new LayoutProvider(
    (index) => {
      let size = {
        w: SCREEN_WIDTH,
        h: SCREEN_HEIGHT,
      }
      return size
    },
    (type, dim) => {
      dim.width = type.w
      dim.height = type.h
    }
  ), []);

  const rowRendererQuranHoz = (type, item, index) => {
    return (
      <View style={{ flex: 1, height: type.h, width: type.w }}>
        <AyaHozComponent pageNumber={item.page} pageData={Sora2Data[item.page - 1]} index={index} key={index} />
      </View>
    )
  }

  const quranViewHorizontal = async (isPageExists = false) => {
    const searchPage = isPageExists ? soraDetails.page : pageNumber ? pageNumber : soraId;
    const typeSearchPage = 'sora'

    for (let index = 0; index < hafsData.length; index++) {
      if (hafsData[index][typeSearchPage] === searchPage) {
        const newDetailsDataObject = { page: hafsData[index].page, jozz: hafsData[index].jozz, sora_name_ar: hafsData[index].sora_name_ar, sora_name_en: hafsData[index].sora_name_en, soraId: hafsData[index].sora }
        setSoraDetails(newDetailsDataObject)
        setInitialIndexState(newDetailsDataObject.page)
        await storeData("@lastScroll", {
          scrollVertical: null,
          scrollHoz: { pageNumber: newDetailsDataObject.page, soraName: I18nManager.isRTL ? newDetailsDataObject.sora_name_ar : newDetailsDataObject.sora_name_en }
        })
        break;
      }
    }
  }

  const moveToAnotherPage = async (data) => {
    // setInitialIndexState(null)
    // setSoraDetails(null);
    // changeQuranViewType(null);
    setRefresh(true);


    const searchPage = data.pageNumber;
    const typeSearchPage = 'page'

    for (let index = 0; index < hafsData.length; index++) {
      if (hafsData[index][typeSearchPage] === searchPage) {
        const newDetailsDataObject = {
          page: hafsData[index].page,
          jozz: hafsData[index].jozz,
          sora_name_ar: hafsData[index].sora_name_ar,
          sora_name_en: hafsData[index].sora_name_en,
          soraId: hafsData[index].sora
        }

        setSoraDetails(newDetailsDataObject)
        setInitialIndexState(newDetailsDataObject.page)
        await storeData("@lastScroll", {
          scrollVertical: null,
          scrollHoz: {
            pageNumber: newDetailsDataObject.page,
            soraName: I18nManager.isRTL ? newDetailsDataObject.sora_name_ar : newDetailsDataObject.sora_name_en
          }
        })
        break;
      }
    }

    setRefresh(false);
    setIsSearchMode(false);
    changeBottomVisible();
  }

  const onScrollEnd = async (e) => {
    const pageNum = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    const soraDetailsInfo = {
      page: QuranPageList[pageNum].page,
      jozz: QuranPageList[pageNum].jozz,
      sora_name_ar: QuranPageList[pageNum].sora_name_ar[0],
      sora_name_en: QuranPageList[pageNum].sora_name_en[0],
      soraId: QuranPageList[pageNum].sora_id[0]
    }

    setSoraDetails(soraDetailsInfo)

    await storeData("@lastScroll", {
      scrollVertical: null,
      scrollHoz: { pageNumber: soraDetailsInfo.page, soraName: I18nManager.isRTL ? soraDetailsInfo.sora_name_ar : soraDetailsInfo.sora_name_en }
    })
  }

  React.useEffect(() => {
    quranViewHorizontal();
  }, [])

  const handleSearch = (text) => setSearchAya(text);

  return initialIndexState && !refresh ? (
    <View style={styles.viewContainer}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} />

      <View style={{ flex: 1, position: 'relative' }}>

        <SearchHeaderHorizontal
          isSearchMode={isSearchMode}
          setIsSearchMode={setIsSearchMode}
          handleSearch={handleSearch}
          searchAya={searchAya}
          goBackNavigation={goBackNavigation}
          navigateQuranAiScreen={navigateQuranAiScreen}
        />

        <RecyclerListView
          ref={soraScrollRef}
          dataProvider={dataProviderQuranHorizontal}
          layoutProvider={layoutProviderQuranHorizontal}
          rowRenderer={rowRendererQuranHoz}
          showsHorizontalScrollIndicator={false}
          isHorizontal={true}
          pagingEnabled={true}
          initialRenderIndex={initialIndexState - 1}
          style={{ transform: [{ scaleX: !I18nManager.isRTL ? -1 : 1 }] }}
          useWindowScroll={true}
          onMomentumScrollEnd={onScrollEnd}
        />

        <QuranSoundPlay isSearchMode={isSearchMode} soraScrollRef={soraScrollRef} />

        <SearchBody searchAya={searchAya} isSearchMode={isSearchMode} moveToAnotherPage={moveToAnotherPage} />

      </View>
      <Toast />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={[styles.spinnerContainer]}>
        <ActivityIndicator color={colors.dark} />
      </View>
    </SafeAreaView>
  )
}

export default QuranSora;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: colors.dark
  },
  footerView: {
    width: '100%',
    height: 30,
    backgroundColor: colors.dark
  },
  footerViewChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.white,
  },
})  