<template>
  <div class="apply-role-list-container">
    <ul>
      <li>
        申请用户：{{ info.user }}
      </li>
      <li>
        申请角色：{{ info.role }}
      </li>
      <li>
        申请理由：{{ info.reason }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ApplyRoleList',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
