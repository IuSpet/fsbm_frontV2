<template>
  <div class="review-role-form-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="审核">
        <el-radio-group v-model="form.review">
          <el-radio :label="0">通过</el-radio>
          <el-radio :label="1">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见">
        <el-input v-model="form.reason"/>
      </el-form-item>
      <el-button type="primary" @click.prevent.native="handleClick">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ReviewRoleForm',
  data() {
    return {
      form: {
        id: -1,
        review: 0,
        reason: ''
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('submit-review', this.form)
    }
  }
}
</script>

<style scoped>

</style>
