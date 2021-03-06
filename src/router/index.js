import Vue from 'vue'
import Router from 'vue-router'
import userPage from '@/components/framwork'
import login from '@/components/login/login'
import self from '@/components/self/selfPage'
import books from '@/components/books/booksPage'
import advice from '@/components/advice/advicePage'
import library from '@/components/books/library'
import mine from '@/components/books/mine'
import manager from '@/components/manager/manager'
import Smanager from '@/components/manager/Smanager'
import booksCharge from '@/components/manager/booksCharge'
import usersCharge from '@/components/manager/usersCharge'
import managerCharge from '@/components/manager/managerCharge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: login
    },
    {
      name: 'userpage',
      path: '/user',
      component: userPage,
      children: [
        {
          path: '/',
          component: userPage,
          redirect: '/self'
        },
        {
          name: 'self',
          path: '/self',
          component: self
        },
        {
          name: 'books',
          path: '/books',
          component: books,
          children: [
            {
              path: '/',
              component: books,
              redirect: '/library'
            },
            {
              path: '/library',
              name: 'library',
              component: library
            },
            {
              path: '/mine',
              name: 'mine',
              component: mine
            }
          ]
        },
        {
          name: 'advice',
          path: '/advice',
          component: advice
        }
      ],
      beforeEnter(to,from,next){
        if(localStorage.loginStatus1==='true'){       
          next();
        }else{
          alert("请先登录");
          next('/');
        }
      }
    },
    {
      name: 'manager',
      path: '/manager',
      component: manager,
      children: [
        {
          path: '/',
          component: manager,
          redirect: '/booksCharge'
        },
        {
          path: '/booksCharge',
          name: 'booksCharge',
          component: booksCharge
        },
        {
          path: '/usersCharge',
          name: 'usersCharge',
          component: usersCharge
        }
      ],
      beforeEnter(to,from,next){
        if(localStorage.loginStatus1==='true'){       
          next();
        }else{
          alert("请先登录");
          next('/');
        }
      }
    },
    {
      name: 'Smanager',
      path: '/Smanager',
      component: Smanager,
      children: [
        {
          path: '/',
          component: Smanager,
          redirect: '/managerCharge'
        },{
          path: '/managerCharge',
          name: 'managerCharge',
          component: managerCharge
        }
      ],
      beforeEnter(to,from,next){
        if(localStorage.loginStatus1==='true'){       
          next();
        }else{
          alert("请先登录");
          next('/');
        }
      }
    }
  ]
})

