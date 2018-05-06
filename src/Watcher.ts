import Dep from './Dep'
import { BeauInstance, WatcherHandler } from './types'

export default class Watcher {
  deps: Dep[] = []
  vm: BeauInstance
  getter: () => void
  value: any
  callback: WatcherHandler

  constructor(vm: BeauInstance, exp: string, callback: WatcherHandler) {
    this.vm = vm
    this.callback = callback
    // @ts-ignore: I don't know how to write correct type to make compiler happy
    this.getter = () => vm[exp]
    this.value = this.get()
  }

  get() {
    // set current watcher to itself
    Dep.target = this
    const value = this.getter.call(this.vm)
    Dep.target = null
    return value
  }

  addDep(dep: Dep) {
    if (this.deps.indexOf(dep) === -1) {
      // Add watcher itself to dep's sub list
      dep.addSub(this)
      // track dep
      this.deps.push(dep)
    }
  }

  run() {
    const value = this.get()
    if (value !== this.value) {
      this.callback.call(this.vm, value, this.value)
    }
  }

  update() {
    this.run()
  }
}
