import request from '@/utils/request'
import Url from '@/utils/url'

export function AlarmList(data) {
  return request({
    method: 'post',
    url: Url.alarm.alarmList,
    data
  })
}

export function AlarmListCsv(data) {
  return request({
    method: 'post',
    url: Url.alarm.alarmListCsv,
    data
  })
}
