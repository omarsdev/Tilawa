import React, { useState, useRef, Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import moment from "moment"

import colors from '../../../colors';
import { AxiosInstance } from '../../../api/AxiosInstance';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { Alert } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Message = ({ time, isLeft, message, type }) => {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  const [videoLoading, setVideoLoading] = useState(true);
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(true)
  const videoRef = useRef(null);

  let control_Online;
  const audioRef = useRef(null)

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [soundState, setSoundState] = useState({
    playState: 'paused', //playing, paused
    playSeconds: 0,
    duration: 0
  })

  const isOnLeft = type => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#D5D5D5',
      };
    } else if (isLeft && type === 'message') {
      return {
        color: colors.black,
      };
    } else if (isLeft && type === 'time') {
      return {
        color: colors.black,
      };
    } else {
      return {
        alignSelf: 'flex-end',
        backgroundColor: colors.second,
      };
    }
  };

  useEffect(() => {

  }, [])

  const startPlayingAudio = () => {
    setIsAudioPlaying(true);

    audioRef.current.play(() => {
      setIsAudioPlaying(false);
      setSoundState({ ...soundState, playSeconds: 0 });
    });
  }

  const stopPlaying = (id) => {
    audioRef.current.stop(() => {
      setIsAudioPlaying(false);
    });
  }

  useEffect(() => {
    let timeout
    clearInterval(timeout);
    if (!isAudioPlaying) return;

    timeout = setInterval(() => {
      if (audioRef.current && audioRef.current.isLoaded() && soundState.playState == 'playing') {
        audioRef.current.getCurrentTime((seconds, isPlaying) => {
          setSoundState({ ...soundState, playSeconds: seconds });
        })
      }
    }, 100);

    return () => {
      clearInterval(timeout);
    }

  }, [isAudioPlaying])

  useEffect(() => {
    if (message.startsWith('http') && message.endsWith('wav')) {
      Sound.setCategory('Playback', true);

      audioRef.current = new Sound(message, '', (error, _sound) => {
        if (error) {
          Alert.alert('error' + error.message);
          return;
        }

        setSoundState({
          ...soundState,
          playState: "playing",
          duration: audioRef.current.getDuration()
        })
      });

      return () => {
        if (audioRef.current) audioRef.current.release();
      };
    }
  }, [message])

  return (
    <View style={styles.main}>
      {message.startsWith('http') && message.endsWith('jpg') ? (
        <Fragment>
          {(isPhotoLoading === true || isPhotoLoading === null) && (
            <View style={[styles.messageContainer, styles.loaderImageView, isOnLeft('messageContainer')]}>
              <ActivityIndicator />
              <View style={styles.timeViewImage}>
                <Text style={styles.timeTextImage}>{time}</Text>
              </View>
            </View>
          )}
          <View style={[styles.photoContainerView, isOnLeft('messageContainer')]}>
            <Image
              style={[styles.photoView, { display: isPhotoLoading ? 'none' : 'flex' }]}
              onLoadStart={() => setIsPhotoLoading(true)}
              onLoadEnd={() => setIsPhotoLoading(false)}
              source={{ uri: message }}
            />
            <View style={styles.timeViewImage}>
              <Text style={styles.timeTextImage}>{time}</Text>
            </View>
          </View>
        </Fragment>
      ) : (message.startsWith('http') && message.endsWith('mov')) ? (
        <Fragment>
          {(isPhotoLoading === true || isPhotoLoading === null) && (
            <View style={[styles.messageContainer, styles.loaderImageView, isOnLeft('messageContainer')]}>
              <ActivityIndicator />
              <View style={styles.timeViewImage}>
                <Text style={styles.timeTextImage}>{time}</Text>
              </View>
            </View>
          )}
          <View style={[styles.photoContainerView, isOnLeft('messageContainer')]}>
            <Video
              ref={videoRef}
              source={{ uri: message }}
              resizeMode='cover'
              style={styles.photoView}
              onBuffer={(data) => {
                if (data.isBuffering) {
                  setVideoLoading(true)
                } else {
                  setVideoLoading(false)
                }
              }}
              onLoad={() => {
                setVideoLoading(false)
                setIsVideoEnd(false)
              }}
              onLoadStart={() => setVideoLoading(true)}
              onEnd={() => {
                setIsVideoEnd(true);

              }}
              repeat={false}
              playWhenInactive={false}
              autoplay={false}
              paused={isVideoPaused}
            />
            <View style={styles.timeViewImage}>
              <Text style={styles.timeTextImage}>{time}</Text>
            </View>
            <View style={{ position: 'absolute', zIndex: 1, top: 0, left: 0, right: 0, bottom: 0 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {videoLoading && <ActivityIndicator />}
                {isVideoEnd && (
                  <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                    videoRef.current.seek(0);
                    setIsVideoEnd(false)
                  }}>
                    <MaterialCommunityIcons
                      name={"reload"}
                      size={50}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                )}
                {isVideoPaused && !videoLoading && (
                  <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                    videoRef.current.seek(0);
                    setIsVideoPaused(false);
                  }}>
                    <MaterialCommunityIcons
                      name={"play"}
                      size={50}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Fragment>
      ) : message.startsWith('http') && message.endsWith('wav') ? (
        <View style={[styles.messageContainer, isOnLeft('messageContainer'), { flexDirection: 'row' }]}>
          <TouchableOpacity style={{ width: 40 }} onPress={() => isAudioPlaying ? stopPlaying() : startPlayingAudio()}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name={isAudioPlaying ? "pause" : "play"}
                size={30}
                color={"#000"}
              />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Slider
              style={{ width: 200, height: 30 }}
              minimumValue={0}
              maximumValue={soundState.duration}
              value={soundState.playSeconds}
              minimumTrackTintColor={colors.white}
              maximumTrackTintColor="#000000"
              disabled={true}
            />
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontSize: 10, color: colors.black }}>{soundState.playSeconds.toFixed(1)}</Text>
              <Text style={{ fontSize: 10, color: colors.black }} >{soundState.duration.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.messageContainer, isOnLeft('messageContainer'), { flexDirection: 'row' }]}>
          <View style={styles.messageView}>
            <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingVertical: 3,
    // marginVertical: 1,
  },
  messageContainer: {
    backgroundColor: colors.second,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: colors.black,
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: colors.black,
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  photoView: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  photoContainerView: { maxWidth: '80%', alignSelf: 'flex-end', borderRadius: 10, position: 'relative', marginHorizontal: 10, },
  timeViewImage: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    right: 10
  },
  timeTextImage: {
    color: colors.white,
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  loaderImageView: {
    flexDirection: 'row', width: '100%',
    height: 300,
    justifyContent: "center",
    alignItems: 'center',
    position: 'relative'
  }
});
export default Message;
