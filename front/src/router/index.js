import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/Admin.vue';
import AddView from '@/views/Add.vue';
import EditView from '@/views/Edit.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/add',
      name: 'add',
      component: AddView,
      meta: { requiresAdmin: true }
    },
    {
      path: '/admin/edit',
      name: 'edit',
      component: EditView,
      meta: { requiresAdmin: true }
    },
  ]
})

export default router


