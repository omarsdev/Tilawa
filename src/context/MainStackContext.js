import React, { useContext, createContext, useEffect, useState, useMemo } from 'react';
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

  const changeBottomVisible = () => setBottomVisible(!bottomVisible);

  const changeQuranViewType = async (type) => {
    await storeData('quranViewType', type)
    setQuranViewType(type)
  }

  const quranShowTypeMemo = useMemo(
    () => ({
      quranShowType, setQuranShowType
    }),
    [quranShowType, setQuranShowType]
  );

  const quranViewTypeMemo = useMemo(
    () => ({
      quranViewType, setQuranViewType
    }),
    [quranViewType, setQuranViewType]
  );

  const bottomVisibleMemo = useMemo(
    () => ({
      bottomVisible, setBottomVisible
    }),
    [bottomVisible, setBottomVisible]
  );

  const modalVisibleMemo = useMemo(
    () => ({
      modalVisible, setModalVisible
    }),
    [modalVisible, setModalVisible]
  );

  const selectedAyaDetailsMemo = useMemo(
    () => ({
      selectedAyaDetails, setSelectedAyaDetails
    }),
    [selectedAyaDetails, setSelectedAyaDetails]
  );

  const selectedSoraNameAyaNumMemo = useMemo(
    () => ({
      selectedSoraNameAyaNum, setSelectedSoraNameAyaNum
    }),
    [selectedSoraNameAyaNum, setSelectedSoraNameAyaNum]
  );


  return (
    <MainStackContext.Provider value={{
      changeQuranViewType,
      changeBottomVisible,
      changeOnlyChangeBottomVisible,
      bottomVisibleMemo,
      modalVisibleMemo,
      selectedAyaDetailsMemo,
      selectedSoraNameAyaNumMemo,
      quranViewTypeMemo,
      quranShowTypeMemo,
    }}>
      {children}
    </MainStackContext.Provider>
  )
}
