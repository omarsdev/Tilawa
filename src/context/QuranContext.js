import React, { useContext, createContext, useEffect, useState, useMemo } from 'react';
import Sound from 'react-native-sound';

import hafsData from "../constant/hafsData_v18.json"

import { getData, storeData } from '../utils';

const QuranContext = createContext();
export const useQuranContext = () => useContext(QuranContext);

let control_Online;

export const QuranContextProvider = ({ children }) => {
  const [selectedAudioAya, setSelectedAudioAya] = useState(null);
  const [quranReader, setQuranReader] = useState('ar.alafasy');
  const [quranReaderType, setQuranReaderType] = useState(false);
  const [isShouldRefreshPage, setIsShouldRefreshPage] = useState(false);
  const [soraDetails, setSoraDetails] = useState(null);

  const startPlaying = (id, quality = 64) => {
    if (!quranReaderType) setQuranReaderType(true)

    const ayaId = id;

    control_Online = new Sound(`https://cdn2.islamic.network/quran/audio/${quality}/${quranReader}/${ayaId}.mp3`, '', (error, _sound) => {
      if (error) {
        alert('error' + error.message);
        // startPlaying(ayaId, 32)
        setQuranReaderType(false)
        return;
      }

      let nextIdDetails;
      let idDetails;

      if (ayaId + 1 <= 6236) {
        nextIdDetails = hafsData[ayaId + 1 - 1]
        idDetails = hafsData[ayaId - 1]
      }

      control_Online.play(() => {
        control_Online.release();
        if (ayaId + 1 <= 6236) {
          if (nextIdDetails.page !== idDetails.page) {
            setIsShouldRefreshPage(true)
          }
          setSelectedAudioAya({ ayaId: nextIdDetails.aya_no, soraId: nextIdDetails.sora, id: nextIdDetails.id })
          startPlaying(nextIdDetails.id)
        } else {
          setSelectedAudioAya(null)
          setQuranReaderType(false)
        }
      });
    });
  }

  const stopPlaying = (id) => {
    control_Online.stop(() => {
      setQuranReaderType(false)
    });
  }

  useEffect(() => {
    Sound.setCategory('Playback', true);

    return () => {
      if (control_Online) control_Online.release();
    };
  }, [])

  const selectedAudioAyaMemo = useMemo(
    () => ({
      selectedAudioAya, setSelectedAudioAya
    }),
    [selectedAudioAya, setSelectedAudioAya]
  );

  const quranReaderMemo = useMemo(
    () => ({
      quranReader, setQuranReader
    }),
    [quranReader, setQuranReader]
  );

  const quranReaderTypeMemo = useMemo(
    () => ({
      quranReaderType, setQuranReaderType
    }),
    [quranReaderType, setQuranReaderType]
  );

  const isShouldRefreshPageMemo = useMemo(
    () => ({
      isShouldRefreshPage, setIsShouldRefreshPage
    }),
    [isShouldRefreshPage, setIsShouldRefreshPage]
  );

  const soraDetailsMemo = useMemo(
    () => ({
      soraDetails, setSoraDetails
    }),
    [soraDetails]
  );


  return (
    <QuranContext.Provider value={{
      startPlaying, stopPlaying,
      selectedAudioAyaMemo,
      quranReaderMemo,
      quranReaderTypeMemo,
      isShouldRefreshPageMemo,
      soraDetailsMemo
    }}>
      {children}
    </QuranContext.Provider>
  )
}
