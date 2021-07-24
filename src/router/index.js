import Vue from 'vue'
import Router from 'vue-router'
import library from '@/components/library'
import advice from '@/components/advice'
import home from '@/components/homePage/home'
import libraryPage from '@/components/libraryPage/libraryPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'library',
      path: '/',
      component: library,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        }, {
          path: '/library',
          name: 'libraryPage',
          component: libraryPage
        }, {
          path: '/advice',
          name: 'advice',
          component: advice
        }
      ]
    }
  ]
})
