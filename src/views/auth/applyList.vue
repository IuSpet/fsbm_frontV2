<template>
  <div class="apply-list-container">
    <apply-role-list-form @query="handleQuery"/>
  </div>
</template>

<script>
import ApplyRoleListForm from '@/components/form/ApplyRoleListForm'

export default {
  name: 'applyList',
  components: {
    ApplyRoleListForm
  },
  data() {
    return {
      form: {
        name: '',
        role: [],
        status: [],
        submitRange: null
      }
    }
  },
  methods: {
    handleQuery(form) {
      this.form = form
    }
  }
}
</script>

<style scoped>

</style>
