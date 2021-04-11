<template>
  <div class="chart-container">
    <div class="date-range-form">
      <span class="demonstration" style="margin-right: 10px">统计范围</span>
      <el-date-picker
        v-model="selectDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <chart height="100%" width="100%" :min-date="minDate" :max-date="maxDate"/>
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineChart'

export default {
  name: 'registerStats',
  components: { Chart },
  created() {
    Date.prototype.format = function(fmt) {
      var o = {
        'M+': this.getMonth() + 1,                 //月份
        'd+': this.getDate(),                    //日
        'h+': this.getHours(),                   //小时
        'm+': this.getMinutes(),                 //分
        's+': this.getSeconds(),                 //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds()             //毫秒
      }

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }

      return fmt
    }
  },
  data() {
    return {
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
      selectDate: '',
      defaultBegin: (() => {
        const bg = new Date()
        bg.setTime(bg.getTime() - 3600 * 1000 * 24 * 7)
        return bg
      })(),
      defaultEnd: new Date()
    }
  },
  computed: {
    minDate() {
      if (this.selectDate.length < 1) {
        return this.defaultBegin.format('yyyy-MM-dd')
      }
      return this.selectDate[0].format('yyyy-MM-dd')
    },
    maxDate() {
      if (this.selectDate.length < 2) {
        return this.defaultEnd.format('yyyy-MM-dd')
      }
      return this.selectDate[1].format('yyyy-MM-dd')
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);

  .date-range-form {
    margin: 20px 0 10px 20px;
  }
}
</style>

