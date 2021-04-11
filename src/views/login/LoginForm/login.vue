<template>
  <div class="login-form-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
      <div class="login-title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="email" v-if="byPassword || byEmail">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="邮箱"
          name="email"
          type="email"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="phone" v-if="byPhone">
        <span class="svg-container">
          <svg-icon icon-class="phone"/>
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="手机号"
          name="phone"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password" v-if="byPassword">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="密码"
          type="password"
          name="password"
          @keyup.enter.native=""
        ></el-input>
      </el-form-item>
      <el-form-item prop="verificationCode" v-if="byEmail || byPhone">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          ref="verificationCode"
          v-model="loginForm.verificationCode"
          placeholder="验证码"
          type="text"
          name="verificationCode"
          @keyup.enter.native=""
        ></el-input>
      </el-form-item>
      <div class="login-form-button">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        <el-button :loading="loading" type="info" @click.native.prevent="switchEmailLogin" v-if="!byEmail">邮箱验证登录
        </el-button>
        <el-button :loading="loading" type="info" @click.native.prevent="switchPasswordLogin" v-if="!byPassword">密码验证登录
        </el-button>
        <el-button :loading="loading" type="info" @click.native.prevent="switchPhoneLogin" v-if="!byPhone">短信验证登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validEmailAddr } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmailAddr(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('手机号码必须是11位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: '',
        phone: '',
        verificationCode: '',
        way: 0
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }]
      },
      byPassword: true,
      byEmail: false,
      byPhone: false,
      loading: false
    }
  },
  computed: {
    loginWay() {
      if (this.byPassword) return 0
      if (this.byEmail) return 1
      if (this.byPhone) return 2
    }
  },
  methods: {
    // 处理登录请求，先验证表单内容，再发送请求
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.way = this.loginWay
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 切换邮箱登录
    switchEmailLogin() {
      this.byEmail = true
      this.byPassword = false
      this.byPhone = false
    },
    // 切换短信登录
    switchPhoneLogin() {
      this.byPhone = true
      this.byPassword = false
      this.byEmail = false
    },
    // 切换密码登录
    switchPasswordLogin() {
      this.byPassword = true
      this.byEmail = false
      this.byPhone = false
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form-container {
  width: 500px;
  margin: 0 auto;

  .login-title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form-button {
    .el-button {
      width: 27%;
      margin: 5px 10px;
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
}
</style>
