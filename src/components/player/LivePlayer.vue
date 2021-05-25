<template>
  <div :id="playerId">

  </div>
</template>

<script>
import 'xgplayer'
import FlvPlayer from 'xgplayer-flv'
import HlsPlayer from 'xgplayer-hls'

export default {
  name: 'LivePlayer',
  props: {
    playerId: {
      type: String,
      default: 'mse'
    },
    videoType: {
      type: String,
      default: 'hls'
    },
    videoSrc: {
      type: String,
      default: ''
    },
    playerWidth: {
      type: Number,
      default: 600
    },
    playerHeight: {
      type: Number,
      default: 337.5
    }
  },
  data() {
    return {
      player: null,
      type: null,
      src: null
    }
  },
  created() {
    this.type = this.videoType
    this.src = this.videoSrc
    if (this.videoSrc === '') {
      switch (this.videoType) {
        case 'flv':
          // this.src = '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
          break
        default:
        case 'hls':
          // this.src = '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8'
      }
    }
  },
  mounted() {
    switch (this.type) {
      case 'flv':
        this.player = new FlvPlayer({
          id: this.playerId,
          url: this.src,
          isLive: true,
          preloadTime: 30,
          minCachedTime: 5,
          cors: true,
          width: this.playerWidth,
          height: this.playerHeight,
          fluid: true
        })
        break
      default:
      case 'hls':
        this.player = new HlsPlayer({
          id: this.playerId,
          url: this.src,
          isLive: true,
          preloadTime: 30,
          minCachedTime: 5,
          cors: false,
          width: this.playerWidth,
          height: this.playerHeight,
          fluid: true
        })
    }
  }

}
</script>

<style scoped>

</style>
