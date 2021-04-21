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
