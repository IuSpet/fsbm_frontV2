import request from '@/utils/request'
import Url from '@/utils/url'

export function RoleList(data) {
  return request({
    method: 'post',
    url: Url.auth.roleList,
    data
  })
}

export function UserRoleList(data) {
  return request({
    method: 'post',
    url: Url.auth.userRoleList,
    data
  })
}

export function ApplyRole(data) {
  return request({
    method: 'post',
    url: Url.auth.applyRole,
    data
  })
}

export function ApplyOrderList(data) {
  return request({
    method: 'post',
    url: Url.auth.applyOrderList,
    data
  })
}

export function ReviewOrder(data) {
  return request({
    method: 'post',
    url: Url.auth.reviewOrder,
    data
  })
}

export function ApplyOrderListCsv(data) {
  return request({
    method: 'post',
    url: Url.auth.applyOrderListCsv,
    data
  })
}

export function ApplyOrderListPdf(data) {
  return request({
    method: 'post',
    url: Url.auth.applyOrderListPrint,
    data
  })
}
