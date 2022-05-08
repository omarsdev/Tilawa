import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import Color from '../../../../Color/Color';

const LoginUser = () => {
  return (
    <View style={styles.ViewTextInput}>
      <TextInput
        style={styles.textInput}
        placeholder="اسم المستخدم"
        placeholderTextColor="black"
      />
      <TextInput
        style={styles.textInput}
        placeholder="كلمة المرور"
        placeholderTextColor="black"
      />
      <TouchableOpacity style={styles.Touchable}>
        <Text style={{fontSize: 20, alignSelf: 'center', color: 'white'}}>
          تسجيل الدخول
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginUser;

const styles = StyleSheet.create({
  ViewTextInput: {
    backgroundColor: Color.dark,
    height: '100%',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: Color.white,
    borderRadius: 5,
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
  Touchable: {
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: Color.darkLinear,
    padding: 10,
    marginTop: 10,
    width: '40%',
  },
});
