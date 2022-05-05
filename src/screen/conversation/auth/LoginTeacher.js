import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const LoginTeacher = ({ navigation }) => {

  const navigateTpTeacherLogin = () => {
    navigation.navigate("RegisterTeacher")
  }


  return (
    <View>
      <Text>LoginTeacher</Text>
      <Button title='Register Teacher' onPress={navigateTpTeacherLogin} />
    </View>
  )
}

export default LoginTeacher

const styles = StyleSheet.create({})