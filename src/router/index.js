import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import FormAddPlayer from '../views/FormAddPlayer.vue'
import Club from '../views/Club.vue'
import Player from '../views/Player.vue'

const routes = [
  {
    path: '/player',
    name: 'Player',
    component: Player,
    props:true
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/form-add',
    name: 'FormAddPlayer',
    component: FormAddPlayer
  },
  {
    path: '/club',
    name: 'Club',
    component: Club
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireClub) && !store.state.isAuthenticated) {
    next({ name: 'Club', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
