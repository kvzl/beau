import { BeauOptions } from './types'


export default class Beau {
  private signals: { [key: string]: Array<() => void> } = {}

  $data: any = {}

  constructor(
    public $options: BeauOptions
  ) {
    this.$data = (typeof $options.data === 'function') ? $options.data() : ($options.data || {})
    this._observeData(this.$data)

    if ($options.el) {
      this._parseDOM($options.el)
    }
  }

  observe(property: string, handler: () => void) {
    if (!this.signals[property]) {
      this.signals[property] = []
    }
    this.signals[property].push(handler)
  }

  private _notify(signal: string) {
    if (!this.signals[signal] || this.signals[signal].length < 1) return
    for (const handler of this.signals[signal]) {
      handler()
    }
  }

  private _observeData(obj: any) {
    for (const key in obj) {
      this._makeReactive(obj, key)
    }
  }

  private _makeReactive(obj: any, key: string) {
    let data = obj[key]
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => data,
      set: (value) => {
        data = value
        this._notify(key)
      }
    })
  }

  private _syncNode(node: Element, property: string) {
    const updateContent = () => node.textContent = this.$data[property]
    this.observe(property, updateContent)
    updateContent()
  }

  private _parseDOM(selector: string) {
    const target = document.querySelector(selector)
    if (!target) {
      throw new Error(`Failed to mount: ${selector}`)
    }

    const nodes = target.querySelectorAll('[b-text]')
    for (const node of nodes) {
      const property = node.attributes.getNamedItem('b-text') as Attr
      this._syncNode(node, property.value as string)
    }
  }
}
