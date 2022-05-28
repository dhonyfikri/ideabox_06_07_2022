import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('failed store data. error: ' + e);
  }
};

const storeAsyncStorageObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('failed store data. error: ' + e);
  }
};

const getAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log('failed get data. error: ' + e);
  }
};

const getAsyncStorageObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('failed get data. error: ' + e);
  }
};

const removeAsyncStorageItem = async key => {
  try {
    AsyncStorage.removeItem(key)
      .then(() => true)
      .catch(() => false);
  } catch (e) {
    console.log('failed get data. error: ' + e);
  }
};

export {
  getAsyncStorage,
  getAsyncStorageObject,
  storeAsyncStorage,
  storeAsyncStorageObject,
  removeAsyncStorageItem,
};
