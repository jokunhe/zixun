import React, { useState } from 'react'
import useDebounceFn from '..'
import { Text, TouchableOpacity } from 'react-native'

export default () => {
  const [value, setValue] = useState(0)
  const { run } = useDebounceFn(
    () => {
      setValue(value + 1)
    },
    {
      wait: 500
    }
  )

  return (
    <>
      <Text style={{ marginTop: 16 }}> Clicked count: {value} </Text>
      <TouchableOpacity onPress={run}>
        <Text>Click fast!</Text>
      </TouchableOpacity>
    </>
  )
}
