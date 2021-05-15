<template>
  <div class="user-list-pdf-container">
    <h2>用户列表</h2>
    <user-table :table-data="tableData" :data-loading="loading"/>
  </div>
</template>

<script>
import UserTable from '@/components/table/UserTable'
import { GetUserListPdf } from '@/api/admin'

export default {
  name: 'UserListPdf',
  components: {
    UserTable
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
      GetUserListPdf(this.form).then(rsp => {
        const { data } = rsp
        document.title = '用户列表'
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
.user-list-pdf-container {
  width: 1225px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
}
</style>
