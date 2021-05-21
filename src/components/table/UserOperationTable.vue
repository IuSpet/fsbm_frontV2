<template>
  <div class="user-operation-table-container">
    <div class="alarm-table-container">
      <el-table
        v-loading="loading"
        element-loading-text="Loading"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%"
        height="500px"
      >
        <el-table-column label="操作内容" prop="AlarmContent" width="369" align="center">
          <template slot-scope="scope">
            {{ scope.row.operation }}
          </template>
        </el-table-column>
        <el-table-column label="操作时间" prop="CreatedAt" width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.operated_at }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { UserOperationList } from '@/api/admin'

export default {
  name: 'UserOperationTable',
  props: {
    userId: {
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
  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      this.loading = true
      const data = {
        user_id: this.userId
      }
      UserOperationList(data).then(rsp => {
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
