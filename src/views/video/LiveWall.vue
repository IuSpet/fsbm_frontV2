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
          <p class="player-description">{{ info.shop_name }}: {{ info.monitor_name }}</p>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div v-for="(info,index) in deviceFilter(1)" class="wall-item">
          <live-player
            class="player"
            :player-id="'player_1_'+index"
            :video-type="info.video_type"
            :video-src="info.video_src"
          />
          <p class="player-description">{{ info.shop_name }}: {{ info.monitor_name }}</p>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div v-for="(info,index) in deviceFilter(2)" class="wall-item">
          <live-player
            class="player"
            :player-id="'player_2_'+index"
            :video-type="info.video_type"
            :video-src="info.video_src"
          />
          <p class="player-description">{{ info.shop_name }}: {{ info.monitor_name }}</p>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8" :xl="6">
        <div v-for="(info,index) in deviceFilter(3)" class="wall-item">
          <live-player
            class="player"
            :player-id="'player_3_'+index"
            :video-type="info.video_type"
            :video-src="info.video_src"
          />
          <p class="player-description">{{ info.shop_name }}: {{ info.monitor_name }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LivePlayer from '@/components/player/LivePlayer'
import { LiveWallSrc } from '@/api/shop'

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
  mounted() {
    this.queryDeviceList()
  },
  computed: {
    tmpList() {
      return this.deviceFilter(0)
    }
  },
  methods: {
    queryDeviceList() {
      LiveWallSrc(null).then(rsp => {
        console.log(rsp)
        const { data } = rsp
        this.deviceList = data['list']
      })
    },
    /**
     * 根据基数除以4取余筛选
     * @param {number}base
     */
    deviceFilter(base) {
      return this.deviceList.filter((e, index, a) => {
        if (typeof base !== 'number') {
          return false
        }
        return index % 4 === base
      })
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
