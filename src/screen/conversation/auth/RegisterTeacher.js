import {
  StyleSheet,
  Text,
  Switch,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../../../../Color/Color';

const RegisterTeacher = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.topView}>
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
          <Text style={{fontSize: 16, alignSelf: 'center', color: Color.white}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterTeacher;

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
    height: 353.6,
    backgroundColor: Color.white,
  },
  textInput: {
    fontSize: 13,
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: Color.white,
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
    height: 37,
    shadowColor: Color.black,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 10,
  },
  Touchable: {
    borderRadius: 17,
    justifyContent: 'center',
    backgroundColor: Color.dark,
    width: '100%',
    height: 37,
  },
  Userr: {
    fontSize: 20,
    color: Color.green,
  },
});
