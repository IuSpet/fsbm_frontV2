<template>
  <div class="device-player-form-container">
    <el-select
      v-model="deviceId"
      filterable
      placeholder="选择直播监控"
      style="margin-bottom: 5px">
      <el-option
        v-for="item in deviceList"
        :key="item.id"
        :label="item.monitor_name"
        :value="item.id">
      </el-option>
    </el-select>
    <live-player :key="playerKey" player-id="device_player" :video-type="videoType" :video-src="videoSrc"/>
  </div>
</template>

<script>
import LivePlayer from '@/components/player/LivePlayer'
import {ShopDeviceList} from "@/api/shop";

export default {
  name: 'DevicePlayerForm',
  components: {
    LivePlayer
  },
  props: {
    shopId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      deviceList: [],
      videoType: 'hls',
      videoSrc: '',
      deviceName: '',
      deviceId: null,
      playerKey: -1,
    }
  },
  created() {
    if (!this.shopId) {
      return
    }
    this.queryShopDevice()
  },
  watch: {
    deviceId() {
      for (let device of this.deviceList) {
        if (device.id === this.deviceId) {
          this.videoType = device.video_type
          this.videoSrc = device.video_src
          this.playerKey = device.id
        }
      }
    }
  },
  methods: {
    queryShopDevice() {
      const data = {
        shop_id: this.shopId
      }
      ShopDeviceList(data).then(rsp => {
        const {data} = rsp
        this.deviceList = data['list']
      })
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
