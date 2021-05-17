<template>
  <div class="shop-info-list-container">
    <ul class="info-list">
      <li class="info-item">
        店铺名称：{{ info.name }}
      </li>
      <li class="info-item">
        店铺地址：{{ info.addr }}
      </li>
      <li class="info-item">
        店铺负责人：{{ info.admin_name }}
      </li>
      <li class="info-item">
        联系方式：{{ info.admin_phone }}
      </li>
      <li class="info-item">
        今日报警数量：{{ info.notice_cnt }}
      </li>
      <li class="info-item" v-if="email === info.admin_email">
        备注：{{ info.remark }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ShopInfo } from '@/api/shop'

export default {
  name: 'ShopInfoList',
  props: {
    ShopId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      email: this.$store.getters.email,
      info: {
        name: '',
        admin_name: '',
        admin_phone: '',
        admin_email: '',
        addr: '',
        notice_cnt: ''
      }
    }
  },
  mounted() {
    this.queryShopInfo()
  },
  methods: {
    queryShopInfo() {
      const data = {
        shop_id: this.shop_id
      }
      ShopInfo(data).then(rsp => {
        const { data } = rsp
        this.info = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-info-list-container {
  .info-list {
    list-style-type: none;
    padding: 5px;
    font-size: 1.1em;

    .info-item {
      margin-bottom: 20px;
    }
  }
}
</style>
