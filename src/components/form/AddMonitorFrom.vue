<template>
  <div class="monitor-form-container">
    <el-form ref="form" :model="form" :rules="addRules" label-width="80px">
      <el-form-item label="店铺">
        <el-autocomplete
          class="inline-input"
          v-model="form.shopName"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddMonitorFrom',
  data() {
    return {
      form: {
        shopId: 0,
        shopName: '',
        monitorName: '',
        videoSrc: '',
        videoType: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
