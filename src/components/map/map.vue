<template>
  <div class="map-container">
    <baidu-map
      class="bm-view"
      :center="center.name"
      :ak="ak"
      :zoom="15"
      :map-style="mapStyle"
      :scroll-wheel-zoom="true"
    >
      <bm-marker v-for="shop in shopList" :key="shop.id" :position="shop.pos" @click="handleClick">
        <bm-info-window :show="shop.show">
          <h4>{{ shop.name }}</h4>
          <p>负责人{{ shop.manager }}</p>
          <p>联系电话:{{ shop.phone }}</p>
          <el-button>详细信息</el-button>
        </bm-info-window>
      </bm-marker>
      <bm-marker :position="shop1" :click="handleOpen">
        <bm-info-window :show="show" @close="handleClose" @open="handleOpen">这是一个店铺</bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'

export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow
  },
  props: {
    center: {
      type: Object,
      default: () => {
        return {
          name: '北京',
          lat: 0,
          lng: 0
        }
      }
    }
  },
  data() {
    return {
      ak: 'dZ76X6chZrtpTrtoPakDawZv9rIp4hHm',
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
    handleClick() {

    },
    handleOpen() {
      this.show = true
    },
    handleClose() {
      this.show = false
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
