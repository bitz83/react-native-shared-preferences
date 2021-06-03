# react-native-shared-preferences

Shared Preferences Implementation for IOS and Android

## Installation

```sh
npm install react-native-shared-preferences
```

## Usage

```ts
import {sharedPreferences} from 'react-native-shared-preferences'

// ...

sharedPreferences.setBool('keyBool', true)
sharedPreferences.setInt('keyInt', 3)
sharedPreferences.setFloat('keyFloat', 0.2)
sharedPreferences.setString('keyString', 'stringValue')
sharedPreferences.setJSON('keyStringJSON', {one: 'one'})


await sharedPreferences.getBool('keyBool', true)
await sharedPreferences.getInt('keyInt', 1)
await sharedPreferences.getFloat('keyFloat', 0.5)
await sharedPreferences.getString('keyString', 'default')
await sharedPreferences.getJSON('keyStringJSON', {})
await sharedPreferences.getKeys()
await sharedPreferences.getAll({})
await sharedPreferences.removeValue('key')
await sharedPreferences.removeAll()
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
