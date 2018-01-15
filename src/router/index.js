import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import File from '@/components/File'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/file',
      name: 'File',
      component: File
    }
  ]
})
