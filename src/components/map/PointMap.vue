<template>
  <div class="map-container">
    <baidu-map
      class="bm-view"
      center="北京"
      :ak="ak"
      :zoom="15"
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

export default {
  name: 'PointMap',
  components: {
    BaiduMap,
    BmMarker
  },
  props: {
    pos: {
      type: Object,
      default: () => {
        return {
          lng: 0,
          lat: 0
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
