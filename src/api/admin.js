import request from '@/utils/request'
import Url from '@/utils/url'

export function getUserList(data) {
  return request({
    method: 'post',
    url: Url.admin.userList,
    data,
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

export function getUserListPDF(data) {
  return request({
    method: 'post',
    url: Url.admin.userListPrint,
    data,
  })
}

export function getUserRegisterInfo(data) {
  return request({
    method: 'post',
    url: Url.admin.userRegister,
    data,
  })
}
