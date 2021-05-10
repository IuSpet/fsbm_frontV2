import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    path: '/demo',
    component: () => import('@/components/player/LivePlayer'),
    hidden: true
  },
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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
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
        meta: { title: '监控墙', icon: '' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/stats',
    name: 'Admin',
    meta: { title: '管理员', icon: '', roles: ['admin'] },
    children: [
      {
        path: 'stats',
        name: 'Stats',
        component: () => import('@/views/admin/registerStats/index'),
        meta: { title: '注册用户统计', icon: '', roles: ['admin'] }
      },
      {
        path: 'user_list',
        name: 'UserList',
        component: () => import('@/views/admin/userTable/index'),
        meta: { title: '用户列表', icon: '', roles: ['admin'] }
      },
      {
        path: 'user_detail',
        name: 'UserDetail',
        component: () => import('@/views/user/userDetail'),
        meta: { title: '用户详细信息', icon: '', roles: ['admin'] },
        hidden: true
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shop_list',
    name: 'Shop',
    meta: { title: '店铺与监控' },
    children: [
      {
        path: 'shop_list',
        name: 'ShopList',
        component: () => import('@/views/shop/shopList/index'),
        meta: { title: '店铺列表' }
      },
      {
        path: 'add_shop',
        name: 'AddShop',
        component: () => import('@/views/shop/addShop'),
        meta: { title: '注册店铺', roles: ['admin', 'manager'] }
      },
      {
        path: 'monitor_list',
        name: 'MonitorList',
        component: () => import('@/views/shop/monitorList'),
        meta: { title: '监控列表' }
      },
      {
        path: 'add_monitor',
        name: 'AddMonitor',
        component: () => import('@/views/shop/addMonitor'),
        meta: { title: '注册监控', roles: ['admin', 'manager'] }
      },
      {
        path: 'shop_detail',
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
    meta: { title: '报警', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: '/alarm/alarm_list',
        name: 'AlarmList',
        component: () => import('@/views/alarm/AlarmList'),
        meta: { title: '报警列表', icon: '' }
      },
      {
        path: '/alarm/alarm_detail',
        name: 'AlarmDetail',
        component: () => import('@/views/alarm/AlarmDetail'),
        meta: { title: '报警详情', icon: '' },
        hidden: true
      }
    ]
  },

  {
    path: '/auth',
    component: Layout,
    redirect: '/auth/apply_role',
    name: 'Auth',
    meta: { title: '权限管理', icon: '' },
    children: [
      {
        path: '/apply_role',
        name: 'ApplyRole',
        component: () => import('@/views/auth/applyRole'),
        meta: { title: '申请角色', icon: '' }
      },
      {
        path: '/apply_list',
        name: 'ApplyList',
        component: () => import('@/views/auth/applyList'),
        meta: { title: '工单列表', icon: '', roles: ['admin'] }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ],
  //   hidden: true
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ],
  //   hidden: true
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ],
  //   hidden: true
  // },

  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '用户资料', icon: '' }
      }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ],
  //   hidden: true
  // },

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
