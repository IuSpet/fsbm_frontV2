<template>
<div class="panel-container">
  <el-row :gutter="40" class="panel-card-container">
    <el-col :xs="12" :sm="12" :lg="6">
      <el-card shadow="hover">
        <span class="svg-container">
          <svg-icon icon-class="stats" />
        </span>
        <div class="card-content">
          <h4 class="card-header">今日接收记录</h4>
          <p class="card-text">
            <count-to :start-val="0" :end-val="102400" :duration="2600"/>
          </p>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <el-card shadow="hover">
        <span class="svg-container">
          <svg-icon icon-class="notice" />
        </span>
        <div class="card-content">
          <h4 class="card-header">今日报警数量</h4>
          <p class="card-text">
            <count-to :start-val="0" :end-val="2400" :duration="2600"/>
          </p>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <el-card shadow="hover">
        <span class="svg-container">
          <svg-icon icon-class="time" />
        </span>
        <div class="card-content">
          <h4 class="card-header">最新接收记录</h4>
          <p class="card-text">12：00</p>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <el-card shadow="hover">
        <span class="svg-container">
          <svg-icon icon-class="percent" />
        </span>
        <div class="card-content">
          <h4 class="card-header">店铺合格比</h4>
          <p class="card-text">50%</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'PanelGroup',
  components:{
    CountTo
  },
  data(){

  }
}
</script>

<style lang="scss" scoped>
.panel-container{
  .panel-card-container{
    .el-col{
      .el-card{
        padding: 15px;
        margin-bottom: 10px;
        .svg-container{
          width: 40%;
          float: left;
          .svg-icon{
            width: 80%;
            height: 70px;
          }
        }
        .card-content{
          width: 60%;
          float: right;
          h4{
            text-align: right;
            margin-top: 0;
            color: dimgray;
            font-size: 1.2em;
            font-family: Verdana, sans-serif;
            font-weight: bolder;
          }
          p{
            font-size: 1.1em;
            text-align: right;
            font-family: Verdana, sans-serif;
            padding-right: 15px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
