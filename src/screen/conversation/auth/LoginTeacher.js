import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import colors from '../../../colors';
const LoginTeacher = ({navigation}) => {
  const navigateTpTeacherLogin = () => {
    navigation.navigate('LoginUser');
  };

  return (
    <View style={styles.topView}>
      <Image
        source={require('../../../assets/images/ChatBackground.png')}
        style={styles.imgChat}
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
      <Image
        source={require('../../../assets/images/ChatBackground.png')}
        style={styles.imgChatlf}
      />
    </View>
  );
};

export default LoginTeacher;
LoginTeacher.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  topView: {
    height: '100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  mainView: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: '40%',
    backgroundColor: colors.white,
  },
  textInput: {
    fontSize: 13,

    backgroundColor: colors.white,
    borderRadius: 5,
    borderRadius: 17,
    width: 310,
    height: 37,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
  },
  imgChat: {
    marginTop: '-15%',
    marginHorizontal: '55%',
  },
  imgChatlf: {
    opacity: 0.4,
    marginBottom: '-15%',
    marginHorizontal: '-40%',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    height: 37,
    backgroundColor: colors.dark,
  },
  signup: {
    fontSize: 13,
    color: colors.dark,
  },
});
