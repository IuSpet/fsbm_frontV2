<template>
  <div class="monitor-table-container">
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
      <el-table-column label="店铺名称" prop="ShopName" width="175" align="center" sortable="custom">
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
      <el-table-column label="邮箱" prop="AdminEmail" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.admin_email }}
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="Addr" width="225" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.addr }}
        </template>
      </el-table-column>
      <el-table-column label="视频协议" prop="VideoType" width="125" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.video_type }}
        </template>
      </el-table-column>
      <el-table-column label="视频源" prop="VideoSrc" width="200" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.video_src }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import sort from '@/components/table/sort'

export default {
  name: 'MonitorTable',
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
}
</script>

<style scoped>

</style>
