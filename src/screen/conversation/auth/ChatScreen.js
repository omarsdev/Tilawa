import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../../colors';
const ChatScreen = ({navigation}) => {
  return (
    <View>
      <View style={styles.choose}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TypingScreen');
          }}
          style={styles.info}>
          <Image
            source={require('../../../assets/images/cat.jpg')}
            style={styles.imgChatlf}
          />
          <Text>Feras</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: colors.dark,
          borderBottomWidth: 1,
          width: '90%',
          alignSelf: 'center',
        }}></View>
      <View style={{backgroundColor: colors.green}}></View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  choose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '35%',
  },
  info: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgChatlf: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
