import React, { useState } from 'react'
import useCreation from '..'
import { Text, TouchableOpacity } from 'react-native'

class Foo {
  constructor() {
    this.data = Math.random()
  }

  data: number
}

export default function () {
  const foo = useCreation(() => new Foo(), [])
  const [, setFlag] = useState({})

  return (
    <>
      <Text>{foo.data}</Text>
      <TouchableOpacity onPress={() => setFlag({})}>
        <Text>Rerender</Text>
      </TouchableOpacity>
    </>
  )
}
