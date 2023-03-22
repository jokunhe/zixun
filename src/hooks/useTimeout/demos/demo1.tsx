import React, { useState } from 'react'
import { Text } from 'react-native'
import useTimeout from '../index'

export default () => {
  const [state, setState] = useState(1)
  useTimeout(() => {
    setState(state + 1)
  }, 3000)

  return <Text>{state}</Text>
}
