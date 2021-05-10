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
      tableData: [
        {
          shop_name: 'test_shop1',
          admin_name: 'test_user1',
          admin_phone: '123456',
          addr: '',
          alarm_content: '后厨有人员未佩戴帽子',
          alarm_at: '2021-05-01 16:05:03',
          alarm_id: 1
        },
        {
          shop_name: 'test_shop2',
          admin_name: 'test_user1',
          admin_phone: '123456',
          addr: '',
          alarm_content: '后厨有人员未佩戴帽子',
          alarm_at: '2021-05-02 12:23:08',
          alarm_id: 2
        },
        {
          shop_name: '水天堂工农路店',
          admin_name: 'test_user1',
          admin_phone: '123456',
          addr: '',
          alarm_content: '后厨有人员未佩戴帽子',
          alarm_at: '2019-11-20 09:55:15',
          alarm_id: 3
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.alarm-list-container{
  padding: 15px;
}
</style>
