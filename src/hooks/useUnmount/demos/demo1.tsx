import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import useUnmount from '../index'

function ChildComponent() {
  useUnmount(() => console.warn('卸载子组件'))

  return <Text>子组件</Text>
}

export default function ParentComponent() {
  const [visible, setVisible] = useState(true)

  return (
    <View>
      <Text>父组件</Text>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text>{visible ? '隐藏子组件' : '显示子组件'}</Text>
      </TouchableOpacity>
      {visible && <ChildComponent />}
    </View>
  )
}
