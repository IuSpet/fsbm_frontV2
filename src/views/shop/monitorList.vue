<template>
  <div class="monitor-list">
    <monitor-list-form @query="handleQuery"/>
    <monitor-table :data-loading="loading" :table-data="tableData" @sort-change="handleSortChange"/>
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
import MonitorListForm from '@/components/form/MonitorListForm'
import MonitorTable from '@/components/table/MonitorTable'
import TableBottom from '@/components/tool/TableBottom'
import { MonitorList, MonitorListCsv } from '@/api/shop'
import { DownloadCsvFile } from '@/utils'

export default {
  name: 'monitorList',
  components: {
    MonitorListForm,
    MonitorTable,
    TableBottom
  },
  data() {
    return {
      loading: false,
      tableData: [],
      totalCnt: 0,
      form: {
        shopName: '',
        monitorName: '',
        adminName: '',
        addr: '',
        videoType: ''
      },
      page: 1,
      pageSize: 10,
      sortFields: null
    }
  },
  mounted() {
    this.queryData()
  },
  methods: {
    execQuery(data) {
      MonitorList(data).then(rsp => {
        const { data } = rsp
        this.tableData = data['list']
        this.totalCnt = data['total_cnt']
      })
    },
    queryData() {
      this.loading = true
      const data = {
        device_name: this.form.monitorName,
        shop_name: this.form.shopName,
        admin_name: this.form.adminName,
        addr: this.form.addr,
        video_type: this.form.videoType,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      this.execQuery(data)
      this.loading = false
    },
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
      const data = {
        device_name: this.form.monitorName,
        shop_name: this.form.shopName,
        admin_name: this.form.adminName,
        addr: this.form.addr,
        video_type: this.form.videoType,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      this.$router.push({ name: 'MonitorTablePdf', params: { form: JSON.stringify(data) } })
    },
    handleExport() {
      const data = {
        device_name: this.form.monitorName,
        shop_name: this.form.shopName,
        admin_name: this.form.adminName,
        addr: this.form.addr,
        video_type: this.form.videoType,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      MonitorListCsv(data).then(data => {
        DownloadCsvFile(data, '监控设备列表')
      })
    }
  }
}
</script>

<style scoped>

</style>
