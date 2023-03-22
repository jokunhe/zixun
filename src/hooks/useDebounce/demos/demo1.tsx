import React, { useState } from 'react'
import useDebounce from '../index'
import { Text, TextInput } from 'react-native'

export default () => {
  const [value, setValue] = useState<string>()
  const debouncedValue = useDebounce(value, { wait: 500 })

  return (
    <>
      <TextInput
        value={value}
        onChangeText={(value) => setValue(value)}
        placeholder='Typed value'
        style={{ width: 280 }}
      />
      <Text style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</Text>
    </>
  )
}
