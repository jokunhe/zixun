import React, { Dispatch, SetStateAction } from 'react'

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>]

function useSafeState(initialState?: any) {
  const [state, setState] = React.useState(initialState)
  const setCurrentState = React.useCallback((currentState) => setState(currentState), [])

  return [state, setCurrentState] as const
}

export default useSafeState
