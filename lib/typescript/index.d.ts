interface SharedPreferencesType {
    setInt(key: string, value: number): void;
    setString(key: string, value: string): void;
    setJSON(key: string, value: object): void;
    setFloat(key: string, value: number): void;
    setBool(key: string, value: boolean): void;
    synchronize(): void;
    getInt(key: string): Promise<number>;
    getString(key: string, defaultValue: string): Promise<string>;
    getJSON(key: string, defaultValue: object): Promise<object>;
    getFloat(key: string): Promise<number>;
    getBool(key: string): Promise<boolean>;
    getKeys(): Promise<Array<string>>;
    getAll(defaultValue: object): Promise<any>;
}
export declare const sharedPreferences: SharedPreferencesType;
export {};
