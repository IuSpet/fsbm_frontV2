<template>
  <div class="map-container">
    <baidu-map
      class="bm-view"
      :center="center"
      :ak="ak"
      :zoom="15"
      :map-style="mapStyle"
      :scroll-wheel-zoom="true"
      :map-click="false"
    >
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"/>
      <bm-marker v-for="(shop,index) in shopList" :key="shop.id" :position="shop.pos" @click="handleClick(index)">
        <bm-info-window :show="shop.show" @close="handleClose(index)" @open="handleClick(index)">
          <h4>{{ shop.name }}</h4>
          <p>负责人{{ shop.manager }}</p>
          <p>联系电话:{{ shop.phone }}</p>
          <el-button @click="handleDetail(shop.id)">详细信息</el-button>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmCityList from 'vue-baidu-map/components/controls/CityList'

export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmCityList
  },
  data() {
    return {
      ak: 'dZ76X6chZrtpTrtoPakDawZv9rIp4hHm',
      center: '北京',
      mapStyle: {
        styleJson: [
          {
            'featureType': 'poilabel',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }
        ]
      },
      show: false,
      shop1: {
        lng: 116.404,
        lat: 39.915
      },
      shopList: [{
        id: 0,
        name: 'abcd',
        manager: 'efgh',
        phone: '123456',
        pos: {
          lng: 116.424,
          lat: 39.915
        },
        show: false
      }]
    }
  },
  methods: {
    initShopPoints() {

    },
    handleClick(index) {
      this.shopList[index].show = true
    },
    handleClose(index) {
      this.shopList[index].show = false
    },
    handleDetail(id) {
      this.$router.push({ path: '/shop_detail', query: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;

  .bm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
