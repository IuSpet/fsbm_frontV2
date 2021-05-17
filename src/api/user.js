import request from '@/utils/request'
import Url from '@/utils/url'

export function mockLogin(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: Url.user.register,
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

export function ModifyUserProfile(data) {
  return request({
    url: Url.user.modify,
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: Url.user.delete,
    method: 'post',
    data
  })
}

export function applyRole(data) {
  return request({
    url: Url.user.applyRole,
    method: 'post',
    data
  })
}

export function getUserProfile(data) {
  return request({
    url: Url.user.getProfile,
    method: 'post',
    data
  })
}

export function getAvatar(data) {
  return request({
    url: Url.user.getAvatar,
    method: 'post',
    data
    // responseType: 'blob'
  })
}

export function getRoles(data) {
  return request({
    url: Url.user.getRoles,
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
    url: Url.user.logout,
    method: 'post'
  })
}

