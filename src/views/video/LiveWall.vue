<template>
  <div class="wall-container">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div v-for="(info,index) in deviceFilter(0)" class="wall-item">
          <live-player
            class="player"
            :player-id="'player_0_'+index"
            :video-type="info.video_type"
            :video-src="info.video_src"
          />
          <p class="player-description">{{ info.shop_name }}: {{ info.device_name }}</p>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div class="wall-item">
          <live-player class="player" player-id="player_2"/>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div class="wall-item">
          <live-player class="player" player-id="player_3"/>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div class="wall-item">
          <live-player class="player" player-id="player_4"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LivePlayer from '@/components/player/LivePlayer'

export default {
  name: 'LiveWall',
  components: {
    LivePlayer
  },
  data() {
    return {
      deviceList: []
    }
  },
  methods: {
    queryDeviceList() {
      //todo 查询监控设备源列表
    },
    /**
     * 根据基数除以4取余筛选
     * @param {number}base
     */
    deviceFilter(base) {
      return (base) => {
        base = base % 4
        return this.deviceList.filter(({ index }) => {
          if (typeof base !== 'number') {
            return false
          }
          return index % 4 === base
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wall-container {
  padding: 15px;
}

.wall-item {
  margin-top: 10px;
  margin-bottom: 10px;

  .player-description {
    width: 100%;
    margin: 0;
    padding: 0 2px 0 2px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
