<template>
  <div class="c-page">
      <div class="c-content">
        <div class="detail-top">
            <div class="detail-top__img">
                <img :src="audio.icon"  mode="aspectFit" alt="" />
                <div class="album-title animate-slide-up"></span>
                </div>
            </div>
            <div class="detail-audio" v-if="audio.url">
                <audio :author="album.title" :name="audio.title" :src="audio.url" id="myAudio" controls loop @click="audioPlay"></audio>
            </div>
        </div>
        <div class="detail-content">
            <h3></h3>
            <!--<button type="primary" @click="audioPlay">播放</button>
             <p class="time">2018-01-30 12:30:12</p> -->
            <!-- <p>
                <img :src="albumImg" alt="">
            </p> -->
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { ITEM_CLEAR_AUDIO } from '@/store/mutations-type'
import { OBJ_TYPE_AUDIO } from '@/store/obj-type'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      id: null,
      audioCtx: null,
      state: 'stop'
    }
  },

  computed: {
    ...mapState('audio', {
      audio: state => state.audio,
      album: state => state.album
    })
  },

  methods: {
    ...mapActions('audio', [
      'getAudio'
    ]),
    ...mapActions('log', [
      'saveLog'
    ]),
    ...mapMutations('audio', {
      clearAudio: ITEM_CLEAR_AUDIO
    }),
    audioPlay () {
      if (this.state === 'play') {
        this.audioCtx.pause()
        this.state = 'pause'
      } else {
        this.audioCtx.play()
        this.state = 'play'
      }
      console.log({type: OBJ_TYPE_AUDIO, obj: this.audio})
      this.saveLog({type: OBJ_TYPE_AUDIO, obj: this.audio})
    },
    audioPause () {
      this.audioCtx.pause()
    },
    audio14 () {
      this.audioCtx.seek(14)
    },
    audioStart () {
      this.audioCtx.seek(0)
    },
    async getAudioData (id) {
      await this.getAudio({ id })
      wx.setNavigationBarTitle({ title: this.audio.title })
    }
  },

  mounted () {
    console.log(OBJ_TYPE_AUDIO)
    const id = this.$root.$mp.query.id
    if (!id) {
      return wx.navigateBack()
    }
    this.id = id
    this.getAudioData(id)
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  onUnload () {
    this.clearAudio()
  }
}
</script>

<style lang="scss">
@import '../../assets/css/style.scss';
.detail-top {
    background-color: #fff;
    .detail-top__img {
        width: 100%;
        height: px2rem(480);
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
        }
        .album-title {
            width: 100%;
            line-height: px2rem(36);
            background-color: rgba(0, 0, 0, .6);
            color: #fff;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: px2rem(32);
            text-indent: px2rem(20);
            padding: px2rem(20) px2rem(0);
            span {
                font-size: px2rem(32);
                color: #fff;
            }
        } 
    }
    .detail-audio {
        padding: px2rem(20);
        audio {
            width: 100%;
        }
    }
}
 

.detail-content {
    margin-top: px2rem(24);
    background-color: #fff;
    padding: px2rem(24) 0 px2rem(90);
    h3,
    .time {
        padding: 0 px2rem(32);
    }
    h3 {
        color: #222;
    }
    .time {
        color: #999;
        padding-bottom: px2rem(24);
    }
    img {
        width: 100%;
    }
}
</style>
