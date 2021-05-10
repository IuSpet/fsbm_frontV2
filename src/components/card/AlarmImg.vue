<template>
  <div class="alarm-img-container">
    <p>报警图片：</p>
    <img class="alarm-img" src="@/assets/hat1.png" alt="报警图片">
  </div>
</template>

<script>
export default {
  name: 'AlarmImg'
}
</script>

<style lang="scss" scoped>
.alarm-img-container {
  .alarm-img {
    width: 500px;
    height: 500px;
    object-fit: contain;
  }
}
</style>
