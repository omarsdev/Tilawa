import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Color from '../Color/Color';
import Login from '../Pages/Login';
import {createStackNavigator} from '@react-navigation/stack';

const Chat = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.Toucha}
        onPress={() => {
          navigation.navigate({
            routeName: 'Login',
          });
        }}>
        <Text style={styles.Text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Toucha}
        onPress={() => {
          navigation.navigate({
            routeName: 'Login',
          });
        }}>
        <Text style={styles.Text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: Color.primary,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },

  Toucha: {
    backgroundColor: Color.darkLinear,
    width: '80%',
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  register: {fontSize: 10},
  Text: {
    color: Color.white,
    alignSelf: 'center',
    fontSize: 22,
  },
});

export default Chat;
