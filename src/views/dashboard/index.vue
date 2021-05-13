<template>
  <div class="dashboard-container">
    <div class="info-container">
      <panel-group :card-data="cardData"/>
    </div>
    <div class="map-container">
      <shop-map/>
    </div>
  </div>
</template>

<script>
import ShopMap from '@/components/map/ShopMap'
import PanelGroup from '@/components/card/PanelGroup'
import { GlobalStats } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: {
    ShopMap,
    PanelGroup
  },
  data() {
    return {
      cardData: {
        recordCnt: 0,
        alarmCnt: 0,
        latestRecord: '00:00',
        passRate: '100%'
      },
      intervalTaskId: null
    }
  },
  created() {
    this.queryGlobalStats()
    this.intervalTaskId = setInterval(this.queryGlobalStats, 30000)
  },
  methods: {
    queryGlobalStats() {
      GlobalStats(null).then(rsp => {
        const { data } = rsp
        this.cardData.recordCnt = data['record_cnt']
        this.cardData.alarmCnt = data['alarm_cnt']
        this.cardData.latestRecord = data['latest_record']
        this.cardData.passRate = data['pass_rate'] * 100 + '%'
      })
    }
  },
  beforeDestroy() {
    if (this.intervalTaskId) {
      clearInterval(this.intervalTaskId)
    }
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
