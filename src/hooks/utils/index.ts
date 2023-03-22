/** 判断是否函数 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function'
}

/** 线程睡眠 */
export function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/** 防抖选项 */
export interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}

/** 节流选项 */
export interface ThrottleOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
}
