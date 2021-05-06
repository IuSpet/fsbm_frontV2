<template>
  <div class="form-main-container">
    <el-form ref="form" :inline="true" :model="form" class="shop-table-form">
      <el-form-item label="店铺名称" prop="shopName">
        <el-input v-model="form.shopName"/>
      </el-form-item>
      <el-form-item label="监控名称" prop="monitorName">
        <el-input v-model="form.monitorName"/>
      </el-form-item>
      <el-form-item label="负责人" prop="adminName">
        <el-input v-model="form.adminName"/>
      </el-form-item>
      <el-form-item label="地址" prop="addr">
        <el-input v-model="form.addr"/>
      </el-form-item>
      <el-form-item label="视频格式" prop="videoType">
        <el-select clearable v-model="form.videoType">
          <el-option label="hls" value="hls"/>
          <el-option label="flv" value="flv"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('query',form)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MonitorListForm',
  data() {
    return {
      form: {
        shopName: '',
        monitorName: '',
        adminName: '',
        addr: '',
        videoType: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.form-main-container{
  padding: 20px;
}

</style>
