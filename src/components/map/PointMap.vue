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
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"/>
      <bm-marker :position="pos"/>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmCityList from 'vue-baidu-map/components/controls/CityList'

export default {
  name: 'PointMap',
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmCityList
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
