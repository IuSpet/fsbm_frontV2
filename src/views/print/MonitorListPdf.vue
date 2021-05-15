<template>
  <div class="monitor-list-pdf-container">
    <h2>监控列表</h2>
    <monitor-table :table-data="tableData" :data-loading="loading"/>
  </div>
</template>

<script>
import MonitorTable from '@/components/table/MonitorTable'
import { MonitorListPdf } from '@/api/shop'

export default {
  name: 'MonitorListPdf',
  components: {
    MonitorTable
  },
  data() {
    return {
      form: JSON.parse(this.$route.params.form),
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.queryData()
  },
  methods: {
    queryData() {
      this.loading = true
      console.log(this.form)
      MonitorListPdf(this.form).then(rsp => {
        const { data } = rsp
        document.title = '监控列表'
        this.tableData = data['list']
        setTimeout(() => {
          this.fullscreenLoading = false
          this.$nextTick(() => {
            window.print()
          })
        }, 3000)
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor-list-pdf-container {
  width: 1225px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
}
</style>
