import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserInfoView from '@/views/Stu/UserInfoView.vue'
import BookListView from '@/views/BookListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import BorrowView from '@/views/BorrowView.vue'
import TransferBookView from '@/views/TransferBookView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BookListView
  },
  {
    path: '/login',
    name: 'login_view',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register_view',
    component: RegisterView
  },
  {
    path: '/borrow',
    name: 'borrow_view',
    component: BorrowView
  },
  {
    path: '/user/info',
    name: 'user_info_view',
    component: UserInfoView
  },
  {
    path: '/transefer',
    name: 'transfer_book_view',
    component: TransferBookView
  },
  {
    path: '/404',
    name: 'not_found_view',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from ,next) => {
  const login = store.state.user.is_login
  if(to.name === 'login_view' || to.name === 'register_view') {
    if(login) {
      next({name : "home"})
    } else {
      next()
    }
  } else {
    if(login) {
      next()
    } else {
      next({name : 'login_view'})
    }
  }
})

export default router
