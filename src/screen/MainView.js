import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';

import Sound from 'react-native-sound';

export default function MainView() {

  let control_Online;
  let onlineSound = 'https://cdn2.islamic.network/quran/audio/64/ar.abdullahbasfar/6236.mp3';

  useEffect(() => {
    Sound.setCategory('Playback', true); // true = mixWithOthers
    return () => {
      if (control_Online) control_Online.release();
    };
  }, []);

  const playSound_onLine = () => {

    control_Online = new Sound(onlineSound, '', (error, _sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      control_Online.play(() => {
        control_Online.release();
      });
    });

  }

  const stopSound_onLine = () => {
    control_Online.stop(() => {
      control_Online.release();
      console.log('Stop Playing...');
    });
  }

  return (

    <View style={styleSheet.MainContainer}>

      <View style={styleSheet.childView}>

        <Text style={styleSheet.titleText}> Play Sound File From Online URL </Text>

        <TouchableOpacity activeOpacity={0.7} style={styleSheet.button} onPress={playSound_onLine}>

          <Text style={styleSheet.buttonText}> Play </Text>

        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styleSheet.button} onPress={stopSound_onLine}>

          <Text style={styleSheet.buttonText}> Stop </Text>

        </TouchableOpacity>

      </View>

    </View>

  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },

  titleText: {
    fontSize: 22,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    color: 'black'
  },

  button: {
    justifyContent: 'center',
    width: '50%',
    padding: 5,
    backgroundColor: '#00B8D4',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 21
  },

  childView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    borderWidth: 2,
    width: '100%',
    borderColor: 'red',
    marginTop: 20
  }

});