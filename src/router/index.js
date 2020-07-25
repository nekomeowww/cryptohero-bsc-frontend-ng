import Vue from "vue";
import VueRouter from "vue-router";
import ItemView from '@/views/ItemView';
import ListView from '@/views/ListView';
import LoginView from '@/views/LoginView';
import FaqView from '@/views/FaqView';
import UserView from '@/views/UserView';
import TermView from '@/views/TermView';
import PrivacyView from '@/views/PrivacyView';
import BirthdayGiftView from '@/views/BirthdayGiftView';

Vue.use(VueRouter);

const routes = [
  {
    name: 'Home',
    path: '/',
    component: ListView,
  },
  {
    name: 'Login',
    path: '/Login',
    component: LoginView,
  },

  {
    name: 'Item',
    path: '/item/:id(\\d+)',
    component: ItemView,
  },
  {
    name: 'User',
    path: '/user/:address',
    component: UserView,
  },
  {
    name: 'FAQ',
    path: '/faq',
    component: FaqView,
  },
  {
    name: 'Privacy',
    path: '/privacy-policy',
    component: PrivacyView,
  },
  {
    name: 'Term',
    path: '/terms-of-us',
    component: TermView,
  },
  {
    name: 'BirthdayGift',
    path: '/birthday-gift',
    component: BirthdayGiftView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
