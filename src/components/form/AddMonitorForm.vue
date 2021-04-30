<template>
  <div class="monitor-form-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="店铺" prop="shop">
        <el-autocomplete
          popper-class="my-autocomplete"
          class="inline-input"
          v-model="form.shopName"
          :fetch-suggestions="handleSuggestions"
          placeholder="选择店铺"
          @select="handleSelect"
        >
          <template slot-scope="{item}">
            <div class="shop-name">{{ item.shop_name }}</div>
            <div class="shop-addr">{{ item.addr }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="监控名" prop="name">
        <el-input v-model="form.monitorName" />
      </el-form-item>
      <el-form-item label="视频格式">
        <el-radio-group>

        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ShopListByEmail } from '@/api/shop'

export default {
  name: 'AddMonitorForm',
  data() {
    return {
      form: {
        shopId: 0,
        shopName: '',
        monitorName: '',
        videoSrc: '',
        videoType: ''
      },
      shopList: []
    }
  },
  created() {
    this.queryShopList()
  },
  methods: {
    queryShopList() {
      let email = this.$store.getters.email
      const data = {
        user_email: email
      }
      ShopListByEmail(data).then(rsp => {
        const { data } = rsp
        this.shopList = data.list
      }).catch(() => {
        this.shopList = [{ shop_id: 1, shop_name: 'test_shop', addr: '四川省成都市双流区' }]
      })
    },
    handleSuggestions(queryString, cb) {
      let shopList = this.shopList
      let results = queryString ? shopList.filter(this.createFilter(queryString)) : shopList
      cb(results)
    },
    createFilter(queryString) {
      return (shop) => {
        return shop['shop_name'].toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(shop) {
      this.form.shopId = shop['shop_id']
      this.form.shopName = shop['shop_name']
    }
  }
}
</script>

<style lang="scss" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .shop-name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .shop-addr {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}


</style>
