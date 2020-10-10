import Vue from 'vue'
import VueRouter from 'vue-router'
import ItemView from '@/views/ItemView'
import ListView from '@/views/ListView'
import LoginView from '@/views/LoginView'
import FaqView from '@/views/FaqView'
import UserView from '@/views/UserView'
import TermView from '@/views/TermView'
import PrivacyView from '@/views/PrivacyView'
import Referral from '@/views/Referral'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: ListView
  },
  {
    name: 'Login',
    path: '/Login',
    component: LoginView
  },

  {
    name: 'Item',
    path: '/item/:id(\\d+)',
    component: ItemView
  },
  {
    name: 'User',
    path: '/user/:address',
    component: UserView
  },
  {
    name: 'Referral',
    path: '/referral',
    component: Referral
  },
  {
    name: 'FAQ',
    path: '/faq',
    component: FaqView
  },
  {
    name: 'Privacy',
    path: '/privacy-policy',
    component: PrivacyView
  },
  {
    name: 'Term',
    path: '/terms-of-us',
    component: TermView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
