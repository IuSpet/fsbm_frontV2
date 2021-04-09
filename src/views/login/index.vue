<template>
  <div class="login-page-container">
    <div class="title-container">
      <h2 class="title"></h2>
    </div>
    <el-row :gutter="10">
      <el-col :xs="2" :sm="7" :md="8" :lg="8" :xl="8">
        <div class="left-bg"></div>
      </el-col>
      <el-col :xs="20" :sm="10" :md="8" :lg="8" :xl="8">
        <div class="main-form">
          <login-form v-if="isLogin"/>
          <register-form v-else/>
          <el-button size="small" type="text" @click="isLogin = !isLogin">
            {{ btnMsg }}
          </el-button>
        </div>
      </el-col>
      <el-col :xs="2" :sm="7" :md="8" :lg="8" :xl="8">
        <div class="right-bg"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import loginForm from '@/views/login/LoginForm/login'
import registerForm from '@/views/login/LoginForm/register'

export default {
  name: 'LoginPage',
  data() {
    return {
      condition: 'login',
      isLogin: true
    }
  },
  computed: {
    btnMsg() {
      return this.isLogin ? '没有账号，现在注册' : '已有账号，现在登录'
    }
  },
  components: {
    loginForm,
    registerForm
  }
}
</script>

<style lang="scss" scoped>

$bg: #64ffcd;

.login-page-container {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;

  .title-container {
    .title {
      width: 300px;
      margin: 10px auto;
      text-align: center;
    }

  }

  .el-row {
    .el-col {
      div {
        min-height: 20px;
      }
    }

  }

  .main-form {
    padding: 120px 20px 20px 20px;
  }

  //.left-bg {
  //  background: #43628a;
  //}
  //
  //. {
  //  background: #38b78f;
  //}
  //
  //.right-bg {
  //  background: #43628a;
  //}
}
</style>
