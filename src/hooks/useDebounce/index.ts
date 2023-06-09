import { useState, useEffect } from 'react'
import useDebounceFn from '../useDebounceFn'
import { DebounceOptions } from '../utils'

function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState<T>(value)

  const { run } = useDebounceFn(() => {
    setDebounced(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return debounced
}

export default useDebounce
