<template>
  <div class="monitor-form-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="店铺" prop="shopName">
        <el-autocomplete
          ref="shop"
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
      <el-form-item label="监控名" prop="monitorName">
        <el-input
          ref="name"
          v-model="form.monitorName"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="视频格式" prop="videoType">
        <el-radio-group v-model="form.videoType">
          <el-radio label="flv">flv</el-radio>
          <el-radio label="hls">hls</el-radio>
          <el-radio label="">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="视频源" prop="videoSrc">
        <el-input
          :disabled="!hasType"
          v-model="form.videoSrc"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <div class="button-container">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleClick">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { AddMonitor, ShopListByEmail } from '@/api/shop'

export default {
  name: 'AddMonitorForm',
  data() {
    const validateShop = (rule, value, callback) => {
      if (value.length === 0){
        callback('店铺不能为空')
        return
      }
      const shop = this.shopList.filter(a=>{return a.shop_name === value})
      if (shop.length === 0){
        callback('请输入您拥有的店铺')
        return
      }
      if (this.form.shopId === -1){
        this.form.shopId = shop[0].shop_id
      }
      callback()
    }
    return {
      form: {
        shopId: -1,
        shopName: '',
        monitorName: '',
        videoSrc: '',
        videoType: 'hls'
      },
      shopList: [],
      rules: {
        shopName: [{ required: true, trigger: 'change', validator:validateShop }],
        monitorName: [{ required: true, trigger: 'blur', message: '监控名不能为空' }]
      },
      loading: false
    }
  },
  computed: {
    hasType() {
      return this.form.videoType.length > 0
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
    },
    handleClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const data = {
            shop_id: this.form.shopId,
            name: this.form.monitorName,
            video_type: this.form.videoType,
            video_src: this.form.videoSrc
          }
          AddMonitor(data).then(() => {
            this.loading = false
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('check failed')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor-form-container {
  padding: 20px;
  width: 50%;
}

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

.button-container {
  height: auto;
  width: 150px;
  margin: 0 auto;

  button {
    width: 150px;
  }
}
</style>
