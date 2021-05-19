import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getEmail, getToken, HasAccessRole } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  const pageRoles = to.meta.roles

  // determine whether the user has logged in
  const hasToken = getToken()
  const hasEmail = getEmail()
  //todo:登录hack，上线删除
  if (hasToken && hasEmail) {
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name
      let userRoles = store.getters.roles
      if (!userRoles) {
        await store.dispatch('user/getRoles')
        userRoles = store.getters.roles
      }
      if (HasAccessRole(userRoles, pageRoles)) {
        next()
      } else {
        try {
          // next('/404')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
