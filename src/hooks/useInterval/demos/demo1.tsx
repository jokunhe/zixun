import React, { useState } from 'react'
import { Text } from 'react-native'
import useInterval from '..'

export default () => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return <Text>count: {count}</Text>
}
