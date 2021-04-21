<template>
  <div class="form-main-container">
    <el-form ref="form" :model="form" :rules="addRules" label-width="80px">
      <el-form-item label="店铺名称" prop="name">
        <el-input
          ref="name"
          v-model="form.name"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="店铺地址" prop="addr">
        <el-input
          v-model="form.addr"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="经纬度" prop="pos">
        <el-input v-model.number="form.latitude" placeholder="经度" style="width: 120px; margin-right: 10px"/>
        <el-input v-model.number="form.longitude" placeholder="纬度" style="width: 120px"/>
      </el-form-item>
      <el-form-item label="普通报警">
        <el-switch v-model="notice.info.switch" active-color="#13ce66" inactive-color="#ff4949"/>
        <el-tooltip effect="light" :content="infoTip" placement="right">
          <i class="el-icon-info"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="普通配置" v-if="notice.info.switch">
        <el-input
          v-model.number="notice.info.threshold"
          style="width: 100px;margin-right: 10px"
          placeholder="报警阈值"
        />
        <el-cascader
          v-model="notice.info.noticeRange"
          :options="options"
          :props="props"
          collapse-tags
          clearable
          placeholder="报警范围"
        />
      </el-form-item>
      <el-form-item label="危险报警">
        <el-switch v-model="notice.warn.switch" active-color="#13ce66" inactive-color="#ff4949"/>
        <el-tooltip effect="light" :content="warnTip" placement="right">
          <i class="el-icon-info"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="危险配置" v-if="notice.warn.switch">
        <el-input
          v-model.number="notice.warn.threshold"
          style="width: 100px;margin-right: 10px"
          placeholder="报警阈值"
        />
        <el-cascader
          v-model="notice.warn.noticeRange"
          :options="options"
          :props="props"
          collapse-tags
          clearable
          placeholder="报警范围"
        />
      </el-form-item>
      <el-form-item label="严重报警">
        <el-switch v-model="notice.error.switch" active-color="#13ce66" inactive-color="#ff4949"/>
        <el-tooltip effect="light" :content="errorTip" placement="right">
          <i class="el-icon-info"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="严重配置" v-if="notice.error.switch">
        <el-input
          v-model.number="notice.error.threshold"
          style="width: 100px;margin-right: 10px"
          placeholder="报警阈值"
        />
        <el-cascader
          v-model="notice.error.noticeRange"
          :options="options"
          :props="props"
          collapse-tags
          clearable
          placeholder="报警范围"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          autosize
          v-model="form.remark"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div class="button-container">
      <el-button type="primary" @click="handleRegister">注册</el-button>
    </div>
  </div>
</template>

<script>
import { AddShop } from '@/api/shop'
import { validEmailAddr } from '@/utils/validate'

export default {
  name: 'AddShopForm',
  data() {
    const validatePos = (rule, value, callback) => {
      if (typeof this.form.latitude !== 'number' || typeof this.form.longitude !== 'number') {
        callback('经纬度必须是数字')
      } else if (this.form.latitude < -180 || this.form.latitude > 180) {
        callback('纬度范围-180到180')
      } else if (this.form.longitude < -180 || this.form.longitude > 180) {
        callback('经度范围-180到180')
      } else {
        callback()
      }
    }
    return {
      form: {
        name: null,
        addr: null,
        remark: null,
        latitude: null,
        longitude: null
      },
      notice: {
        info: {
          switch: true,
          threshold: 1,
          noticeRange: [0]
        },
        warn: {
          switch: false,
          threshold: 3,
          noticeRange: [0, 1]
        },
        error: {
          switch: false,
          threshold: 5,
          noticeRange: [0, 1, 2]
        }
      },
      props: { multiple: true },
      options: [
        { value: 0, label: '邮件' },
        { value: 1, label: '公众号' },
        { value: 2, label: '短信' }
      ],
      infoTip: '普通报警最短间隔1小时报警一次',
      warnTip: '危险报警最短间隔15分钟报警一次',
      errorTip: '严重报警最短间隔1分钟报警一次',
      addRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入店铺名称' }],
        addr: [{ required: true, trigger: 'blur', message: '请输入店铺地址' }],
        pos: [{ required: true, trigger: 'blur', validator: validatePos }]
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.execRegister()
        } else {
          console.log('validate fail')
        }
      })
    },
    execRegister() {
      const data = {
        name: this.form.name,
        addr: this.form.addr,
        notice_cfg: {
          info: {
            is_on: this.notice.info.switch,
            threshold: this.notice.info.threshold,
            notice_device: this.notice.info.noticeRange
          },
          warn: {
            is_on: this.notice.warn.switch,
            threshold: this.notice.warn.threshold,
            notice_device: this.notice.error.noticeRange
          },
          error: {
            is_on: this.notice.error.switch,
            threshold: this.notice.error.threshold,
            notice_device: this.notice.error.noticeRange
          }
        },
        remark: this.remark
      }
      AddShop(data).then(() => {
          // 成功后跳转首页
          this.$router.push({ path: this.redirect || '/' })
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.form-main-container {
  padding: 20px;
  width: 50%;

  .el-form {
    .el-form-item {
      .el-tooltip {
        margin-left: 10px;
        cursor: pointer;
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
}
</style>
