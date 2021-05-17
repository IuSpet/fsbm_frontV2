<template>
  <div class="user-list-pdf-container">
    <h2>用户列表</h2>
    <user-print-table :table-data="tableData" :data-loading="loading"/>
  </div>
</template>

<script>
import UserPrintTable from '@/components/table/UserPrintTable'
import { GetUserListPdf } from '@/api/admin'

export default {
  name: 'UserListPdf',
  components: {
    UserPrintTable
  },
  data() {
    return {
      tableData: [],
      loading: false,
      form: this.initForm()
    }
  },
  mounted() {
    this.queryData()
  },
  methods: {
    queryData() {
      this.loading = true
      console.log(this.form)
      GetUserListPdf(this.form).then(rsp => {
        const { data } = rsp
        document.title = '用户列表'
        this.tableData = data['user_info_list']
        console.log(this.tableData)
        this.loading = false
        setTimeout(() => {
          this.fullscreenLoading = false
          this.$nextTick(() => {
            window.print()
          })
        }, 3000)
      })
    },
    initForm() {
      if (this.$route.params.form) {
        return JSON.parse(this.$route.params.form)
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list-pdf-container {
  width: 1225px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
}
</style>
