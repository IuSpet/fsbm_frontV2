<template>
  <div class="apply-role-form-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色" prop="role">
        <el-autocomplete
          ref="shop"
          popper-class="my-autocomplete"
          class="inline-input"
          v-model="form.role"
          :fetch-suggestions="handleSuggestions"
          placeholder="选择角色"
          @select="handleSelect"
        >
          <template slot-scope="{item}">
            <div class="slot-role">{{ item.role }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="过期时间" prop="expire">
        <el-select v-model="form.expire" placeholder="选择过期时间">
          <el-option label="7天" :value="7 * 24 * 3600"/>
          <el-option label="30天" :value="30 * 24 * 3600"/>
          <el-option label="180天" :value="180 * 24 * 3600"/>
          <el-option label="365天" :value="365 * 24 * 3600"/>
        </el-select>
      </el-form-item>
      <el-form-item label="申请理由" prop="reason">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.reason"
          maxlength="200"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-button type="primary" @click.prevent.native="handleClick">提交申请</el-button>
    </el-form>
  </div>
</template>

<script>
import { RoleList } from '@/api/auth'

export default {
  name: 'ApplyRoleForm',
  data() {
    const validateRole = (rule, value, callback) => {
      if (value.length === 0) {
        callback('申请角色不能为空')
      } else if (this.form.roleId === -1) {
        const res = this.roleList.filter((role) => {
          return role === value
        })
        if (res.length === 1) {
          this.form.roleId = res[0].id
          callback()
        }
        callback('该角色不存在')
      }
      callback()
    }
    return {
      form: {
        role: '',
        roleId: -1,
        expire: '',
        reason: ''
      },
      roleList: [],
      rules: {
        role: [{ trigger: 'change', validator: validateRole }],
        expire: [{ required: true, trigger: 'blur', message: '选择过期时间' }],
        reason: [{ required: true, trigger: 'blur', min: 8, message: '申请理由不能少于8个字符' }]
      }
    }
  },
  created() {
    this.queryRoleList()
  },
  methods: {
    handleSuggestions(queryString, cb) {
      let roleList = this.roleList
      let results = queryString ? roleList.filter(this.createFilter(queryString)) : roleList
      cb(results)
    },
    createFilter(queryString) {
      return (role) => {
        return role['role'].toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(shop) {
      this.form.roleId = shop['id']
      this.form.role = shop['role']
    },
    queryRoleList() {
      RoleList().then(rsp => {
        const { data } = rsp
        this.roleList = data.list
      })
    },
    handleClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('apply', this.form)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
