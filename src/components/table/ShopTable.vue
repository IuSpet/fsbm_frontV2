<template>
  <div class="shop-table-container">
    <el-table
      v-loading="dataLoading"
      element-loading-text="Loading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="店铺名称" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_email }}
        </template>
      </el-table-column>
      <el-table-column label="地址" width="225" align="center">
        <template slot-scope="scope">
          {{ scope.row.addr }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ShopTable',
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
