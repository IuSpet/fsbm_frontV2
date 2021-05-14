<template>
  <div class="alarm-list-container">
    <alarm-list-form @query="handleQuery"/>
    <alarm-table
      :table-data="tableData"
      :data-loading="loading"
      @sort-change="handleSortChange"
    />
    <table-bottom
      :total-cnt="3"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import AlarmListForm from '@/components/form/AlarmListForm'
import AlarmTable from '@/components/table/AlarmTable'
import TableBottom from '@/components/tool/TableBottom'

export default {
  name: 'alarmList',
  components: {
    AlarmListForm,
    AlarmTable,
    TableBottom
  },
  data() {
    return {
      //todo:hack测试数据，之后清除
      tableData: [],
      form:{

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-list-container{
  padding: 15px;
}
</style>
