<template>
  <div class="apply-list-pdf-container">
    <h2>申请角色工单列表</h2>
    <apply-list-table :table-data="tableData" :data-loading="loading"/>
  </div>
</template>

<script>
import ApplyListTable from '@/components/table/ApplyListTable'
import { ApplyOrderListPdf } from '@/api/auth'

export default {
  name: 'ApplyListPdf',
  components: {
    ApplyListTable
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
      ApplyOrderListPdf(this.form).then(rsp => {
        const { data } = rsp
        document.title = '申请角色工单列表'
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
.apply-list-pdf-container {
  width: 1225px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
}
</style>
