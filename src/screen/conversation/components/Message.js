import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from "moment"

import colors from '../../../colors';

const Message = ({ time, isLeft, message }) => {
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

  return (
    <View style={styles.main}>
      <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
        <View style={styles.messageView}>
          <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: colors.second,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
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
});
export default Message;
