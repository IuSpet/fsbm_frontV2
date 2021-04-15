<template>
  <div class="register-form-container">
    <el-form ref="registerForm"
             :model="registerForm"
             :rules="registerRules"
             status-icon
             class="login-form"
             label-position="left"
    >
      <div class="register-title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="邮箱"
          name="email"
          type="email"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="registerForm.name"
          placeholder="用户名"
          name="username"
          type="text"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item prop="age">
        <span class="svg-container">
          <svg-icon icon-class="age"/>
        </span>
        <el-input
          ref="age"
          v-model.number="registerForm.age"
          placeholder="年龄"
          name="age"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon-class="sex"/>
        </span>
        <el-radio-group v-model="registerForm.gender">
          <el-radio border label="男" value="1"/>
          <el-radio border label="女" value="2"/>
          <el-radio border label="其他" value="0"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          ref="password"
          v-model="registerForm.password"
          placeholder="密码"
          type="password"
          name="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwordCheck">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          ref="password"
          v-model="registerForm.passwordCheck"
          placeholder="再次输入密码"
          type="password"
          name="password"
          @keyup.enter.native="handleRegister"
        ></el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" @click.native.prevent="handleRegister">注册</el-button>
    </el-form>
  </div>
</template>
<script>
import { validEmailAddr, validPassword } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmailAddr(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6 || value.length > 30) {
        callback(new Error('用户名长度在6-30内'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码需要包含字母数字'))
      } else {
        callback()
      }
    }
    const validatePasswordCheck = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不同'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        email: '',
        name: '',
        password: '',
        passwordCheck: '',
        age: '',
        gender: '其他'
      },
      registerRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordCheck: [{ required: true, trigger: 'blur', validator: validatePasswordCheck }],
        age: [{ required: true, message: '年龄不能为空' }, { type: 'number', message: '年龄必须为数字值' }]
      },
      loading: false
    }
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-form-container {
  width: 500px;
  margin: 0 auto;

  .register-title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 10px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .el-button {
    width: 86%;
    margin: 0 7%;
  }
}

.el-input {
  display: inline-block;
  height: 47px;
  width: 85%;

  input {
    background: transparent;
    border: 0;
    padding: 12px 5px 12px 15px;
    height: 47px;
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  margin-right: 10px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
</style>
