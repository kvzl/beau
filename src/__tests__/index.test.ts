import Beau from '../index'

describe('Beau', () => {
  beforeEach(() => {
    const elm = document.createElement('div')
    elm.id = 'app'
    document.body.appendChild(elm)
  })

  it('can set data with plain object', () => {
    const vm = new Beau({
      data: {
        message: 'Hello World'
      }
    })

    expect(vm.$data.message).toBe('Hello World')
  })

  it('can set data with factory function', () => {
    const vm = new Beau({
      data() {
        return {
          message: 'Hello World'
        }
      }
    })

    expect(vm.$data.message).toBe('Hello World')
  })

  it('can detect data changed', () => {
    const vm = new Beau({
      data: {
        message: 'Hello World'
      }
    })
    const handler = jest.fn()
    vm.observe('message', handler)

    vm.$data.message = 'Hello Kitty'
    expect(handler).toBeCalled()
    vm.$data.message = 'Hello Moto'
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('can mount on specified element', () => {
    const vm = new Beau({ el: '#app', })
    expect(vm).toBeTruthy()
  })

  it('can bind data to specified element', () => {
    const dom = document.querySelector('#app') as HTMLDivElement
    dom.innerHTML = `
      <h1 b-text="message"></h1>
    `
    const vm = new Beau({
      el: '#app',
      data: {
        message: 'Hello World'
      }
    })

    const h1 = dom.querySelector('h1') as HTMLHeadingElement
    expect(h1.textContent).toBe('Hello World')
  })

  it('can update the DOM after data changed', () => {
    const dom = document.querySelector('#app') as HTMLDivElement
    dom.innerHTML = `
      <h1 b-text="message"></h1>
    `
    const vm = new Beau({
      el: '#app',
      data: {
        message: 'Hello World'
      }
    })

    vm.$data.message = 'Hello Kitty'

    const h1 = dom.querySelector('h1') as HTMLHeadingElement
    expect(h1.textContent).toBe('Hello Kitty')
  })
})
