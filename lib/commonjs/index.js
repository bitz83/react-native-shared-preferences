"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharedPreferences = void 0;

var _reactNative = require("react-native");

const {
  SharedPreferences
} = _reactNative.NativeModules;

const isFloat = n => {
  return Number(n) === n && n % 1 !== 0;
};

class SharedPreferencesImpl {
  setBool(key, value) {
    SharedPreferences.setBool(key, value);
  }

  setFloat(key, value) {
    if (value !== 0 && !isFloat(value)) throw new Error(`Passed value: ${value} is not double type`);

    if (_reactNative.Platform.OS === 'android') {
      SharedPreferences.setFloat(key, value.toString());
      return;
    }

    SharedPreferences.setFloat(key, value);
  }

  setInt(key, value) {
    if (!Number.isInteger(value)) throw new Error(`Passed value: ${value} is not integer type`);
    SharedPreferences.setInt(key, value);
  }

  setString(key, value) {
    SharedPreferences.setString(key, value);
  }

  setJSON(key, value) {
    SharedPreferences.setString(key, JSON.stringify(value));
  }

  synchronize() {
    SharedPreferences.synchronize();
  }

  getBool(key) {
    return SharedPreferences.getBool(key);
  }

  async getFloat(key) {
    if (_reactNative.Platform.OS === 'android') {
      return parseFloat(await SharedPreferences.getFloat(key));
    }

    return SharedPreferences.getFloat(key);
  }

  getInt(key) {
    return SharedPreferences.getInt(key);
  }

  async getString(key, defaultValue) {
    const value = await SharedPreferences.getString(key);
    if (!value) return defaultValue;
    return value;
  }

  async getJSON(key, defaultValue) {
    const value = await SharedPreferences.getString(key);
    if (!value) return defaultValue;
    return JSON.parse(value);
  }

  getKeys() {
    return SharedPreferences.getKeys();
  }

  async getAll(defaultValue) {
    const value = await SharedPreferences.getAll();
    if (!value) return defaultValue;
    return value;
  }

}

const sharedPreferences = new SharedPreferencesImpl();
exports.sharedPreferences = sharedPreferences;
//# sourceMappingURL=index.js.map