<template>
  <div class="table-bottom-container" style="margin-top:5px;">
    <el-row :gutter="10">
      <el-col :span="6">
        <div>共{{ totalCnt }}条数据，当前展示{{ showRange }}条</div>
      </el-col>
      <el-col :span="4">
        <div>
          <el-button type="info" size="small" round style="margin-right: 10px" @click="$emit('export')">导出</el-button>
          <el-button type="info" size="small" round @click="$emit('print')">打印</el-button>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalCnt"
            background
            layout="sizes, prev, pager, next, jumper"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TableBottom',
  props: {
    // 表格总行数
    totalCnt: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    showRange() {
      const left = this.totalCnt === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1
      const right = Math.min(left - 1 + this.pageSize, this.totalCnt)
      return left + '到' + right
    }
  },
  methods: {
    /**
     * 向上传递页面大小改变事件
     * @param size
     */
    handleSizeChange(size) {
      this.pageSize = size
      this.$emit('size-change', size)
    },
    /**
     * 向上传递当前页面改变事件
     * @param current
     */
    handleCurrentChange(current) {
      this.currentPage = current
      this.$emit('current-change', current)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-bottom-container {
  .block {
    position: absolute;
    right: 10px;
  }
}
</style>
