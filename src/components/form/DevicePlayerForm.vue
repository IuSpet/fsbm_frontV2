<template>
  <div class="device-player-form-container">
    <el-autocomplete
      v-model="deviceName"
      :fetch-suggestions="shopDeviceFilter"
      placeholder="选择直播监控"
      @select="handleSelect"
    />
    <live-player player-id="device_player" :video-type="videoType" :player-src="videoSrc"/>
  </div>
</template>

<script>
import LivePlayer from '@/components/player/LivePlayer'

export default {
  name: 'DevicePlayerForm',
  components: {
    LivePlayer
  },
  props: {
    shopId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      deviceList: [],
      videoType: 'hls',
      videoSrc: '',
      deviceName: ''
    }
  },
  created() {
    if (!this.shopId) {
      this.deviceList = []
      return
    }
    this.queryShopDevice()
  },
  methods: {
    queryShopDevice() {
      //todo:查询店铺监控列表
    },
    /**
     * 根据输入内容筛选选择
     * @param queryString 输入内容
     * @param cb 可选列表回调
     */
    shopDeviceFilter(queryString, cb) {

    },
    handleSelect(item) {
      //todo:用监控的源src播放
    }
  }
}
</script>

<style lang="scss" scoped>
.device-player-form-container {
  .el-autocomplete {
    margin-bottom: 15px;
  }
}
</style>
