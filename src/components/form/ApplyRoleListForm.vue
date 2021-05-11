<template>
  <div class="apply-role-list-form-container">
    <el-form ref="form" :inline="true" :model="form" class="user-table-form">
      <el-form-item label="申请用户名">
        <el-input clearable v-model="form.name"/>
      </el-form-item>
      <el-form-item label="申请角色">
        <el-select v-model="form.role" multiple placeholder="请选择">
          <el-option
            v-for="role in roleList"
            :key="role.id"
            :label="role.role"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工单状态">
        <el-select v-model="form.status" multiple placeholder="请选择">
          <el-option
            v-for="status in statusList"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker v-model="form.submitRange"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$emit('query-list',form)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { RoleList } from '@/api/auth'

export default {
  name: 'ApplyRoleListForm',
  data() {
    return {
      form: {
        name: '',
        role: [],
        status: [],
        submitRange: null
      },
      roleList: [],
      statusList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.queryRoleList()
    this.queryStatusList()
  },
  methods: {
    queryRoleList() {
      RoleList({}).then(rsp => {
        const { data } = rsp
        this.roleList = data.list
      }).catch(err => {
        this.roleList = []
      })
    },
    queryStatusList() {
      this.statusList = [
        {
          label: '未审批',
          value: 0
        },
        {
          label: '已通过',
          value: 1
        },
        {
          label: '已拒绝',
          value: 2
        }
      ]
    }
  }

}
</script>

<style scoped>

</style>
