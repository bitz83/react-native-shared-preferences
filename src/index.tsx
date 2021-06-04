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
  getJSON(key: string, defaultValue?: any | null): Promise<any | null>
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

type Listener = (key: string, value: any) => void

const VALUE_NOT_EXISTS = 'VALUE_NOT_EXISTS'
class SharedPreferencesImpl implements SharedPreferencesType {
  private listeners: Array<Listener> = []

  addListener(listener: Listener) {
    const exists = this.listeners.find((l) => l === listener)
    if (exists) return
    this.listeners.push(listener)
  }

  removeListener(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  private notifyValueSaved(key: string, value: any) {
    for (let listener of this.listeners) listener(key, value)
  }

  setBool(key: string, value: boolean): void {
    validateIsNonNull(key, value)
    SharedPreferences.setBool(key, value)
    this.notifyValueSaved(key, value)
  }

  setFloat(key: string, value: number): void {
    validateIsNonNull(key, value)
    if (value !== 0 && !isFloat(value))
      throw new Error(`Passed value: ${value} key: ${key} is not double type`)
    SharedPreferences.setString(key, value.toString())
    this.notifyValueSaved(key, value)
  }

  setInt(key: string, value: number): void {
    validateIsNonNull(key, value)
    if (!Number.isInteger(value))
      throw new Error(`Passed value: ${value} key: ${key} is not integer type`)
    SharedPreferences.setInt(key, value)
    this.notifyValueSaved(key, value)
  }

  setString(key: string, value: string): void {
    validateIsNonNull(key, value)
    SharedPreferences.setString(key, value)
    this.notifyValueSaved(key, value)
  }

  setJSON(key: string, value: object) {
    validateIsNonNull(key, value)
    SharedPreferences.setString(key, JSON.stringify(value))
    this.notifyValueSaved(key, value)
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

  async getJSON(
    key: string,
    defaultValue: any | null = null,
  ): Promise<any | null> {
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
