export interface BeauOptions {
  el?: string
  data?: any | (() => any)
}

export type WatcherHandler = ((this: BeauInstance, newVal: any, oldVal: any) => void)

export interface BeauInstance{
  $options: BeauOptions
  $el?: Element
  $data: any
  data: any
 }