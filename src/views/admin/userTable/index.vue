<template>
  <div>
    <user-table-form @query-list="handleQueryForm"/>
    <user-table :data-loading="loading" :table-data="tableData"/>
    <div style="margin-top:5px;">
      <el-row :gutter="10">
        <el-col :span="6">
          <div>共{{ totalCnt }}条数据，当前展示{{ showRange }}条</div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-button type="info" size="small" round style="margin-right: 10px">导出</el-button>
            <el-button type="info" size="small" round>打印</el-button>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              :total="totalCnt"
              background
              layout="sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserTableForm from '@/components/form/UserTableForm'
import UserTable from '@/components/table/UserTable'
import { getUserList } from '@/api/admin'
import { DateFormat } from '@/utils'

export default {
  name: 'index',
  components: {
    UserTableForm,
    UserTable
  },
  created() {
    if (Date.prototype.format === undefined) {
      Date.prototype.format = DateFormat
    }
  },
  data() {
    return {
      loading: false,
      tableData: this.queryData({}),
      currentPage: 1,
      pageSize: 10,
      totalCnt: 100,
      form: null
    }
  },
  computed: {
    showRange() {
      const left = (this.currentPage - 1) * this.pageSize + 1
      const right = Math.min(left - 1 + this.pageSize, this.totalCnt)
      return left + '到' + right
    }
  },
  methods: {
    /**
     * 查询用户列表数据
     * @param {Object}data
     * @return {Array}
     */
    queryData(data) {
      let res = []
      getUserList(data).then(rsp => {
        //todo:处理返回结果
        res = rsp
      })
      return res
    },
    handleQueryForm(form) {
      this.form = form
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(current) {
      this.currentPage = current
    },
    queryTableData() {
      const data = {
        name: this.form.name,
        gender: this.form.gender,
        age: this.form.age,
        email: this.form.email,
        phone: this.form.phone
      }
    }
  }
}
</script>

<style scoped>

</style>
