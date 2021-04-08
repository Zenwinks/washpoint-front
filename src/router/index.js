import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import RegisterConfirmation from "../views/Auth/RegisterConfirmation";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/register/:token',
    component: RegisterConfirmation
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Auth/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/new',
    name: 'New',
    // lazy-loaded
    component: () => import('../views/Fiche/New.vue')
  },
  {
    path: '/list',
    name: 'List',
    // lazy-loaded
    component: () => import('../views/Fiche/List.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const isRegisterConfirmation = to.path.includes('/register');
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('data');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (!isRegisterConfirmation && authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
