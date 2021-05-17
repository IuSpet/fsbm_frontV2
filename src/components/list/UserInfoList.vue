<template>
  <div class="user-info-list-container">
    <h2>用户基本信息<span><el-button type="small" @click="handleEdit">编辑</el-button></span></h2>
    <ul class="info-list">
      <li class="info-item">
        邮箱：{{ info.email }}
      </li>
      <li class="info-item">
        用户名：{{ info.name }}
      </li>
      <li class="info-item">
        性别：{{ info.gender }}
      </li>
      <li class="info-item">
        年龄：{{ info.age }}
      </li>
      <li class="info-item">
        手机号：{{ info.phone }}
      </li>
      <li class="info-item">
        注册时间：{{ info.created_at }}
      </li>
      <li class="info-item">
        状态：{{ info.status }}
      </li>
    </ul>
    <el-drawer
      title="编辑基本信息"
      :visible.sync="editInfo"
      direction="rtl"
      ref="drawer"
    >
      <div class="review-drawer">
        <edit-user-info-form :form="form"/>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import EditUserInfoForm from '@/components/form/EditUserInfoForm'
import { UserInfo } from '@/api/admin'

export default {
  name: 'UserInfoList',
  components: {
    EditUserInfoForm
  },
  props: {
    userId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      info: {},
      form: {},
      editInfo: false
    }
  },
  created() {
    this.queryUserInfo()
  },
  methods: {
    queryUserInfo() {
      const data = {
        user_id: this.userId
      }
      UserInfo(data).then(rsp => {
        const { data } = rsp
        this.info = data
      })
    },
    handleEdit() {
      this.form = { ...this.info }
      this.editInfo = true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-list-container {
  h2 {
    span {
      margin-left: 5px;

      .el-button {

      }
    }
  }

  .info-list {
    list-style-type: none;
    padding: 5px;
    font-size: 1.1em;

    .info-item {
      margin-bottom: 20px;
    }
  }
}

.review-drawer {
  padding: 10px;

  .edit-user-container {
  }
}
</style>
