import {
  StyleSheet,
  Text,
  Switch,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../colors';
const RegisterTeacher = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.topView}>
      <Image
        source={require('../../../assets/images/ChatBackground.png')}
        style={styles.imgChat}
      />
      <View style={styles.mainView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.Userr}>User</Text>
          <Switch
            trackColor={{false: 'green', true: 'gray'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.Userr}>Teacher</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="   First Name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="   Last Name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="   E-mail"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="   Password"
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.Touchable}>
          <Text
            style={{fontSize: 16, alignSelf: 'center', color: colors.white}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../assets/images/ChatBackground.png')}
        style={styles.imgChatlf}
      />
    </View>
  );
};

export default RegisterTeacher;

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
    height: '40%',
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
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
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
    fontSize: 20,
    color: colors.green,
  },
});
