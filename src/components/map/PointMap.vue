<template>
  <div class="map-container">
    <baidu-map
      class="bm-view"
      :center="pos"
      :ak="ak"
      :zoom="14"
      :map-style="mapStyle"
      :scroll-wheel-zoom="true"
      :map-click="false"
    >
      <bm-marker :position="pos"/>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import { ShopPos } from '@/api/shop'

export default {
  name: 'PointMap',
  components: {
    BaiduMap,
    BmMarker
  },
  props: {
    shopId: {
      type: Number,
      default: -1
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
      pos:{
        lat:0,
        lng:0
      }
    }
  },
 created() {
    this.queryPos()
  },
  methods: {
    queryPos() {
      if (this.shopId !== -1) {
        const data = {
          shop_id: this.shopId
        }
        ShopPos(data).then(rsp => {
          const { data } = rsp
          console.log(data)
          this.pos = data
        })
      }
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
