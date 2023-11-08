import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DB_NAME = 'myData';

export interface User {
  id: string;
  name: string;
  email: string;
}

export enum Stores {
  Plans = 'plans',
}

export const addData = async (data: any) => {
  try {
    const value = await AsyncStorage.getItem(DB_NAME);
    if (value !== null) {
      let ls: any[] = JSON.parse(value);
      ls.push(data);
      await AsyncStorage.setItem(DB_NAME, JSON.stringify(ls));
      return;
    } else {
      let ls = [];
      ls.push(data);
      await AsyncStorage.setItem(DB_NAME, JSON.stringify(ls));
      return;
    }
  } catch (error) {}
};

export const getStoreData = async () => {
  try {
    const value = await AsyncStorage.getItem(DB_NAME);
    if (value !== null) {
      // We have data!!
      console.log(value);
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (error) {
    // Error retrieving data
    Alert.alert('errrrr' + JSON.stringify(error));
    return [];
  }
};

export const deleteData = async (id: string) => {
  try {
    const value = await AsyncStorage.getItem(DB_NAME);
    if (value !== null) {
      let ls: any[] = JSON.parse(value);
      const index = ls.findIndex(item => item.id === id);
      if (index >= 0) {
        ls.splice(index, 1);
        AsyncStorage.setItem(DB_NAME, JSON.stringify(ls));
      }
    }
  } catch (error) {}
};
