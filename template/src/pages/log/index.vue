<template>
  <div class="md-list">
    <view class="md-list__header">
      专题
    </view>
    <audio-list :audios="albums" type="album" :has-more="false"></audio-list>
    <view class="md-list__header">
      音频
    </view>
    <audio-list :audios="audios" type="audio" :has-more="false"></audio-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import wx from '@/utils/wx'
import audioList from '@/components/audio-list'
import { OBJ_TYPE_ALBUM, OBJ_TYPE_AUDIO } from '@/store/obj-type'

export default {
  components: {
    audioList
  },

  computed: {
    ...mapState('log', ['audios', 'albums'])
  },

  methods: {
    ...mapActions('log', [
      'getLogList'
    ]),
    async getLogs () {
      let data = await this.getLogList({type: OBJ_TYPE_ALBUM})
      await this.getLogList({type: OBJ_TYPE_AUDIO})
      console.log(data)
    }
  },

  mounted () {
    this.getLogs()
  },

  async onPullDownRefresh () { // 下拉刷新
    this.clearState()
    await this.getLogs()
    wx.stopPullDownRefresh()
  }
}
</script>
<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';

@include c('list') {

  @include e('header') {
    display: flex;
    justify-content: center;
    color: #666;
    font-size: 38rpx;
    text-align: center;
    height:80rpx;
    line-height:80rpx;
    border-bottom: 1rpx solid #ccc;
  }
}
</style>
