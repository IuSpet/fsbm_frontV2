<template>
  <div class="user-table-container">
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
      <el-table-column label="用户名" prop="Name" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="Email" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="Phone" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="Gender" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="Age" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="CreatedAt" width="225" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="Status" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MappingStatus } from '@/utils'
import sort from '@/components/table/sort'

export default {
  name: 'UserTable',
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[MappingStatus(status)]
    }
  }
}
</script>

<style scoped>

</style>
