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
    userRegister: '/admin/user_register/line_chart',
    userInfo: '/admin/user_detail',
    addUserRole: '/admin/user_role/add',
    deleteUserRole: '/admin/user_role/delete',
    userOperationList: '/admin/user_operation_list'
  },
  shop: {
    shopList: '/shop/shop_list',
    addShop: '/shop/add_shop',
    shopInfo: '/shop/shop_info',
    shopAlarmList: 'shop/shop_info/alarm_list',
    addMonitor: '/shop/device/add_monitor',
    monitorList: '/shop/device/monitor_list',
    liveWallSrc: '/shop/device/live_wall_src',
    shopListByEmail: '/shop/shop_list_by_email',
    shopListCsv: '/shop/shop_list/csv',
    shopListPrint: '/shop/shop_list/print',
    monitorListCsv: '/shop/device/monitor_list/csv',
    monitorListPrint: '/shop/device/monitor_list/print'
  },
  auth: {
    roleList: '/auth/role_list',
    userRoleList: '/auth/user_role_list',
    applyRole: '/auth/apply_role',
    applyOrderList: '/auth/apply_order_list',
    applyOrderListCsv: '/auth/apply_order_list/csv',
    applyOrderListPrint: '/auth/apply_order_list/print',
    reviewOrder: '/auth/review_order'
  },
  dashboard: {
    globalStats: '/dashboard/global_stats',
    shopList: '/dashboard/shop_list'
  },
  alarm: {
    alarmList: '/alarm/alarm_list',
    alarmListCsv: '/alarm/alarm_list/csv',
    alarmListPrint: '/alarm/alarm_list/print'
  }
}

export default Url
