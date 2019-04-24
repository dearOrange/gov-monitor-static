/**
 * Vue的插件，用来获取和设置sessionStorage存储
 **/
let local = {
  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  fetch(key) {
    return JSON.parse(sessionStorage.getItem(key)) || {}
  }
}

export default {
  install: function(vm) {
    vm.prototype.$local = local
  }
}
