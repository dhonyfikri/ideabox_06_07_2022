import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('failed to store data');
  }
};

export default storeData;
