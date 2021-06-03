import { NativeModules } from 'react-native';

type SharedPreferencesType = {
  multiply(a: number, b: number): Promise<number>;
};

const { SharedPreferences } = NativeModules;

export default SharedPreferences as SharedPreferencesType;
