import request from '@/utils/request'
import Url from '@/utils/url'

export function ShopList(data) {
  return request({
    method: 'post',
    url: Url.shop.shopList,
    data
  })
}

export function AddShop(data) {
  return request({
    method: 'post',
    url: Url.shop.addShop,
    data
  })
}

export function AddMonitor(data) {
  return request({
    method: 'post',
    url: Url.shop.addMonitor,
    data
  })
}

export function MonitorList(data) {
  return request({
    method: 'post',
    url: Url.shop.monitorList,
    data
  })
}

export function LiveWallSrc(data) {
  return request({
    method: 'post',
    url: Url.shop.liveWallSrc,
    data
  })
}

export function ShopListByEmail(data) {
  return request({
    method: 'post',
    url: Url.shop.shopListByEmail,
    data
  })
}
