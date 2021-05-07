const Url = {
  user: {
    register: '/user/register',
    loginByPassword: '/user/login/password',
    loginByVerificationCode: '/user/login/verify',
    logout: '/user/logout',
    modify: '/user/modify',
    delete: '/user/delete',
    applyRole: '/user/apply_role',
    getProfile: '/user/get_profile',
    setAvatar: '/user/set_avatar',
    getAvatar: '/user/get_avatar',
    getRoles: '/user/get_roles',
    getExpiredRoles: '/user/get_expired_roles'
  },
  tool: {
    sendEmailCode: '/tool/no_auth/generate_verification_code'
  },
  admin: {
    userList: '/admin/user_list',
    userListCsv: '/admin/user_list/csv',
    userListPrint: '/admin/user_list/print',
    userRegister: '/admin/user_register/line_chart'
  },
  shop: {
    shopList: '/shop/shop_list',
    addShop: '/shop/add_shop',
    addMonitor: '/shop/device/add_monitor',
    monitorList: '/shop/device/monitor_list',
    liveWallSrc: '/shop/device/live_wall_src',
    shopListByEmail: '/shop/shop_list_by_email'
  },
  auth: {
    roleList: 'auth/role_list',
    userRoleList: 'auth/user_role_list'
  }
}

export default Url
