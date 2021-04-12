<template>
  <div class="form-main-container">
    <el-form ref="form" :inline="true" :model="form" class="user-table-form">
      <el-form-item label="用户名">
        <el-input clearable v-model="form.name"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input clearable v-model="form.email"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input clearable v-model="form.age"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input clearable v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select clearable v-model="form.gender">
          <el-option label="男" value="1"/>
          <el-option label="女" value="2"/>
          <el-option label="其他" value="0"/>
        </el-select>
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
        <el-button type="primary" @click="$emit('query-list',form)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserTableForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        age: null,
        gender: null,
        registerRange: '',
        phone: ''
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

<style scoped>

</style>
