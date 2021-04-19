<template>
  <div>
    <shop-list-form @query="handleQuery"/>
    <shop-table :data-loading="loading" :table-data="tableData"/>
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

export default {
  name: 'index',
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
      page: 1
    }
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
    handlePrint() {

    },
    handleExport() {

    },
    execQuery(data) {
      ShopList(data).then(rsp => {
        const { data } = rsp
        //todo:店铺列表数据处理
      })
    },
    queryData() {
      const data = {}
      this.execQuery(data)
    }
  }
}
</script>

<style scoped>

</style>
