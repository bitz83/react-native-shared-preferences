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


await sharedPreferences.getBool('keyBool')
await sharedPreferences.getInt('keyInt')
await sharedPreferences.getFloat('keyFloat')
await sharedPreferences.getString('keyString', 'default')
await sharedPreferences.getJSON('keyStringJSON', {})
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
