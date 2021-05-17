<template>
  <div class="user-role-container">
    <h2>用户角色信息<span><el-button type="small" @click="handleEdit">编辑</el-button></span></h2>
    <role-board board-type="success" board-title="拥有角色" :role-list="activeRoles"/>
    <role-board board-type="info" board-title="已过期角色" :role-list="expiredRoles"/>
    <el-drawer
      title="编辑角色信息"
      :visible.sync="editRole"
      direction="rtl"
      ref="drawer"
    >
      <div class="review-drawer">
        <edit-user-role-form
          :user-id="userId"
          :active-roles="activeRoles"
          @add-role="handleAddRole"
          @delete-role="handleDeleteRole"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import RoleBoard from '@/components/card/RoleBoard'
import EditUserRoleForm from '@/components/form/EditUserRoleForm'
import { UserRoleList } from '@/api/auth'
import { AddUserRole, DeleteUserRole } from '@/api/admin'

export default {
  name: 'UserRoleList',
  components: {
    RoleBoard,
    EditUserRoleForm
  },
  props: {
    userId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      activeRoles: [],
      expiredRoles: [],
      editRole: false
    }
  },
  created() {
    this.queryRoles()
  },
  methods: {
    /**
     * 查询过期角色和激活角色
     */
    queryRoles() {
      const data = {
        user_id: this.userId
      }
      UserRoleList(data).then(rsp => {
        const { data } = rsp
        this.activeRoles = data['active_roles'].map(a => a.role)
        this.expiredRoles = data['expired_roles'].map(a => a.role)
      })
    },
    handleEdit() {
      this.editRole = true
    },
    handleAddRole(form) {
      AddUserRole(form).then(() => {
        this.queryRoles()
      })
    },
    handleDeleteRole(form) {
      DeleteUserRole(form).then(() => {
        this.queryRoles()
      })
    }
  }
}
</script>

<style scoped>

</style>
