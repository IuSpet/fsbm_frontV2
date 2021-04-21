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
    getAvatar: '/user/get_avatar'
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
    addShop: '/shop/add_shop'
  }
}

export default Url
