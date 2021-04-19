<template>
  <div class="form-main-container">
    <el-form ref="form" :inline="true" :model="form" class="shop-table-form">
      <el-form-item label="店铺名称">
        <el-input clearable v-model="form.name"/>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input clearable v-model="form.admin"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input clearable v-model="form.addr"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker v-model="form.registerRange"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('query',form)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ShopListForm',
  data() {
    return {
      form: {
        name: null,
        admin: null,
        addr: null,
        registerRange: null
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-main-container {
  padding: 10px 10px 0 20px;
}
</style>
