import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {initializeSharedPreferences} from 'react-native-shared-preferences'

const prefs = initializeSharedPreferences('suiteName')
export default function App() {
  React.useEffect(() => {
    ;(async () => {
      const now = Date.now()
      prefs.setBool('keyBool', true)
      prefs.setInt('keyInt', 0.0)
      prefs.setInt('date', now)
      prefs.setFloat('keyFloat', 0.2)
      prefs.setString('keyString', 'null')
      prefs.setString('keyToRemoveString', 'valueToRemove')
      prefs.removeValue('keyToRemoveString')
      prefs.setJSON('keyStringJSON', {one: 'one'})
      prefs.removeValues(['keyInt', 'keyFloat'])

      // console.log('bool', await prefs.getAll())
      const d = await prefs.getInt('date')
      console.log(now, d);

      // console.log('getBool', await prefs.getBool('keyBool', false))
      // console.log(
      //   'getBool1',
      //   await prefs.getBool('keyBool1', false),
      // )
      // console.log('getInt', await prefs.getInt('keyInt', 0))
      // console.log('getFloat', await prefs.getFloat('keyFloat', 0))
      // console.log(
      //   'keyToRemoveString',
      //   await prefs.getString('keyToRemoveString', 'valueRemoved'),
      // )
      // console.log(
      //   'getString',
      //   await prefs.getString('keyString', 'default'),
      // )
      //
      // console.log('json', await prefs.getJSON('keyStringJSON', {}))
      // console.log('json', await prefs.getKeys())
      // const all = await prefs.getAll({})
      // console.log('json', all)
    })()
  }, [])

  return <View style={styles.container} />
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
