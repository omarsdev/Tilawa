import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../colors';

import { AxiosInstance } from '../../../api/AxiosInstance';
import { storeData } from '../../../utils';
import { useChatContext } from '../../../context/ChatContext';
import { KeyboardShift } from '../../../utils/KeyboardShift';

const Login = ({ navigation }) => {
  const { storeNewTokenData } = useChatContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const loginHandler = async () => {
    setLoading(true)
    setError(null)
    await AxiosInstance.post('auth/login', {
      email: email.toLowerCase(),
      password,
      isTeacher: isEnabled,
    })
      .then(async res => storeNewTokenData(res.data))
      .catch(err => setError(err.response.data.error))
      .finally(() => setLoading(false))
  };

  return (

    <KeyboardShift>
      <View style={styles.topView}>
        <Image
          source={require('../../../assets/images/ChatBackground.png')}
          style={styles.imgChat}
        />

        <View style={styles.mainView}>
          {/* <Image
              source={require('../../../assets/images/cat.jpg')}
              style={styles.logo}
            /> */}
          <Text style={{ fontSize: 30, textAlign: 'center', color: colors.black, marginBottom: 10 }}>Tilawa</Text>
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
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ alignSelf: 'center', marginRight: 10, color: colors.black }}>Are You Teacher</Text>
            <Switch
              trackColor={{ false: 'gray', true: 'green' }}
              thumbColor={isEnabled ? 'white' : 'white'}
              // ios_backgroundColor="green"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity onPress={loginHandler} style={styles.touch} disabled={loading}>
            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={colors.white} />
              </View>
            ) : (
              <Text style={{ fontSize: 16, color: 'white' }}>Log in</Text>
            )}
          </TouchableOpacity>
          {error && <Text style={{ textAlign: 'center', color: 'red', marginVertical: 10 }}>{error}</Text>}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
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
    </KeyboardShift>

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
    // height: '100%',
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
    color: colors.black,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
    padding: 0,
    paddingLeft: 20,
    marginVertical: 10
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
