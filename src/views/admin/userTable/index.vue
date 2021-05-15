<template>
  <div>
    <user-table-form @query-list="handleQueryForm"/>
    <user-table :data-loading="loading" :table-data="tableData" @sort-change="handleSortChange"/>
    <table-bottom
      :total-cnt="totalCnt"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @print="handlePrint"
      @export="handleExport"
    />
  </div>
</template>

<script>
import UserTableForm from '@/components/form/UserTableForm'
import UserTable from '@/components/table/UserTable'
import TableBottom from '@/components/tool/TableBottom'
import { GetUserList, getUserListCsv } from '@/api/admin'
import { DateFormat, DownloadCsvFile } from '@/utils'

export default {
  name: 'index',
  components: {
    UserTableForm,
    UserTable,
    TableBottom
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
      GetUserList(data).then(rsp => {
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
        gender: this.form.gender,
        age: this.form.age,
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
    handleExport() {
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
      getUserListCsv(data).then(data => {
        DownloadCsvFile(data, '用户列表.csv')
      })
    },
    handlePrint() {
      let left, right
      if (this.form.registerRange) {
        left = this.form.registerRange[0].format('yyyy-MM-dd hh:mm:ss')
        right = this.form.registerRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        name: this.form.name,
        gender: this.form.gender,
        age: this.form.age,
        email: this.form.email,
        phone: this.form.phone,
        create_begin: left,
        create_end: right,
        sort_fields: this.sortFields
      }
      // const routeData = this.$router.resolve({ name: 'UserTablePdf', params: { form: JSON.stringify(data) } })
      // window.open(routeData.href, '_blank')
      this.$router.push({ name: 'UserTablePdf', params: { form: JSON.stringify(data) } })
    }
  }
}
</script>

<style scoped>

</style>
