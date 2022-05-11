import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../../../colors';

const TypingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.mainView}>
        <View style={styles.detailse}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/cat.jpg')}
            style={styles.imgProfile}
          />
          <View style={{ marginLeft: '5%' }}>
            <Text style={{ fontSize: 14 }}>Feras</Text>
            <Text style={{ fontSize: 12 }}>Online</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.dark,
            borderBottomWidth: 0.4,
            width: '90%',
            alignSelf: 'center',
          }}></View>
        <View style={{ height: '85%' }}>
          <Text>hi</Text>
        </View>
        <View style={styles.textInput}>
          <View style={{ width: '80%' }}>
            <TextInput
              placeholder="hiiiiiiiiiiii"
              placeholderTextColor="#292C30"
            />
          </View>
          <View style={styles.iconTextinput}>
            <TouchableOpacity>
              <Entypo name="attachment" size={22} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="send" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TypingScreen;

const styles = StyleSheet.create({
  mainView: {
    height: '90%',
    justifyContent: 'space-between',
  },

  imgProfile: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  detailse: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: 13,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: '90%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    alignSelf: 'center',
  },
  iconTextinput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '20%',
  },
});
