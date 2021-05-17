<template>
  <div class="user-detail-container">
    <el-row :gutter="50">
      <el-col class="info-col" :span="12">
        <user-info-list :user-id="userId"/>
        <user-role-list :user-id="userId"/>
      </el-col>
      <el-col :span="12">
        <user-operation-table :user-id="userId"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserInfoList from '@/components/list/UserInfoList'
import UserRoleList from '@/components/list/UserRoleList'
import UserOperationTable from '@/components/table/UserOperationTable'

export default {
  name: 'userDetail',
  components: {
    UserInfoList,
    UserRoleList,
    UserOperationTable
  },
  data() {
    return {
      userId: this.$route.query.id * 1
    }
  },
  created() {
    if (!this.userId instanceof Number) {
      // console.log(this.userId)
      this.$router.push({ path: '/404' })
    }
    this.queryRoles()
  }
  ,
  methods: {}
}
</script>

<style lang="scss" scoped>
.user-detail-container {
  padding: 20px;

  .el-row {
    .info-col {
      border-right: #7a7a7a solid 1px;
    }

    .el-col {
      .point-map {
        width: 100%;
        height: 400px;
      }
    }
  }
}
</style>
