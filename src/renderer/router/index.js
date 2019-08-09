import Vue from 'vue'
import Router from 'vue-router'
import appBody from '@/components/app/app-body';
import WxLogin from '@/pages/wxLogin';
import Home from '@/pages/home';
import Index from '@/pages/index';
import Login from '@/pages/login';
import Room from '@/pages/room';
import Setting from '@/pages/setting';
import Message from '@/pages/message';
import MessageInfo from '@/pages/messageInfo';
import Empty from '@/pages/empty';
import Tip from '@/pages/Tip';
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
        {
          path:'/room',
          name:'room',
          component:Room
        },
        {
          path:'/message',
          name:'message',
          component:Message,
          children:[
            {
              path:'/',
              name:'messageEmpty',
              component:Empty
            },
            {
              path:':id',
              name:'messageInfo',
              component:MessageInfo
            }
          ]
        },
        {
          path:'/tip',
          name:'tip',
          component:Tip
        },
        {
          path:'/setting',
          name:'setting',
          component:Setting
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/wxLogin',
      name: 'wxLogin',
      component: WxLogin
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
