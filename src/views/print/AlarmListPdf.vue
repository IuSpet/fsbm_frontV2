<template>
  <div class="alarm-list-pdf-container">
    <h2>报警列表</h2>
    <alarm-table :data-loading="loading" :table-data="tableData"/>
  </div>
</template>

<script>
import AlarmTable from '@/components/table/AlarmTable'
import { AlarmListPdf } from '@/api/alarm-module'

export default {
  name: 'AlarmListPdf',
  components: {
    AlarmTable
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
      AlarmListPdf(this.form).then(rsp => {
        const { data } = rsp
        document.title = '报警列表'
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
.alarm-list-pdf-container {
  width: 1225px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
}
</style>
