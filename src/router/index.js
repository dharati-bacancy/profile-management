import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: 'edit-profile',
        name: 'EditProfile',
        component: () => import('@/views/EditProfile.vue'),
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('@/views/ResetPassword.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
