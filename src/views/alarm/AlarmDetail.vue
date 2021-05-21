<template>
  <div class="alarm-detail-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <alarm-info-list :info="info"/>
      </el-col>
      <el-col :span="12">
        <alarm-img/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import AlarmInfoList from '@/components/list/AlarmInfoList'
import AlarmImg from '@/components/card/AlarmImg'
import { AlarmInfo } from '@/api/alarm-module'

export default {
  name: 'alarmDetail',
  components: {
    AlarmInfoList,
    AlarmImg
  },
  data() {
    return {
      alarmId: this.$route.query.id * 1,
      info: {}
    }
  },
  created() {
    if (!this.alarmId) {
      this.$router.push({ path: '/404' })
    }
    this.queryAlarmInfo()
  },
  methods: {
    queryAlarmInfo() {
      const data = {
        alarm_id: this.alarmId
      }
      AlarmInfo(data).then(rsp => {
        const { data } = rsp
        this.info = data.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-detail-container {
  padding: 20px;
  font-size: 1.1em;
  font-weight: bold;
}
</style>
