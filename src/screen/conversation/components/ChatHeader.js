import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatHeader = ({goBackHandler, userTeacherDInfo}) => {
  return (
    <View style={styles.details}>
      <TouchableOpacity onPress={goBackHandler}>
        <MaterialIcons name="keyboard-backspace" size={22} color={"#000"} />
      </TouchableOpacity>
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${userTeacherDInfo.firstName}+${userTeacherDInfo.lastName}&&background=random`,
        }}
        style={styles.imgProfile}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 14, color: 'black' }}>{userTeacherDInfo.firstName} {userTeacherDInfo.lastName}</Text>
        {/* <Text style={{ fontSize: 12 }}>Online</Text> */}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  imgProfile: {
    height: 43,
    width: 43,
    borderRadius: 43,
    marginLeft: 10,
  },
  details: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
<<<<<<< HEAD
    marginBottom: 10,
=======
    marginVertical: 6,
>>>>>>> 3bf53be3a105dc45041f07c54e26b8a507bad624
  },
});
