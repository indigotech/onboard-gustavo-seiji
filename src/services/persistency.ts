import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageItem = async (key: string) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    return error;
  }
};

export const setStorageItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    return error;
  }
};
