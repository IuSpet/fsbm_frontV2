<template>
  <div class="alarm-table-container">
    <el-table
      v-loading="dataLoading"
      element-loading-text="Loading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="handleSortChange"
      :header-cell-style="handleHeaderStyle"
    >
      <el-table-column label="店铺名称" prop="Name" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.shop_name }}
        </template>
      </el-table-column>
      <el-table-column label="负责人" prop="AdminName" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.admin_name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="AdminPhone" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.admin_phone }}
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="Addr" width="225" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.addr }}
        </template>
      </el-table-column>
      <el-table-column label="报警内容" prop="Addr" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.alarm_content }}
        </template>
      </el-table-column>
      <el-table-column label="报警时间" prop="CreatedAt" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.alarm_at }}
        </template>
      </el-table-column>
      <el-table-column label="详情" prop="Status" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.alarm_id)" type="text" size="small">报警详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import sort from '@/components/table/sort'

export default {
  name: 'AlarmTable',
  mixins: [sort],
  props: {
    dataLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick(id) {
      this.$router.push({ path: '/alarm/alarm_detail', query: { id } })
    }
  }
}
</script>

<style scoped>

</style>
