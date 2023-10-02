import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

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
      path: '/about',
      name: 'about',
      component:About,
      meta: {
        requiresAuth: true,
        title: 'About'
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
