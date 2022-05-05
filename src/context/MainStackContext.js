import React, { useContext, createContext, useEffect, useState } from 'react';
import { getData, storeData } from '../utils';

const MainStackContext = createContext();
export const useMainStackContext = () => useContext(MainStackContext);

export const MainStackContextProvider = ({ children }) => {
  const [quranShowType, setQuranShowType] = useState(null);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [quranViewType, setQuranViewType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAyaDetails, setSelectedAyaDetails] = useState(null);
  const [selectedSoraNameAyaNum, setSelectedSoraNameAyaNum] = useState(null)

  useEffect(() => {
    const getQuranShowViewTypeStorage = async () => {
      // Show
      const quranShowTypeStorage = await getData('quranShowType');
      setQuranShowType(quranShowTypeStorage ? parseInt(JSON.parse(quranShowTypeStorage)) : 0);
      // View
      const quranShowViewStorage = await getData('quranViewType');
      setQuranViewType(quranShowViewStorage ? parseInt(JSON.parse(quranShowViewStorage)) : 0);
    }
    getQuranShowViewTypeStorage();
  }, [])

  const changeOnlyChangeBottomVisible = () => {
    setBottomVisible(!bottomVisible);
  }

  const changeBottomVisible = () => {
    setBottomVisible(!bottomVisible);
    // if (quranViewType === 1)
    //   setBottomTabBarIndex(!bottomVisible ? 'QuranHoVisible' : 'QuranHoNotVisible')
  }

  const changeQuranViewType = async (type) => {
    await storeData('quranViewType', type)
    setQuranViewType(type)
  }


  return (
    <MainStackContext.Provider value={{
      quranShowType, setQuranShowType,
      quranViewType, setQuranViewType, changeQuranViewType,
      changeBottomVisible, bottomVisible, setBottomVisible, changeOnlyChangeBottomVisible,
      modalVisible, setModalVisible,
      selectedAyaDetails, setSelectedAyaDetails,
      selectedSoraNameAyaNum, setSelectedSoraNameAyaNum
    }}>
      {children}
    </MainStackContext.Provider>
  )
}
