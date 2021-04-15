<template>
  <div class="index-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled/>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" ref="email"/>
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
          @keyup.enter.native=""
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input>

        </el-input>
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
import { getUserProfile } from '@/api/user'

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
        callback(new Error('密码需要包含字母数字'))
      } else {
        callback()
      }
    }
    const validatePasswordCheck = (rule, value, callback) => {
      if (this.form.password.length === 0){
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
        gender: 0,
        age: '',
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
    this.oldForm = { ...this.form }
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
        // todo:用户信息
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
