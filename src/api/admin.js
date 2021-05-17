import request from '@/utils/request'
import Url from '@/utils/url'

export function GetUserList(data) {
  return request({
    method: 'post',
    url: Url.admin.userList,
    data
  })
}

export function getUserListCsv(data) {
  return request({
    method: 'post',
    url: Url.admin.userListCsv,
    data,
    responseType: 'blob'
  })
}

export function GetUserListPdf(data) {
  return request({
    method: 'post',
    url: Url.admin.userListPrint,
    data
  })
}

export function getUserRegisterInfo(data) {
  return request({
    method: 'post',
    url: Url.admin.userRegister,
    data
  })
}

export function UserInfo(data) {
  return request({
    method: 'post',
    url: Url.admin.userInfo,
    data
  })
}

export function AddUserRole(data) {
  return request({
    method: 'post',
    url: Url.admin.addUserRole,
    data
  })
}

export function DeleteUserRole(data) {
  return request({
    method: 'post',
    url: Url.admin.deleteUserRole,
    data
  })
}
