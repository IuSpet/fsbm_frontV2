<template>
  <div class="apply-list-container">
    <apply-role-list-form @query="handleQuery"/>
    <apply-role-table
      :table-data="tableData"
      :data-loading="loading"
      @sort-change="handleSortChange"
      @review="handleReview"
    />
    <table-bottom
      :total-cnt="totalCnt"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-drawer
      title="审核角色申请"
      :visible.sync="reviewOrder"
      direction="rtl"
      ref="drawer"
    >
      <div class="review-drawer">
        <apply-role-list :info="adjustRow"/>
        <review-role-form @submit-review="handleSubmitReview"/>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ApplyRoleListForm from '@/components/form/ApplyRoleListForm'
import ApplyRoleTable from '@/components/table/ApplyRoleTable'
import TableBottom from '@/components/tool/TableBottom'
import ReviewRoleForm from '@/components/form/ReviewRoleForm'
import ApplyRoleList from '@/components/list/ApplyRoleList'
import { DateFormat } from '@/utils'
import { ApplyOrderList, ReviewOrder } from '@/api/auth'

export default {
  name: 'applyList',
  components: {
    ApplyRoleListForm,
    TableBottom,
    ApplyRoleTable,
    ReviewRoleForm,
    ApplyRoleList
  },
  created() {
    if (Date.prototype.format === undefined) {
      Date.prototype.format = DateFormat
    }
    this.queryData()
  },
  data() {
    return {
      form: {
        user: '',
        role: [],
        status: [0],
        applyRange: null,
        reviewRange: null,
        reviewer: ''
      },
      pageSize: 10,
      page: 1,
      sortFields: null,
      tableData: [],
      loading: false,
      totalCnt: 0,
      reviewOrder: false,
      adjustRow: null
    }
  },
  methods: {
    handleQuery(form) {
      this.form = form
      this.queryData()
    },
    handleSortChange(sortFields) {
      this.sortFields = sortFields
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
    /**
     * 发送请求，保存数据
     */
    execQuery(data) {
      ApplyOrderList(data).then(rsp => {
        const { data } = rsp
        this.tableData = data['list']
        this.totalCnt = data['total_cnt']
      }).catch(err => {
        this.tableData = [{
          id: 0,
          user: 'test_user',
          role: 'test_role',
          reason: 'test apply role reason'
        }]
      })
    },
    /**
     * 各个查询条件拼接成请求data，发送请求
     */
    queryData() {
      this.loading = true
      let applyLeft, applyRight, reviewLeft, reviewRight
      if (this.form.applyRange) {
        applyLeft = this.form.applyRange[0].format('yyyy-MM-dd hh:mm:ss')
        applyRight = this.form.applyRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      if (this.form.reviewRange) {
        reviewLeft = this.form.reviewRange[0].format('yyyy-MM-dd hh:mm:ss')
        reviewRight = this.form.reviewRange[1].format('yyyy-MM-dd hh:mm:ss')
      }
      const data = {
        user: this.form.user,
        role: this.form.role,
        reviewer: this.form.reviewer,
        status: this.form.status,
        apply_begin_time: applyLeft,
        apply_end_time: applyRight,
        review_begin_time: reviewLeft,
        review_end_time: reviewRight,
        page: this.page,
        pageSize: this.pageSize,
        sort_fields: this.sortFields
      }
      console.log(data)
      this.execQuery(data)
      this.loading = false
    },
    handleReview(row) {
      this.reviewOrder = true
      this.adjustRow = row
    },
    handleSubmitReview(form) {
      this.loading = true
      ReviewOrder(data).then(rsp => {
        this.queryData()
      })
    }
  }
}
</script>

<style scoped>

</style>
