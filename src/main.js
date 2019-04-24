// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Local from './plugins/local'
import store from './store'

import config from '@/config'

// 引入mock
if (process.env.NODE_ENV === 'development') {
  require('@/mock')
}

let echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/map/js/china.js')
// require("echarts/lib/chart/radar");

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
// 图例翻译滚动
require('echarts/lib/component/legendScroll')

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(Local)

Vue.config.productionTip = false
axios.defaults.withCredentials = true
// axios.defaults.headers.post['content-Type'] =
//   'appliction/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.common['X-Token'] = sessionStorage.getItem('admin-X-Token')

Vue.prototype.$ajax = axios
Vue.prototype.$http = config.server
Vue.prototype.bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
