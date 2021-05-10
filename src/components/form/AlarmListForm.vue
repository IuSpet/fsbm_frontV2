<template>
  <div class="form-main-container">
    <el-form ref="form" :inline="true" :model="form" class="user-table-form">
      <el-form-item label="店铺名称">
        <el-input clearable v-model="form.shopName"/>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input clearable v-model="form.adminName"/>
      </el-form-item>
      <el-form-item label="报警内容">
        <el-autocomplete
          ref="shop"
          popper-class="my-autocomplete"
          class="inline-input"
          v-model="form.alarmContent"
          :fetch-suggestions="handleSuggestions"
          @select="handleSelect"
        >
          <template slot-scope="{item}">
            <div class="slot-role">{{ item }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="地址">
        <el-input clearable v-model="form.addr"/>
      </el-form-item>
      <el-form-item label="报警时间">
        <el-date-picker v-model="form.alarmRange"
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
  name: 'AlarmListForm',
  data() {
    return {
      form: {
        shopName: '',
        adminName: '',
        alarmContent: '',
        alarmRange: ''
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
      },
      alarmContentList: ['未佩戴帽子']
    }
  },
  methods: {
    handleSuggestions(queryString, cb) {
      let alarmContentList = this.alarmContentList
      let results = queryString ? alarmContentList.filter(this.createFilter(queryString)) : alarmContentList
      cb(results)
    },
    createFilter(queryString) {
      return (item) => {
        return item.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(item) {
      this.form.alarmContent = item
    }
  }
}
</script>

<style scoped>

</style>
