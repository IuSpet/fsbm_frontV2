<template>
  <div class="apply-role-container">
    <role-board board-type="success" board-title="拥有角色" :role-list="activeRoles"/>
    <role-board board-type="info" board-title="已过期角色" :role-list="expiredRoles"/>
    <div class="apply-form">
      <h2>申请角色</h2>
      <apply-role-form @apply="handleApply"/>
    </div>
  </div>
</template>

<script>
import RoleBoard from '@/components/card/RoleBoard'
import ApplyRoleForm from '@/components/form/ApplyRoleForm'
import { applyRole } from '@/api/user'
import { UserRoleList } from '@/api/auth'

export default {
  name: 'applyRole',
  components: {
    RoleBoard,
    ApplyRoleForm
  },
  data() {
    return {
      activeRoles: [],
      expiredRoles: []
    }
  },
  created() {
    this.queryRoles()
  },
  methods: {
    handleApply(form) {
      const data = {
        role_id: form.roleId,
        reason: form.reason,
        email: this.$store.getters.email
      }
      applyRole(data).then(() => {
        this.$message({
          message: '申请成功，等待管理员审核',
          type: 'success'
        })
      })
    },
    /**
     * 查询过期角色和激活角色
     */
    queryRoles() {
      const data = {
        email: this.$store.getters.email
      }
      UserRoleList(data).then(rsp => {
        const { data } = rsp
        this.activeRoles = data['active_roles'].map(a => a.role)
        this.expiredRoles = data['expired_roles'].map(a => a.role)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-role-container {
  padding: 20px;

  .apply-form {
    .apply-role-form-container {
      width: 50%;
    }
  }
}

h2 {
  font-size: 1.3em;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #3b3b3b;
}
</style>
