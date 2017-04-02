import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Search from '@/components/Search'
import User from '@/components/User'
import Linnea from '@/components/Linnea'
import lineChart from '@/components/lineChart'
import hBar from '@/components/hBar'
import dNutCart from '@/components/dNutCart'
// import XX from '@/components/XX'


Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User, hBar,
      props: true
    },
    {
      path: '/linnea',
      name: 'Linnea',
      component: Linnea
    },
  ]
})
