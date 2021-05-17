<template>
  <div class="alarm-table-container">
    <el-table
      v-loading="loading"
      element-loading-text="Loading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      height="250px"
    >
      <el-table-column label="报警内容" prop="AlarmContent" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.alarm_content }}
        </template>
      </el-table-column>
      <el-table-column label="报警时间" prop="CreatedAt" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.alarm_at }}
        </template>
      </el-table-column>
      <el-table-column label="详情" prop="detail" width="175" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.alarm_id)" type="text" size="small">报警详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ShopAlarmList } from '@/api/shop'

export default {
  name: 'ShopAlarmTable',
  props: {
    shopId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  mounted() {
    this.queryShopAlarm()
  },
  methods: {
    handleClick(id) {
      this.$router.push({ name: 'AlarmDetail', query: { id } })
    },
    queryShopAlarm() {
      this.loading = true
      const data = {
        shop_id: this.shopId
      }
      ShopAlarmList(data).then(rsp => {
        const { data } = rsp
        this.tableData = data['list']
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
