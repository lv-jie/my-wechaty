import Vue from 'vue'
import Router from 'vue-router'
import appBody from '@/components/app/app-body';
import Home from '@/pages/home';
import Index from '@/pages/index';
import Login from '@/pages/login';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '',
      name: 'app-body',
      component: appBody,
      children:[
        {
          path:'/home',
          name:'home',
          component:Home
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
