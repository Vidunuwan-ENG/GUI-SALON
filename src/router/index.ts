import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home | DIBU XXTENSIONS' }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Our Services | DIBU XXTENSIONS' }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    meta: { title: 'Our Products | DIBU XXTENSIONS' }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { title: 'Product Details | DIBU XXTENSIONS' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Shopping Cart | DIBU XXTENSIONS' }
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('@/views/BookmarksView.vue'),
    meta: { title: 'Wishlist & Bookmarks | DIBU XXTENSIONS' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Sign In | DIBU XXTENSIONS', guestOnly: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { title: 'My Profile | DIBU XXTENSIONS', requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page Not Found | DIBU XXTENSIONS' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            resolve({
              el: to.hash,
              behavior: 'smooth',
              top: 80
            })
          } else {
            resolve({ top: 0, behavior: 'smooth' })
          }
        }, 150)
      })
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation Guard for Protected and Guest-only routes
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // Update page title
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }

  // Check requiresAuth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // If already logged in and visiting /login, redirect to profile
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/profile')
    return
  }

  next()
})

export default router
