import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import useForceUpdate from '../index'

export default () => {
  const forceUpdate = useForceUpdate()

  return (
    <>
      <Text>Time: {Date.now()}</Text>
      <TouchableOpacity onPress={forceUpdate}>
        <Text>force update</Text>
      </TouchableOpacity>
    </>
  )
}
