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
      <el-table-column label="申请人" prop="user" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.user }}
        </template>
      </el-table-column>
      <el-table-column label="申请角色" prop="role" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="申请理由" prop="applyReason" width="225" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.apply_reason }}
        </template>
      </el-table-column>
      <el-table-column label="审批人" prop="reviewer" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.reviewer }}
        </template>
      </el-table-column>
      <el-table-column label="审批理由" prop="reviewReason" width="225" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.review_reason }}
        </template>
      </el-table-column>
      <el-table-column label="工单状态" prop="status" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        prop="Addr"
        width="175"
        align="center"
        sortable="custom"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="isReviewed(scope.row.id)">
            操作
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import sort from '@/components/table/sort'
import { MappingStatus } from '@/utils'

export default {
  name: 'ApplyRoleTable',
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
