<template>
  <div class="form-main-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="店铺名称">
        <el-input
          v-model="form.name"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input
          v-model="form.addr"
          maxlength="50"
          show-word-limit
        />
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
          v-model="form.extra"
          maxlength="100"
          show-word-limit
          @click.native.prevent="handleRegister"
        />
      </el-form-item>
    </el-form>
    <div class="button-container">
      <el-button type="primary" @click="handleRegister">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddShopForm',
  data() {
    return {
      form: {
        name: null,
        addr: null,
        extra: null
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
      errorTip: '严重报警最短间隔1分钟报警一次'
    }
  },
  methods: {
    handleRegister() {
      // todo:店铺注册处理
      console.log(this.form)
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
