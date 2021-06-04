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

const preferences = initializeSharedPreferences('suiteName')

preferences.setBool('keyBool', true)
preferences.setInt('keyInt', 3)
preferences.setFloat('keyFloat', 0.2)
preferences.setString('keyString', 'stringValue')
preferences.setJSON('keyStringJSON', {one: 'one'})


await preferences.getBool('keyBool', true)
await preferences.getInt('keyInt', 1)
await preferences.getFloat('keyFloat', 0.5)
await preferences.getString('keyString', 'default')
await preferences.getJSON('keyStringJSON', {})
await preferences.getKeys()
await preferences.getAll({})
await preferences.removeValue('key')
await preferences.removeAll()

const valueChangeListener = (key: string, value: any) => {
  // will be notified when value did set in preferences
}

preferences.addListener(valueChangeListener)
preferences.removeListener(valueChangeListener)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
