import {NativeModules} from 'react-native'

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
  getKeys(): Promise<Array<string>>
  getAll(defaultValue: object): Promise<any>
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
    SharedPreferences.setString(key, value.toString())
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
    return parseFloat(await SharedPreferences.getString(key))
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

  getKeys(): Promise<Array<string>> {
    return SharedPreferences.getKeys()
  }

  async getAll(defaultValue: object): Promise<any> {
    const value = await SharedPreferences.getAll()
    if (!value) return defaultValue
    return value
  }
}

export const sharedPreferences =
  new SharedPreferencesImpl() as SharedPreferencesType
