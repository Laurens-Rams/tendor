import { createRouter, createWebHistory } from 'vue-router' 
import UserList from '../components/UserList.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import UserForm from '../components/UserForm.vue';
import Home from '../components/Home.vue';
import DetailsComponent from '../components/DetailsComponent.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: UserForm,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }, 
  {
    path: '/UserDetails/:id',
    name: 'UserDetails',
    component: DetailsComponent,
    props: true
},
];

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener();
      resolve(user);
    }, reject);
  });
};

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;