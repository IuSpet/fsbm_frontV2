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

export function ShopInfo(data) {
  return request({
    method: 'post',
    url: Url.shop.shopInfo,
    data
  })
}

export function ShopAlarmList(data) {
  return request({
    method: 'post',
    url: Url.shop.shopAlarmList,
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

export function ShopListCsv(data) {
  return request({
    method: 'post',
    url: Url.shop.shopListCsv,
    data
  })
}

export function ShopListPdf(data) {
  return request({
    method: 'post',
    url: Url.shop.shopListPrint,
    data
  })
}

export function MonitorListCsv(data) {
  return request({
    method: 'post',
    url: Url.shop.monitorListCsv,
    data
  })
}

export function MonitorListPdf(data) {
  return request({
    method: 'post',
    url: Url.shop.monitorListPrint,
    data
  })
}

export function ShopPos(data) {
  return request({
    method: 'post',
    url: Url.shop.shopPos,
    data
  })
}

export function ShopDeviceList(data) {
  return request({
    method: 'post',
    url: Url.shop.shopDeviceList,
    data
  })
}


