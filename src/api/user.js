import request from '@/utils/request'
import Url from '@/utils/url'

export function mockLogin(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function login0(data) {
  return request({
    url: Url.user.loginByPassword,
    method: 'post',
    data
  })
}

export function login1(data) {
  return request({
    url: Url.user.loginByVerificationCode,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
