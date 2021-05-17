<template>
  <div class="edit-user-role-form-container">
    <!--为用户增加角色-->
    <el-form ref="form" :model="addRoleForm" label-width="80px">
      <el-form-item label="角色" prop="role">
        <el-select v-model="addRoleForm.roleId" filterable placeholder="请选择">
          <el-option
            v-for="role in roles"
            :key="role.id"
            :label="role.role"
            :value="role.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="过期时间" prop="expire">
        <el-select v-model="addRoleForm.expire" placeholder="选择过期时间">
          <el-option label="7天" :value="7 * 24 * 3600"/>
          <el-option label="30天" :value="30 * 24 * 3600"/>
          <el-option label="180天" :value="180 * 24 * 3600"/>
          <el-option label="365天" :value="365 * 24 * 3600"/>
        </el-select>
      </el-form-item>
      <el-button class="submit-button" type="primary" @click="handleAddRole">增加</el-button>
    </el-form>
    <!--为用户删除角色-->
    <el-form ref="form" :model="deleteRoleForm" label-width="80px">
      <el-form-item label="角色" prop="role">
        <el-select v-model="addRoleForm.roleId" filterable placeholder="请选择">
          <el-option
            v-for="role in activeRoles"
            :key="role.id"
            :label="role.role"
            :value="role.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button class="submit-button" type="danger" @click="handleDeleteRole">删除</el-button>
    </el-form>
  </div>
</template>

<script>
import { RoleList } from '@/api/auth'

export default {
  name: 'EditUserRoleForm',
  props: {
    userId: {
      type: Number,
      default: -1
    },
    activeRoles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      addRoleForm: {
        UserId: this.userId,
        roleId: null,
        expire: null
      },
      deleteRoleForm: {
        UserId: this.userId,
        roleId: null
      },
      roles: []
    }
  },
  methods: {
    /**
     * 查询所有角色
     */
    queryRoles() {
      RoleList().then(rsp => {
        const { data } = rsp
        this.roles = data.list
      })
    },
    handleAddRole() {
      this.$emit('add-role', this.addRoleForm)
      this.addRoleForm = {
        roleId: null,
        expire: null
      }
    },
    handleDeleteRole() {
      this.$emit('delete-role', this.deleteRoleForm)
      this.deleteRoleForm = {
        roleId: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-user-role-form-container {
  padding: 10px;

  .el-form {
    margin-bottom: 15px;
  }
}

.submit-button {
  width: 130px;
}
</style>
