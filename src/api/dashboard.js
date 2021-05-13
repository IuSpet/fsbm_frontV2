import request from '@/utils/request'
import Url from '@/utils/url'

export function GlobalStats(data) {
  return request({
    method: 'post',
    url: Url.dashboard.globalStats,
    data
  })
}

export function DashboardShopList(data) {
  return request({
    method: 'post',
    url: Url.dashboard.shopList,
    data
  })
}
