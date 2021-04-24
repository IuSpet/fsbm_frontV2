<template>
  <div>
    <shop-list-form @query="handleQuery" />
    <shop-table :data-loading="loading" :table-data="tableData" @sort-change="handleSortChange" />
    <TableBottom
      :total-cnt="totalCnt"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @print="handlePrint"
      @export="handleExport"
    />
  </div>
</template>

<script>
import ShopListForm from '@/components/form/ShopListForm'
import ShopTable from '@/components/table/ShopTable'
import TableBottom from '@/components/tool/TableBottom'
import { ShopList } from '@/api/shop'
import { DateFormat } from '@/utils'

export default {
  name: 'ShopList',
  components: {
    ShopListForm,
    ShopTable,
    TableBottom
  },
  data() {
    return {
      totalCnt: 0,
      tableData: [],
      loading: false,
      form: {
        name: null,
        admin: null,
        addr: null,
        registerRange: null
      },
      pageSize: 10,
      page: 1,
      sortFields: []
    }
  },
  created() {
    if (Date.prototype.format === undefined) {
      Date.prototype.format = DateFormat
    }
    this.queryData()
  },
  methods: {
    handleQuery(form) {
      this.form = form
      this.queryData()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.queryData()
    },
    handleCurrentChange(current) {
      this.page = current
      this.queryData()
    },
    handleSortChange(sortFilter) {
      this.sortFields = sortFilter
      this.queryData()
    },
    handlePrint() {

    },
    handleExport() {

    },
    execQuery(data) {
      ShopList(data).then(rsp => {
        const { data } = rsp
        console.log(data)
        this.tableData = data['list']
        this.totalCnt = data['total_cnt']
      })
    },
    queryData() {
      let left, right
      if (this.form.registerRange) {
        left = this.form.registerRange[0].format('yyyy-MM-dd hh:mm:ss')
        right = this.form.registerRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        name: this.form.name,
        admin: this.form.admin,
        addr: this.form.addr,
        create_begin: left,
        create_end: right,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      this.execQuery(data)
    }
  }
}
</script>

<style scoped>

</style>
