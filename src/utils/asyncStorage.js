import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error from asyncStorage,js storeLocationData Function', error);
  }
};

export const getData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return data;
    }
  } catch (error) {
    console.log('error from asyncStorage,js getData Function', error);
  }
};

export const deleteData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('error from asyncStorage,js remove data Function', error);
  }
};

export const handleAllStorage = async () => {
  const keys = await AsyncStorage.getAllKeys().then((res) => console.log(res)).catch(err => { console.log("Error while get all the keys") })
}