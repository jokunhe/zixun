import React, { useEffect, useState } from 'react'
import useUpdateEffect from '../index'
import { Text, TouchableOpacity } from 'react-native'

export default () => {
  const [count, setCount] = useState(0)
  const [effectCount, setEffectCount] = useState(0)
  const [updateEffectCount, setUpdateEffectCount] = useState(0)

  useEffect(() => {
    setEffectCount((c) => c + 1)
  }, [count])

  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1)
    return () => {
      // do something
    }
  }, [count]) // you can include deps array if necessary

  return (
    <>
      <Text>effectCount: {effectCount}</Text>
      <Text>updateEffectCount: {updateEffectCount}</Text>
      <TouchableOpacity onPress={() => setCount((c) => c + 1)}>
        <Text>reRender</Text>
      </TouchableOpacity>
    </>
  )
}
