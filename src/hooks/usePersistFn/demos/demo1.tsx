import React, { useState, useCallback, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import usePersistFn from '../index'

export default () => {
  const [count, setCount] = useState(0)

  const showCountPersistFn = usePersistFn(() => console.warn(`Current count is ${count}`))

  const showCountCommon = useCallback(() => console.warn(`Current count is ${count}`), [count])

  return (
    <>
      <TouchableOpacity onPress={() => setCount((c) => c + 1)}>
        <Text>Add Count</Text>
      </TouchableOpacity>
      <Text>You can click the button to see the number of sub-component renderings</Text>
      <View style={{ marginTop: 32 }}>
        <Text>Component with persist function:</Text>
        <ExpensiveTree showCount={showCountPersistFn} />
      </View>
      <View style={{ marginTop: 32 }}>
        <Text>Component with persist function:</Text>
        <ExpensiveTree showCount={showCountCommon} />
      </View>
    </>
  )
}

// some expensive component with React.memo
// eslint-disable-next-line react/prop-types
const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  return (
    <View>
      <Text>Render Count: {renderCountRef.current}</Text>
      <TouchableOpacity onPress={showCount}>
        <Text>showParentCount</Text>
      </TouchableOpacity>
    </View>
  )
})
