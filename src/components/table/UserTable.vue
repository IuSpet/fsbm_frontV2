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
      <el-table-column label="用户名" prop="name" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phone" width="175" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age" width="150" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="created_at" width="225" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="175" align="center" sortable="custom">
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
  data() {
    return {
      // 排序筛选，传给后端
      sortFilter: [],
      fieldsStyle: {},
      mappingOrder: {
        'descending': 'desc',
        'ascending': 'asc'
      }
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
  },
  methods: {
    handleSortChange({ prop, order }) {
      if (order === null) {
        this.fieldsStyle[prop] = ''
        let index = this.sortFilter.findIndex(item => {
          return item['field'] === prop
        })
        if (index !== -1) {
          this.sortFilter.splice(index, 1)
        }
      } else {
        this.fieldsStyle[prop] = order
        let index = this.sortFilter.findIndex(item => {
          return item['field'] === prop
        })
        if (index === -1) {
          this.sortFilter.push({ field: prop, order: this.mappingOrder[order] })
        } else {
          this.sortFilter[index].order = this.mappingOrder[order]
        }
      }
      this.$emit('sort-change', this.sortFilter)
    },
    handleHeaderStyle({ column }) {
      if (this.fieldsStyle[column.property]) {
        column.order = this.fieldsStyle[column.property]
      }
    }
  }
}
</script>

<style scoped>

</style>
