import {
  StyleSheet,
  Text,
  Switch,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../../colors';
import { AxiosInstance } from '../../../api/AxiosInstance';
import { KeyboardShift } from '../../../utils/KeyboardShift';
import { useChatContext } from '../../../context/ChatContext';
const Register = ({ navigation }) => {
  const { storeNewTokenData } = useChatContext();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const registerHandler = async () => {
    setLoading(true);
    setError(null)
    await AxiosInstance.post('auth/register', {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
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
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.topView}>
          <Image
            source={require('../../../assets/images/ChatBackground.png')}
            style={styles.imgChat}
          />
          <View style={styles.mainView}>
            <Text style={{ fontSize: 30, textAlign: 'center', color: colors.black, marginBottom: 10 }}>Tilawa</Text>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              placeholderTextColor="black"
              textAlign="left"
              onChangeText={txt => setFirstName(txt)}
              value={firstName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              placeholderTextColor="black"
              textAlign="left"
              onChangeText={txt => setLastName(txt)}
              value={lastName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
              placeholderTextColor="black"
              textAlign="left"
              onChangeText={txt => setEmail(txt)}
              value={email}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="black"
              textAlign="left"
              onChangeText={txt => setPassword(txt)}
              value={password}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginVertical: 10
              }}>
              <Text style={styles.Userr}>User</Text>
              <Switch
                trackColor={{ false: 'green', true: 'gray' }}
                thumbColor={isEnabled ? 'white' : 'white'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.Userr}>Teacher</Text>
            </View>
            <TouchableOpacity style={styles.Touchable} disabled={loading} onPress={registerHandler}>
              {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={colors.white} />
                </View>
              ) : (
                <Text style={{ fontSize: 16, alignSelf: 'center', color: colors.white }}> Sign Up </Text>
              )}

            </TouchableOpacity>
            {error && <Text style={{ textAlign: 'center', color: 'red', marginVertical: 10 }}>{error}</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <Text style={[styles.signup, { color: colors.black }]}>Already account ? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={[styles.signup, { color: colors.black }]}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require('../../../assets/images/ChatBackground.png')}
            style={styles.imgChatlf}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardShift>
  );
};

export default Register;

const styles = StyleSheet.create({
  topView: {
    height: '100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  mainView: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 310,
    // height: '40%',
    backgroundColor: colors.white,
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
  Touchable: {
    borderRadius: 17,
    justifyContent: 'center',
    backgroundColor: colors.dark,
    width: '100%',
    height: 37,
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
  Userr: {
    fontSize: 15,
    color: colors.black,
    marginHorizontal: 10
  },
});
