import request from '@/utils/request'
import Url from '@/utils/url'

export function SendEmailCode(data) {
  return request({
    method: 'post',
    url: Url.tool.sendEmailCode,
    data
  })
}
