import { useRef } from 'react'

export type noop = (...args: any[]) => any

function usePersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const persistFn = useRef<T>()
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return fnRef.current!.apply(this, args)
    } as T
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return persistFn.current!
}

export default usePersistFn
