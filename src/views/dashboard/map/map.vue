<template>
  <div class="map-container">
    <baidu-map class="bm-view" center="成都" :ak="ak">

    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map'

export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      ak: 'dZ76X6chZrtpTrtoPakDawZv9rIp4hHm'
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
