import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import colors from '../../../colors';

import {AxiosInstance} from '../../../api/AxiosInstance';
import {storeData} from '../../../utils';
import {useChatContext} from '../../../context/ChatContext';

const Login = ({navigation}) => {
  const {storeNewTokenData} = useChatContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    await AxiosInstance.post('auth/login', {
      email: email.toLowerCase(),
      password: password.toLowerCase(),
      isTeacher: false,
    })
      .then(async res => {
        // await storeData('token', { token: res.data.token, type: res.data.type });
        storeNewTokenData(res.data);
        navigation.navigate('ChatScreen');
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
            placeholder="Email"
            placeholderTextColor="#292C30"
            textAlign="left"
            onChangeText={txt => setEmail(txt)}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#292C30"
            textAlign="left"
            onChangeText={txt => setPassword(txt)}
            value={password}
          />
          <TouchableOpacity onPress={loginHandler} style={styles.touch}>
            <Text style={{fontSize: 16, color: 'white'}}> Log in</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.signup}>No account ? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
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
    </SafeAreaView>
  );
};

export default Login;

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
    padding: 0,
    paddingLeft: 20,
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
