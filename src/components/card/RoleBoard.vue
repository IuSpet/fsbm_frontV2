<template>
  <div class="role-board-container">
    <h2>{{ boardTitle }}</h2>
    <div class="role-container">
      <el-tag v-for="role in roleList" :type="boardType">{{ role.role }}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleBoard',
  props: {
    boardTitle: {
      type: String,
      default: ''
    },
    roleList: {
      type: Array,
      default: () => []
    },
    boardType: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.role-board-container {
  padding-bottom: 5px;

  h2 {
    font-size: 1.3em;
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    color: #3b3b3b;
  }

  .role-container {
    .el-tag {
      width: 80px;
      text-align: center;
      margin-right: 15px;
    }
  }
}
</style>
