<template>
  <div class="edit-user-container">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" ref="name"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" ref="age" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio border label="男"/>
          <el-radio border label="女"/>
          <el-radio border label="其他"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio border :value="0" label="正常"/>
          <el-radio border :value="1" label="已删除"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="密码"
          type="password"
          name="password"
        ></el-input>
      </el-form-item>
      <div class="button-container">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleEdit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ModifyUserInfo } from '@/api/admin'
import { MappingGender, MappingStatus } from '@/utils'

export default {
  name: 'EditUserInfoForm',
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleEdit() {
      const data = {
        id:this.form.id,
        name:this.form.name,
        age:this.form.age,
        gender:MappingGender(this.form.gender),
        stats:MappingStatus(this.form.status)
      }
      ModifyUserInfo(data).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  .el-button {
    width: 130px;
  }
}
</style>
