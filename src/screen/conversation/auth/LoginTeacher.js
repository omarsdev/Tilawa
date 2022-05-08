import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Color from '../../../../Color/Color';

const LoginTeacher = ({navigation}) => {
  const navigateTpTeacherLogin = () => {
    navigation.navigate('LoginUser');
  };

  return (
    <View style={styles.topView}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={styles.mainView}>
        <TextInput
          style={styles.textInput}
          placeholder="     Email"
          placeholderTextColor="#292C30"
        />
        <TextInput
          style={styles.textInput}
          placeholder="     Password"
          placeholderTextColor="#292C30"
        />
        <TouchableOpacity style={styles.touch}>
          <Text style={{fontSize: 16, color: 'white'}}> Log in</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.signup}>No account ? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterTeacher');
            }}>
            <Text style={styles.signup}>SIGNUP </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginTeacher;

const styles = StyleSheet.create({
  topView: {
    height: '100%',
    backgroundColor: Color.white,
    justifyContent: 'center',
  },
  mainView: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 310,
    height: 286.59,
    backgroundColor: Color.white,
  },
  textInput: {
    fontSize: 13,

    backgroundColor: Color.white,
    borderRadius: 5,
    borderRadius: 17,
    width: 310,
    height: 37,
    shadowColor: Color.black,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    width: '100%',
    height: 37,
    backgroundColor: Color.dark,
  },
  signup: {
    fontSize: 13,
    color: Color.dark,
  },
});
