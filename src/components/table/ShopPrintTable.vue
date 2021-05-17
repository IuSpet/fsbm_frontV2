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
      @sort-change="handleSortChange"
      :header-cell-style="handleHeaderStyle"
    >
      <el-table-column label="店铺名称" prop="Name" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.name }}
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
      <el-table-column label="注册时间" prop="CreatedAt" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="Status" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import sort from '@/components/table/sort'
import { MappingStatus } from '@/utils'

export default {
  mixins: [sort],
  name: 'ShopPrintTable',
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        draft: 'gray',
        1: 'danger'
      }
      return statusMap[MappingStatus(status)]
    }
  },
  methods: {
    handleClick(row) {
      this.$router.push({ name: 'ShopDetail', query: { id: row.id } })
    }
  }
}
</script>

<style scoped>

</style>
