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
        <Image
          source={require('../../../assets/images/cat.jpg')}
          style={styles.logo}
        />
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}
          style={styles.touch}>
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
    width: '80%',
  },
  textInput: {
    fontSize: 13,
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: colors.white,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
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
  logo: {
    borderRadius: 100,
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
});
