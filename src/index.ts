import { BeauOptions, BeauInstance } from './types'
import Dep from './Dep'
import Watcher from './Watcher';

export default class Beau implements BeauInstance {
  $options: BeauOptions = {}
  $el?: Element
  $data: any = {}
  data: { [key: string]: any } = {}

  constructor(options: BeauOptions = {}) {
    this._init(options)
  }

  private _init(options: BeauOptions) {
    this.$options = options

    this.$data = (typeof options.data === 'function') ? options.data() : (options.data || {})
    this._walk(this.$data)

    this._proxy(this.$data)

    if (options.el) {
      this.$el = this._parseDOM(options.el)
    }
  }

  $watch(property: string, handler: () => void) {
    new Watcher(this, property, handler)
  }

  private _walk(obj: any) {
    for (const key in obj) {
      this._makeReactive(obj, key)
    }
  }

  private _makeReactive(obj: any, key: string) {
    const self = this
    let data = obj[key]
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.depend()
        }
        return data
      },
      set(value) {
        data = value
        dep.notify()
      }
    })
  }

  private _syncNode(node: Element, property: string) {
    const updateContent = () => node.textContent = this.$data[property]
    this.$watch(property, updateContent)
    updateContent()
  }

  private _parseDOM(selector: string): Element {
    const target = document.querySelector(selector)
    if (!target) {
      throw new Error(`Failed to mount: ${selector}`)
    }

    const nodes = target.querySelectorAll('[b-text]')
    for (const node of nodes) {
      const property = node.attributes.getNamedItem('b-text') as Attr
      this._syncNode(node, property.value as string)
    }

    return target
  }

  private _proxy(this: BeauInstance, obj: any) {
    for (const key in obj) {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get() {
          return obj[key]
        },
        set(value) {
          obj[key] = value
        }
      })
    }
  }
}
