import {NativeModules, Platform} from 'react-native'

interface SharedPreferencesType {
  setInt(key: string, value: number): void
  setString(key: string, value: string): void
  setJSON(key: string, value: object): void
  setFloat(key: string, value: number): void
  setBool(key: string, value: boolean): void
  synchronize(): void

  getInt(key: string): Promise<number>
  getString(key: string, defaultValue: string): Promise<string>
  getJSON(key: string, defaultValue: object): Promise<object>
  getFloat(key: string): Promise<number>
  getBool(key: string): Promise<boolean>
}

const {SharedPreferences} = NativeModules

const isFloat = (n: any) => {
  return Number(n) === n && n % 1 !== 0
}

class SharedPreferencesImpl implements SharedPreferencesType {
  setBool(key: string, value: boolean): void {
    SharedPreferences.setBool(key, value)
  }

  setFloat(key: string, value: number): void {
    if (value !== 0 && !isFloat(value))
      throw new Error(`Passed value: ${value} is not double type`)
    if (Platform.OS === 'android') {
      SharedPreferences.setFloat(key, value.toString())
      return
    }
    SharedPreferences.setFloat(key, value)
  }

  setInt(key: string, value: number): void {
    if (!Number.isInteger(value))
      throw new Error(`Passed value: ${value} is not integer type`)
    SharedPreferences.setInt(key, value)
  }

  setString(key: string, value: string): void {
    SharedPreferences.setString(key, value)
  }

  setJSON(key: string, value: object) {
    SharedPreferences.setString(key, JSON.stringify(value))
  }

  synchronize() {
    SharedPreferences.synchronize()
  }

  getBool(key: string): Promise<boolean> {
    return SharedPreferences.getBool(key)
  }

  async getFloat(key: string): Promise<number> {
    if (Platform.OS === 'android') {
      return parseFloat(await SharedPreferences.getFloat(key))
    }
    return SharedPreferences.getFloat(key)
  }

  getInt(key: string): Promise<number> {
    return SharedPreferences.getInt(key)
  }

  async getString(key: string, defaultValue: string): Promise<string> {
    const value = await SharedPreferences.getString(key)
    if (!value) return defaultValue
    return value
  }

  async getJSON(key: string, defaultValue: object): Promise<object> {
    const value = await SharedPreferences.getString(key)
    if (!value) return defaultValue
    return JSON.parse(value)
  }
}

export const sharedPreferences =
  new SharedPreferencesImpl() as SharedPreferencesType
