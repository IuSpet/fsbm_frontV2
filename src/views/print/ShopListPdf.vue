<template>
  <div class="shop-list-pdf-container">
    <h2>店铺列表</h2>
    <shop-print-table :data-loading="loading" :table-data="tableData"/>
  </div>
</template>

<script>
import { ShopListPdf } from '@/api/shop'
import ShopPrintTable from '@/components/table/ShopPrintTable'

export default {
  name: 'ShopListPdf',
  components: {
    ShopPrintTable
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
      ShopListPdf(this.form).then(rsp => {
        const { data } = rsp
        document.title = '店铺列表'
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
.shop-list-pdf-container {
  width: 1225px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
}
</style>
