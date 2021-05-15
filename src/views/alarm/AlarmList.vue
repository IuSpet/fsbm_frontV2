<template>
  <div class="alarm-list-container">
    <alarm-list-form @query="handleQuery"/>
    <alarm-table
      :table-data="tableData"
      :data-loading="loading"
      @sort-change="handleSortChange"
    />
    <table-bottom
      :total-cnt="totalCnt"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @export="handleExport"
      @print="handlePrint"
    />
  </div>
</template>

<script>
import AlarmListForm from '@/components/form/AlarmListForm'
import AlarmTable from '@/components/table/AlarmTable'
import TableBottom from '@/components/tool/TableBottom'
import { DateFormat, DownloadCsvFile } from '@/utils'
import { AlarmList, AlarmListCsv } from '@/api/alarm-module'

export default {
  name: 'AlarmList',
  components: {
    AlarmListForm,
    AlarmTable,
    TableBottom
  },
  data() {
    return {
      loading: false,
      tableData: [],
      form: {
        shopName: '',
        adminName: '',
        alarmType: [],
        alarmRange: ''
      },
      sortFields: null,
      page: 1,
      pageSize: 10,
      totalCnt: 0
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
    handleSortChange(sortFields) {
      this.form = sortFields
      this.queryData()
    },
    handleCurrentChange(current) {
      this.page = current
      this.queryData()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.queryData()
    },
    queryData() {
      this.loading = true
      let left, right
      if (this.form.alarmRange) {
        left = this.form.alarmRange[0].format('yyyy-MM-dd hh:mm:ss')
        right = this.form.alarmRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        shop_name: this.form.shopName,
        admin_name: this.form.adminName,
        alarm_type: this.form.alarmType,
        start_time: left,
        end_time: right,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      AlarmList(data).then(rsp => {
        const { data } = rsp
        this.tableData = data['list']
        this.totalCnt = data['total_cnt']
      })
      this.loading = false
    },
    handleExport() {
      let left, right
      if (this.form.alarmRange) {
        left = this.form.alarmRange[0].format('yyyy-MM-dd hh:mm:ss')
        right = this.form.alarmRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        shop_name: this.form.shopName,
        admin_name: this.form.adminName,
        alarm_type: this.form.alarmType,
        start_time: left,
        end_time: right,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      AlarmListCsv(data).then(data => {
        DownloadCsvFile(data, '报警列表.csv')
      })
    },
    handlePrint() {
      let left, right
      if (this.form.alarmRange) {
        left = this.form.alarmRange[0].format('yyyy-MM-dd hh:mm:ss')
        right = this.form.alarmRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        shop_name: this.form.shopName,
        admin_name: this.form.adminName,
        alarm_type: this.form.alarmType,
        start_time: left,
        end_time: right,
        page: this.page,
        page_size: this.pageSize,
        sort_fields: this.sortFields
      }
      this.$router.push({ name: 'AlarmTablePdf', params: { form: JSON.stringify(data) } })
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-list-container {
  padding: 15px;
}
</style>
