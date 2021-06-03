import {NativeModules} from 'react-native'

interface SharedPreferencesType {
  setInt(key: string, value: number): void
  setString(key: string, value: string): void
  setJSON(key: string, value: object): void
  setFloat(key: string, value: number): void
  setBool(key: string, value: boolean): void
  synchronize(): void

  getInt(key: string, defaultValue?: number): Promise<number>
  getString(key: string, defaultValue?: string): Promise<string>
  getJSON<T extends object>(
    key: string,
    defaultValue?: T | null,
  ): Promise<T | null>
  getFloat(key: string, defaultValue?: number): Promise<number>
  getBool(key: string, defaultValue?: boolean): Promise<boolean>
  getKeys(): Promise<Array<string>>
  getAll(): Promise<any>
  removeValue(key: string): void
  removeValues(keys: Array<string>): void
  removeAll(): void
}

const {SharedPreferences} = NativeModules

const isFloat = (n: any) => {
  return Number(n) === n && n % 1 !== 0
}

const validateIsNonNull = (key: string, value: any) => {
  if (value === null || value === undefined)
    throw new Error(`Passed value: ${value} for key: ${key} is not string type`)
}

const VALUE_NOT_EXISTS = 'VALUE_NOT_EXISTS'
class SharedPreferencesImpl implements SharedPreferencesType {
  setBool(key: string, value: boolean): void {
    validateIsNonNull(key, value)
    SharedPreferences.setBool(key, value)
  }

  setFloat(key: string, value: number): void {
    validateIsNonNull(key, value)
    if (value !== 0 && !isFloat(value))
      throw new Error(`Passed value: ${value} key: ${key} is not double type`)
    SharedPreferences.setString(key, value.toString())
  }

  setInt(key: string, value: number): void {
    validateIsNonNull(key, value)
    if (!Number.isInteger(value))
      throw new Error(`Passed value: ${value} key: ${key} is not integer type`)
    SharedPreferences.setInt(key, value)
  }

  setString(key: string, value: string): void {
    validateIsNonNull(key, value)
    SharedPreferences.setString(key, value)
  }

  setJSON(key: string, value: object) {
    validateIsNonNull(key, value)
    SharedPreferences.setString(key, JSON.stringify(value))
  }

  synchronize() {
    SharedPreferences.synchronize()
  }

  async getInt(key: string, defaultValue: number = -1): Promise<number> {
    try {
      return await SharedPreferences.getInt(key)
    } catch (e) {
      if (e.message === VALUE_NOT_EXISTS) return defaultValue
      throw e
    }
  }

  async getBool(key: string, defaultValue: boolean = false): Promise<boolean> {
    try {
      return await SharedPreferences.getBool(key)
    } catch (e) {
      if (e.message === VALUE_NOT_EXISTS) return defaultValue
      throw e
    }
  }

  async getFloat(key: string, defaultValue: number = 0.0): Promise<number> {
    try {
      return parseFloat(await SharedPreferences.getString(key))
    } catch (e) {
      if (e.message === VALUE_NOT_EXISTS) return defaultValue
      throw e
    }
  }

  async getString(key: string, defaultValue: string = ''): Promise<string> {
    try {
      return await SharedPreferences.getString(key)
    } catch (e) {
      if (e.message === VALUE_NOT_EXISTS) return defaultValue
      throw e
    }
  }

  async getJSON<T extends object>(
    key: string,
    defaultValue: T | null = null,
  ): Promise<T | null> {
    try {
      return JSON.parse(await SharedPreferences.getString(key))
    } catch (e) {
      if (e.message === VALUE_NOT_EXISTS) return defaultValue
      throw e
    }
  }

  getKeys(): Promise<Array<string>> {
    return SharedPreferences.getKeys()
  }

  async getAll(): Promise<any> {
    return await SharedPreferences.getAll()
  }

  removeValue(key: string) {
    SharedPreferences.removeValue(key)
  }

  removeValues(keys: Array<string>) {
    SharedPreferences.removeValues(keys)
  }

  removeAll() {
    SharedPreferences.removeAll()
  }
}

export const sharedPreferences =
  new SharedPreferencesImpl() as SharedPreferencesType
