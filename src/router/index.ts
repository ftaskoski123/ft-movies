import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SingleMovie from '../views/SingleMovie.vue'
import Favorites from '@/views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        title: 'Home'
      }

    },

    {
      path: '/login',
      name: 'login',
      component:Login,
      meta: {
        requiresAuth: false,
        title: 'Login'

      }

    },

    {
      path: '/register',
      name: 'register',
      component:Register,
      meta: {
        requiresAuth: false,
        title: 'Register'

      }

    },

    {
      path: '/movies/:movieId',
      name: 'movie',
      component:SingleMovie,
      meta: {
        requiresAuth: true,
        title: 'Movie'
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component:Favorites,
      meta: {
        requiresAuth: true,
        title: 'Favorites'
      }
    }




  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}
router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | Movie App`
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
