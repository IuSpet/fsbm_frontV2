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
