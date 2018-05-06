import Dep from '../Dep'

function Watcher() {
  this.update = jest.fn()
  this.addDep = jest.fn()
}

describe('Dep', () => {
  let dep

  beforeEach(() => {
    dep = new Dep()
  })

  it('can keep track of watcher if the watcher hasn\'t been add to Dep.subs', () => {
    const before = dep.subs.length
    const watcher = new Watcher()
    dep.addSub(watcher)
    expect(dep.subs.length).toBe(before + 1)

    dep.addSub(watcher) // should skip
    expect(dep.subs.length).toBe(before + 1)
  })

  it('can notify registered watchers', () => {
    // generate 5 watchers
    const watchers = (new Array(5)).fill(0).map(() => new Watcher)
    for (const watcher of watchers) {
      dep.addSub(watcher)
    }

    dep.notify()

    for (const watcher of watchers) {
      expect(watcher.update).toBeCalled()
    }
  })

  it('can make current watcher keep track of current dep', () => {
    const watcher = new Watcher()
    Dep.target = watcher
    dep.depend()
    Dep.target = null
    dep.depend()
    expect(watcher.addDep).toHaveBeenCalledTimes(1)
  })
})