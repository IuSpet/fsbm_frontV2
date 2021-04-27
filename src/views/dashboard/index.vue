<template>
  <div class="dashboard-container">
    <div class="info-container">
      <panel-group @handleSetLineChartData="" />
    </div>
    <div class="map-container">
      <shop-map/>
    </div>
  </div>
</template>

<script>
import ShopMap from '@/components/map/ShopMap'
import PanelGroup from '@/components/card/PanelGroup'

export default {
  name: 'Dashboard',
  components: {
    ShopMap,
    PanelGroup
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 10px;
  width: 100%;
  height: calc(100vh - 60px);

  .info-container {
    width: 100%;
    height: 20%;
  }

  .map-container {
    width: 100%;
    height: 100%;
  }
}
</style>
