<template>
  <div class="alarm-detail-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <alarm-info-list/>
      </el-col>
      <el-col :span="12">
        <alarm-img />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import AlarmInfoList from '@/components/list/AlarmInfoList'
import AlarmImg from '@/components/card/AlarmImg'

export default {
  name: 'alarmDetail',
  components: {
    AlarmInfoList,
    AlarmImg
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
.alarm-detail-container{
  padding: 20px;
  font-size: 1.1em;
  font-weight: bold;
}
</style>
