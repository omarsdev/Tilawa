import React, { useContext, createContext, useEffect, useState } from 'react';
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
  const [readerVoice, setReaderVoice] = useState(null)

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
    const getQuranReader = async () => {
      const quraRead = await getData('quranReader');
      if (quraRead) setQuranReader(JSON.parse(quraRead))
      else setQuranReader('ar.alafasy')
    }

    // getQuranReader();
    Sound.setCategory('Playback', true); // true = mixWithOthers

    return () => {
      if (control_Online) control_Online.release();
    };
  }, [])

  // useEffect(() => {
  //   const storeQuranReader = async (quranReader) => {
  //     await storeData('quranReader', quranReader);
  //   }

  //   storeQuranReader(quranReader)
  // }, [quranReader])

  return (
    <QuranContext.Provider value={{
      selectedAudioAya, setSelectedAudioAya, quranReader, setQuranReader, startPlaying, stopPlaying, quranReaderType,
      isShouldRefreshPage, setIsShouldRefreshPage,
      readerVoice, setReaderVoice
    }}>
      {children}
    </QuranContext.Provider>
  )
}
