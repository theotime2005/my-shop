import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/Admin.vue';
import AddView from '@/views/AddProduct.vue';
import EditView from '@/views/EditProduct.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/log',
      name: 'Log in',
      component: () => import("@/views/Log.vue")
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/add',
      name: 'add',
      component: AddView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/edit/:id',
      name: 'edit',
      component: EditView,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("user_token");
  if (to.meta.requiresAuth && token===null) {
    next('/log');
  }
  else {
    next();
  }
})

export default router

