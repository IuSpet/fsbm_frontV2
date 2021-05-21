<template>
  <div class="shop-detail-container">
    <el-row :gutter="50">
      <el-col class="info-col" :span="12">
        <h2>基本信息</h2>
        <shop-info-list :shop-id="shopId"/>
        <point-map class="point-map"/>
      </el-col>
      <el-col :span="12">
        <h2>店铺内监控</h2>
        <device-player-form :shop-id="shopId"/>
        <shop-alarm-table :shop-id="shopId"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LivePlayer from '@/components/player/LivePlayer'
import ShopInfoList from '@/components/list/ShopInfoList'
import PointMap from '@/components/map/PointMap'
import DevicePlayerForm from '@/components/form/DevicePlayerForm'
import ShopAlarmTable from '@/components/table/ShopAlarmTable'

export default {
  name: 'shopDetail',
  components: {
    LivePlayer,
    ShopInfoList,
    PointMap,
    DevicePlayerForm,
    ShopAlarmTable
  },
  data() {
    return {
      shopId: this.$route.query.id * 1
    }
  },
  created() {
    if (!this.shopId) {
      this.$router.push({ path: '/404' })
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-detail-container {
  padding: 20px;

  .el-row {
    .info-col {
      border-right: #7a7a7a solid 1px;
    }

    .el-col {
      .point-map {
        width: 100%;
        height: 400px;
      }
    }
  }
}
</style>
