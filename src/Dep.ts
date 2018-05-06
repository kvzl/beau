import Watcher from './Watcher'

export default class Dep {
  static target: Watcher | null
  subs: Watcher[] = []

  addSub(sub: Watcher) {
    if (this.subs.indexOf(sub) === -1) {
      this.subs.push(sub)
    }
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    for (const sub of this.subs) {
      sub.update()
    }
  }
}