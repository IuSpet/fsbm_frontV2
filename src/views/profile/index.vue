<template>
  <div class="index-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled/>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" ref="name"/>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" ref="phone"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" ref="age" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio border :label="1">男</el-radio>
          <el-radio border :label="2">女</el-radio>
          <el-radio border :label="0">其他</el-radio>
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
      <el-form-item label="重复密码" prop="passwordCheck">
        <el-input
          ref="password"
          v-model="form.passwordCheck"
          placeholder="再次输入密码"
          type="password"
          name="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input
          v-model="form.verificationCode"
          type="text"
          name="verificationCode"
        />
      </el-form-item>
      <div class="button-container">
        <el-button :disabled="verification.hasSent" type="info" @click.native.prevent="handleSend">
          {{ verification.hasSent ? verification.left + '秒' : '发送验证码' }}
        </el-button>
        <el-button :loading="loading" type="warning" @click.native.prevent="handleModify">修改资料</el-button>
        <el-button :loading="loading" type="danger" @click.native.prevent="handleDelete">删除用户</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validPassword } from '@/utils/validate'
import { getEmail } from '@/utils/auth'
import { getUserProfile, ModifyUserProfile } from '@/api/user'

export default {
  name: 'index',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6 || value.length > 30) {
        callback(new Error('用户名长度在6-30内'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback()
        return
      }
      if (!validPassword(value)) {
        callback(new Error('密码需要包含字母数字，至少8位'))
      } else {
        callback()
      }
    }
    const validatePasswordCheck = (rule, value, callback) => {
      console.log('into validator')
      if (this.form.password.length === 0) {
        callback()
        return
      }
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不同'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        email: '',
        gender: null,
        age: null,
        phone: '',
        password: '',
        passwordCheck: '',
        verificationCode: ''
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: false, trigger: 'blur', validator: validatePassword }],
        passwordCheck: [{ required: false, trigger: 'blur', validator: validatePasswordCheck }],
        age: [{ required: false, message: '年龄不能为空' }, { type: 'number', message: '年龄必须为数字值' }]
      },
      loading: false,
      oldForm: null,
      verification: {
        hasSent: false,
        left: 0
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    userEmail() {
      return this.$store.state.user.email
    }
  },
  methods: {
    getUserInfo() {
      const email = getEmail()
      const data = {
        email
      }
      this.loading = true
      getUserProfile(data).then(rsp => {
        const { data } = rsp
        this.form.email = data.email
        this.form.name = data.name
        this.form.gender = data.gender
        this.form.age = data.age
        this.form.phone = data.phone
        this.oldForm = { ...this.form }
        this.loading = false
      })
    },
    handleSend() {
      this.verification.left = 60
      this.verification.hasSent = true
      const id = setInterval(() => {
        this.verification.left -= 1
      }, 1000)
      setTimeout(() => {
        this.verification.hasSent = false
        clearInterval(id)
      }, 60 * 1000)
    },
    handleModify() {
      this.$refs.form.validate(valid => {
        if (valid) {
          switch (this.checkModifyType()) {
            case 0:
              break
            case 1:
              this.execModify()
              break
            case 2:
              if (!this.form.verificationCode) {
                this.$message({
                  message: '请输入验证码',
                  type: 'warning'
                })
                break
              }
              this.execModify()
          }
        }
      })
    },
    execModify() {
      const data = {
        email: this.form.email,
        name: this.form.name,
        phone: this.form.phone,
        password: this.form.password,
        age: this.form.age,
        gender: this.form.gender,
        verify_code: this.form.verificationCode
      }
      ModifyUserProfile(data).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getUserInfo()
      })
    },
    checkModifyType() {
      let type = 0
      for (let k in this.form) {
        if (this.form[k] !== this.oldForm[k]) {
          type = 1
          if (k === 'password') {
            type = 2
          }
          break
        }
      }
      return type
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  padding: 20px 10px 10px 10px;
  width: 50%;

  .button-container {
    width: 380px;
    margin: 0 auto;

    .el-button {
      width: 120px;
    }
  }
}
</style>
