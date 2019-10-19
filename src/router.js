import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Sermons from '@/views/dashboard/Sermons'
import Events from '@/views/dashboard/Events'
import Contact from '@/views/dashboard/Contact'
import Page404 from '@/views/dashboard/Page404'

// auth
import Login from '@/views/auth/Login'

// admin routes
import AdminHome from '@/views/admin/Home'
import AdminEvent from '@/views/admin/dashboard/Event'
import AdminMember from '@/views/admin/dashboard/Member'
import AdminSermon from '@/views/admin/dashboard/Sermon'

Vue.use(Router);

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import("./views/dashboard/About.vue")
    },
    {
      path: '/sermons',
      name: 'Sermons',
      component: Sermons
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/404-page-not-found',
      name: '404',
      component: Page404
    },
    { 
      path: '*', 
      redirect: '/404-page-not-found' 
    },

    // auth
    {
      path: '/signin',
      name: 'Login',
      component: Login
    },

    // admin
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: AdminHome
    },
    {
      path: '/dashboard/events',
      name: 'AdminEvents',
      component: AdminEvent
    },
    {
      path: '/dashboard/members',
      name: 'AdminMembers',
      component: AdminMember
    },
    {
      path: '/dashboard/sermons',
      name: 'AdminSermons',
      component: AdminSermon
    },
  ]
});
