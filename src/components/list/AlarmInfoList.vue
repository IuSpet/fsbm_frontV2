<template>
  <div class="alarm-info-list-container">
    <ul class="info-list">
      <li class="info-item">
        店铺名称：{{ info.shop_name }}
      </li>
      <li class="info-item">
        店铺地址：{{ info.addr }}
      </li>
      <li class="info-item">
        店铺负责人：{{ info.admin_name }}
      </li>
      <li class="info-item">
        联系电话：{{ info.admin_phone }}
      </li>
      <li class="info-item">
        联系邮箱：{{ info.admin_email }}
      </li>
      <li class="info-item">
        报警内容：{{ info.alarm_content }}
      </li>
      <li class="info-item">
        报警时间：{{ info.alarm_at }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AlarmInfoList',
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

<style lang="scss" scoped>
.alarm-info-list-container {
  .info-list {
    list-style-type: none;
    padding: 5px;
    font-size: 1.1em;

    .info-item {
      margin-bottom: 20px;

      .alarm-img {
        width: 400px;
        height: 400px;
        object-fit: fill;
      }
    }
  }
}
</style>
