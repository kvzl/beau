import Beau from '../dist/beau'

const vm = new Beau({
  el: '#app',
  data() {
    return {
      message: 'Hello World'
    }
  }
})

vm.observe('message', () => {
  console.log('message: ', vm.$data.message)
})

vm.$data.message = 'Hello Kitty'
vm.$data.message = 'Hello Moto'