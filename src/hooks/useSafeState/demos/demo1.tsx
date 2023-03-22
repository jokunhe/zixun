import React, { useState, useEffect } from 'react'
import useSafeState from '../index'
import { View, Text, TouchableOpacity } from 'react-native'

const Child = () => {
  const [value, setValue] = useSafeState<string>()
  useEffect(() => {
    setTimeout(() => {
      setValue('从服务端获取的数据')
    }, 5000)
  }, [])

  const text = value || '正在获取数据。。。'

  return <Text>{text}</Text>
}

export default () => {
  const [visible, setVisible] = useSafeState(true)

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(false)}>
        <Text>卸载</Text>
      </TouchableOpacity>
      {visible && <Child />}
    </View>
  )
}
