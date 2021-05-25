import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import PrintLayout from '@/layout/PrintLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '看版', icon: 'dashboard' }
    }]
  },

  {
    path: '/live_wall',
    component: Layout,
    redirect: '/live_wall',
    children: [
      {
        path: 'live_wall',
        name: 'LiveWall',
        component: () => import('@/views/video/LiveWall'),
        meta: { title: '监控墙', icon: 'monitor', roles: ['admin', 'shop_owner', 'supervision', 'normal_user'] }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/stats',
    name: 'Admin',
    meta: { title: '管理员', icon: 'admin', roles: ['admin', 'supervision'] },
    children: [
      {
        path: 'stats',
        name: 'Stats',
        component: () => import('@/views/admin/registerStats/index'),
        meta: { title: '注册用户统计', icon: 'register-stats', roles: ['admin', 'supervision'] }
      },
      {
        path: 'user_list',
        name: 'UserList',
        component: () => import('@/views/admin/userTable/index'),
        meta: { title: '用户列表', icon: 'table', roles: ['admin', 'supervision'] }
      },
      {
        path: 'user_detail',
        name: 'UserDetail',
        component: () => import('@/views/user/userDetail'),
        meta: { title: '用户详细信息', icon: 'profile', roles: ['admin', 'supervision'] },
        hidden: true
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shop_list',
    name: 'Shop',
    meta: { title: '店铺与监控', icon: 'shop' },
    children: [
      {
        path: 'shop_list',
        name: 'ShopList',
        component: () => import('@/views/shop/shopList/index'),
        meta: { title: '店铺列表', icon: 'table' }
      },
      {
        path: 'add_shop',
        name: 'AddShop',
        component: () => import('@/views/shop/addShop'),
        meta: { title: '注册店铺', icon: 'register', roles: ['admin', 'shop_owner'] }
      },
      {
        path: 'monitor_list',
        name: 'MonitorList',
        component: () => import('@/views/shop/monitorList'),
        meta: { title: '监控列表', icon: 'table' }
      },
      {
        path: 'add_monitor',
        name: 'AddMonitor',
        component: () => import('@/views/shop/addMonitor'),
        meta: { title: '注册监控', icon: 'register', roles: ['admin', 'shop_owner'] }
      },
      {
        path: 'shop_detail',
        name: 'ShopDetail',
        component: () => import('@/views/shop/shopDetail'),
        hidden: true
      }
    ]
  },

  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/alarm_list',
    name: 'Alarm',
    meta: { title: '报警', icon: 'alarm' },
    alwaysShow: true,
    children: [
      {
        path: '/alarm/alarm_list',
        name: 'AlarmList',
        component: () => import('@/views/alarm/AlarmList'),
        meta: { title: '报警列表', icon: 'table' }
      },
      {
        path: '/alarm/alarm_detail',
        name: 'AlarmDetail',
        component: () => import('@/views/alarm/AlarmDetail'),
        meta: { title: '报警详情', icon: 'profile' },
        hidden: true
      }
    ]
  },

  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/apply_role',
    name: 'Auth',
    meta: { title: '权限管理', icon: 'auth' },
    children: [
      {
        path: '/apply_role',
        name: 'ApplyRole',
        component: () => import('@/views/auth/applyRole'),
        meta: { title: '申请角色', icon: 'apply' }
      },
      {
        path: '/apply_list',
        name: 'ApplyList',
        component: () => import('@/views/auth/applyList'),
        meta: { title: '工单列表', icon: 'table', roles: ['admin', 'supervision'] }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '用户资料', icon: 'profile' }
      }
    ]
  },

  {
    path: '/print',
    component: PrintLayout,
    children: [
      {
        path: '/user_table',
        component: () => import('@/views/print/UserListPdf'),
        name: 'UserTablePdf',
        hidden: true
      },
      {
        path: '/shop_table',
        component: () => import('@/views/print/ShopListPdf'),
        name: 'ShopTablePdf',
        hidden: true
      },
      {
        path: '/monitor_table',
        component: () => import('@/views/print/MonitorListPdf'),
        name: 'MonitorTablePdf',
        hidden: true
      },
      {
        path: '/alarm_table',
        component: () => import('@/views/print/AlarmListPdf'),
        name: 'AlarmTablePdf',
        hidden: true
      },
      {
        path: '/apply_table',
        component: () => import('@/views/print/ApplyListPdf'),
        name: 'ApplyTablePdf',
        hidden: true
      }
    ],
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
