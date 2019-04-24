import Vue from 'vue'
import Router from 'vue-router'
//import Login from '@/components/login'
// import Main from '@pages/main'
// import Entrepot from '@pages/entrepot'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@pages/login'], resolve)
const Main = resolve => require(['@pages/main'], resolve)
const Home = resolve => require(['@pages/home'], resolve)
const Entrepot = resolve => require(['@pages/entrepot'], resolve)
const Bulktemp = resolve => require(['@pages/bulktemp'], resolve)
const CarInfo = resolve => require(['@pages/carinfo'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/entrepot',
      name: 'Entrepot',
      component: Entrepot
    },
    {
      path: '/bulktemp',
      name: 'Bulktemp',
      component: Bulktemp
    },
    {
      path: '/carinfo',
      name: 'CarInfo',
      component: CarInfo
    }
  ]
})
