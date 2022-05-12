import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../colors';

const ChatTextInput = () => {
  const [message, setMessages] = useState('');
  return (
    <View style={[styles.mainView]}>
      <View style={styles.textInput}>
        <View style={{ width: '80%' }}>
          <TextInput
            placeholderTextColor="#292C30"
            onChangeText={text => setMessages(text)}
            style={{ padding: 0, margin: 0, height: '100%' }}
            textAlign="right"
          />
        </View>

        <View style={styles.iconTextinput}>
          <TouchableOpacity>
            <Entypo name="attachment" size={22} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name={message ? 'send' : 'microphone'}
              size={22}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatTextInput;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 13,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: '90%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    alignSelf: 'center',
  },
  iconTextinput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '20%',
  },
});
