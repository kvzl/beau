import Watcher from '../Watcher'

function VM() {
  this.message = 'Hello World'
}

const vm = new VM()

describe('Watcher', () => {
  it('can update if data has changed', () => {
    const handler = jest.fn()
    const watcher = new Watcher(vm, 'message', handler)
    vm.message = 'Hello Moto'
    watcher.update()
    expect(handler).toBeCalled()
  })

  it('does not update if data hasn\'t changed', () => {
    const handler = jest.fn()
    const watcher = new Watcher(vm, 'message', handler)
    watcher.update()
    expect(handler).not.toBeCalled()
  })
})