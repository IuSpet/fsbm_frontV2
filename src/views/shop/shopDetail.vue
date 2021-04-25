<template>

</template>

<script>
export default {
  name: 'shopDetail',
  data() {
    return {
      shopId: this.$route.query.id * 1
    }
  },
  created() {
    if (!this.shopId) {
      this.$router.push({ path: '/404' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
