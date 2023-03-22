import React, { useState } from 'react'
import useInterval from '../index'
import { View, Text, TouchableOpacity } from 'react-native'

export default () => {
  const [count, setCount] = useState(0)
  const [interval, setInterval] = useState(1000)

  useInterval(
    () => {
      setCount(count + 1)
    },
    interval,
    { immediate: true }
  )

  return (
    <View>
      <Text> count: {count} </Text>
      <Text style={{ marginTop: 16 }}> interval: {interval} </Text>
      <TouchableOpacity onPress={() => setInterval(interval + 1000)} style={{ marginRight: 8 }}>
        <Text>interval + 1000</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 8 }}
        onPress={() => {
          setInterval(1000)
        }}
      >
        <Text>reset interval</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setInterval(null)
        }}
      >
        <Text>clear</Text>
      </TouchableOpacity>
    </View>
  )
}
