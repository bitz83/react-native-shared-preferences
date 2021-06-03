import * as React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {sharedPreferences} from 'react-native-shared-preferences'

export default function App() {
  const [result, setResult] = React.useState<number | undefined>()

  React.useEffect(() => {
    ;(async () => {
      sharedPreferences.setBool('keyBool', true)
      sharedPreferences.setInt('keyInt', 0.0)
      sharedPreferences.setFloat('keyFloat', 0.2)
      sharedPreferences.setString('keyString', 'null')
      sharedPreferences.setString('keyToRemoveString', 'valueToRemove')
      sharedPreferences.removeValue('keyToRemoveString')
      sharedPreferences.setJSON('keyStringJSON', {one: 'one'})

      console.log('getBool', await sharedPreferences.getBool('keyBool'))
      console.log('getBool1', await sharedPreferences.getBool('keyBool1'))
      console.log('getInt', await sharedPreferences.getInt('keyInt'))
      console.log('getFloat', await sharedPreferences.getFloat('keyFloat'))
      console.log(
        'keyToRemoveString',
        await sharedPreferences.getString('keyToRemoveString', 'valueRemoved'),
      )
      console.log(
        'getString',
        await sharedPreferences.getString('keyString', 'default'),
      )

      console.log('json', await sharedPreferences.getJSON('keyStringJSON', {}))
      console.log('json', await sharedPreferences.getKeys())
      const all = await sharedPreferences.getAll({})
      console.log('json', all)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
