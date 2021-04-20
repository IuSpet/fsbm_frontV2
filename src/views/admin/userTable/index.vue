<template>
  <div>
    <user-table-form @query-list="handleQueryForm"/>
    <user-table :data-loading="loading" :table-data="tableData" @sort-change="handleSortChange"/>
    <div style="margin-top:5px;">
      <el-row :gutter="10">
        <el-col :span="6">
          <div>共{{ totalCnt }}条数据，当前展示{{ showRange }}条</div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-button type="info" size="small" round style="margin-right: 10px" @click="exportData()">导出</el-button>
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
    this.queryTableData()
  },
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalCnt: 0,
      form: {
        name: '',
        email: '',
        age: null,
        gender: null,
        registerRange: null,
        phone: ''
      },
      sortFields: []
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
     */
    queryData(data) {
      getUserList(data).then(rsp => {
        const { data } = rsp
        console.log(data)
        this.tableData = data['user_info_list']
        this.totalCnt = data['total_count']
      })
    },
    handleQueryForm(form) {
      this.form = form
      this.queryTableData()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.queryTableData()
    },
    handleCurrentChange(current) {
      this.currentPage = current
      this.queryTableData()
    },
    handleSortChange(sortFilter) {
      this.sortFields = sortFilter
      this.queryTableData()
    },
    queryTableData() {
      let left, right
      if (this.form.registerRange) {
        left = this.form.registerRange[0].format('yyyy-MM-dd hh:mm:ss')
        right = this.form.registerRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        name: this.form.name,
        gender: parseInt(this.form.gender),
        age: parseInt(this.form.age),
        email: this.form.email,
        phone: this.form.phone,
        create_begin: left,
        create_end: right,
        page: this.currentPage,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      console.log(data)
      this.queryData(data)
    },
    exportTable() {

    },
    printTable() {

    }
  }
}
</script>

<style scoped>

</style>
