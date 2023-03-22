import React, { useState } from 'react'
import useLockFn from '..'
import { Text, TouchableOpacity } from 'react-native'

function mockApiRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

export default () => {
  const [count, setCount] = useState(0)

  const submit = useLockFn(async () => {
    console.warn('Start to submit')
    await mockApiRequest()
    setCount((val) => val + 1)
    console.warn('Submit finished')
  })

  return (
    <>
      <Text>Submit count: {count}</Text>
      <TouchableOpacity onPress={submit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </>
  )
}
