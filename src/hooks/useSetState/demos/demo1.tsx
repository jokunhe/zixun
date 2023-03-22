import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import useSetState from '..'

interface State {
  hello: string
  count: number
  [key: string]: any
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: '',
    count: 0
  })

  return (
    <View>
      <Text>{JSON.stringify(state, null, 2)}</Text>
      <View>
        <TouchableOpacity onPress={() => setState({ hello: 'world' })}>
          <Text>set hello</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setState({ foo: 'bar' })}>
          <Text>set foo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setState((prevState) => ({ count: prevState.count + 1 }))}>
          <Text>count + 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
