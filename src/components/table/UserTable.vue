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
    >
      <el-table-column label="用户名" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="175" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="225" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="175" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { MappingStatus } from '@/utils'

export default {
  name: 'UserTable',
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
  watch: {
    tableData() {
      console.log(12312312312)
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>

</style>
