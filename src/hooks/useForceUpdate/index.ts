import { useCallback, useState } from 'react'

const useForceUpdate = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [, setState] = useState<object>({})

  return useCallback(() => setState({}), [])
}

export default useForceUpdate
