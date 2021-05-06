import request from '@/utils/request'
import * as Url from 'url'

export function RoleList(data) {
  return request({
    method: 'post',
    url: Url.auth.roleList,
    data
  })
}
