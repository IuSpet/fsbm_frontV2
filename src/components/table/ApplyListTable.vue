<template>
  <div class="apply-role-table-container">
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
      <el-table-column label="申请人" prop="User" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>
      <el-table-column label="申请角色" prop="Role" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="申请理由" prop="Reason" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <el-table-column label="申请时间" prop="CreatedAt" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="审批人" prop="Reviewer" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.reviewer }}
        </template>
      </el-table-column>
      <el-table-column label="审批理由" prop="ReviewReason" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.review_reason }}
        </template>
      </el-table-column>
      <el-table-column label="审批时间" prop="ReviewAt" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.review_at }}
        </template>
      </el-table-column>
      <el-table-column label="工单状态" prop="Status" width="150" align="center" sortable="custom">
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
  name: 'ApplyListTable',
  mixins: [sort],
  props: {
    dataLoading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'primary',
        1: 'success',
        2: 'danger'
      }
      return statusMap[MappingStatus(status)]
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('review', item)
    },
    isReviewed(status) {
      return status !== 0
    }
  }
}
</script>

<style scoped>

</style>
