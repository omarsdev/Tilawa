import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatHeader = ({navigation}) => {
  return (
    <View style={styles.detailse}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="keyboard-backspace" size={22} />
      </TouchableOpacity>
      <Image
        source={require('../../../assets/images/cat.jpg')}
        style={styles.imgProfile}
      />
      <View style={{marginLeft: '5%'}}>
        <Text style={{fontSize: 14}}>Feras</Text>
        <Text style={{fontSize: 12}}>Online</Text>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  imgProfile: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  detailse: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
});
