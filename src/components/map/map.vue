<template>
  <div class="map-container">
    <baidu-map class="bm-view" :center="center.name" :ak="ak">

    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'

export default {
  components: {
    BaiduMap
  },
  props: {
    center: {
      type: Object,
      default: () => {
        return {
          name: '北京',
          latitude: 0,
          longitude: 0
        }
      }
    }
  },
  data() {
    return {
      ak: 'dZ76X6chZrtpTrtoPakDawZv9rIp4hHm'
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  .bm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
