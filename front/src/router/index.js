import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/Admin.vue';
import AddView from '@/views/products/AddProduct.vue';
import EditView from '@/views/products/EditProduct.vue';
import Categories from "@/components/Categories.vue";
import AddCategory from "@/views/categories/AddCategory.vue";
import EditCategory from "@/views/categories/EditCategory.vue";

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
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import("@/components/Products.vue"),
        },
        {
          path: 'products/add',
          name: 'Add product',
          component: AddView,
          meta: { requiresAuth: true }
        },
        {
          path: 'products/edit/:id',
          name: 'edit product',
          component: EditView,
          meta: { requiresAuth: true }
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import("@/components/Users.vue"),
          meta: {requiresAuth: true},
        },
        {
          path: 'users/add',
          name: 'Add a user',
          component: () => import("@/views/users/AddUser.vue"),
          meta: {requiresAuth: true}
        },
        {
          path: 'users/edit/:id',
          name: 'Edit a user',
          component: () => import("@/views/users/EditUser.vue"),
          meta: {requiresAuth: true}
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories,
          meta: {requiresAuth: true}
        },
        {
          path: 'categories/add',
          name: 'Add a category',
          Component: AddCategory,
          meta: {requiresAuth: true}
        },
        {
          path: 'categories/edit/:id',
          name: 'Edit a category',
          component: EditCategory,
          meta: {requiresAuth: true}
        }
      ],
      meta: { requiresAuth: true }
    }
  ],
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

