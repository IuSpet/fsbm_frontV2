<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { getUserRegisterInfo } from '@/api/admin'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    minDate: {
      type: String,
      default: '2021-01-01'
    },
    maxDate: {
      type: String,
      default: '2021-01-07'
    }
  },
  data() {
    return {
      chart: null,
      registerData: {
        xAxis: [],
        yAxis: []
      }
    }
  },
  mounted() {
    this.queryPromise().then(
      () => {
        this.initChart()
      }
    )
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  computed: {
    changed() {
      return this.minDate + this.maxDate
    }
  },
  methods: {
    initChart() {
      const dom = document.getElementById(this.id)
      this.chart = echarts.init(dom)
      this.chart.setOption({
        backgroundColor: '#ffffff',
        title: {
          text: 'statistics',
          x: '20',
          top: '20',
          textStyle: {
            color: '#000000',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#757575',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#009f87'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['注册人数']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: this.registerData.xAxis
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          // 数据窗口距离
          bottom: 30,
          // 数据窗口启始和结束的百分比
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'
        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
          {
            name: '注册人数',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(252,230,48,1)',
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.registerData.yAxis
          }
        ]
      })
    },
    queryData() {
      const data = {
        create_begin: this.minDate,
        create_end: this.maxDate
      }
      return getUserRegisterInfo(data).then(rsp => {
        //todo:用户注册返回
        const { data } = rsp
        console.log(rsp)
        if (data.series === null) {
          this.registerData.xAxis = []
          this.registerData.yAxis = []
          return true
        }
        console.log(data.series)
        this.registerData.xAxis = data.series.map(a => a['date'])
        this.registerData.yAxis = data.series.map(a => a['cnt'])
        return true
      })
    },
    queryPromise() {
      return new Promise(async(resolve) => {
        await this.queryData()
        resolve()
      })
    }
  },
  watch: {
    changed() {
      this.queryPromise().then(() => {
        this.initChart()
      })
    }
  }
}
</script>
