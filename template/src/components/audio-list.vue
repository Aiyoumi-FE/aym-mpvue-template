<template>
  <div class="md-audio-list">
    <view class="md-audio-list__list">
      <navigator :url="pageUrl + item._id" v-for="(item, index) in audios" :key="item.index">
        <audio-item :audio="item"></audio-item>
      </navigator>
      <view class="md-audio-list__tips">
        <view v-if="hasMore">
          <image class="md-audio-list__tips-image"  src="/static/images/loading.gif" mode="aspectFit"/>
          <text class="md-audio-list__tips-text">正在加载...</text>
        </view>
        <view v-else>
          <text>--------------- 没有更多数据了 --------------</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import audioItem from '@/components/audio-item'

export default {
  components: {
    'audio-item': audioItem
  },

  props: {
    audios: {
      type: Array,
      default () {
        return []
      }
    },
    hasMore: {
      type: Boolean,
      default: true
    },

    type: String
  },
  data () {
    return {
      pageUrl: '/pages/audio/main?id='
    }
  },
  created () {
    if (this.type === 'album') {
      this.pageUrl = '/pages/list/main?id='
    } else {
      this.pageUrl = '/pages/audio/main?id='
    }
    console.log(this.type)
  }
}
</script>

<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';

@include c('audio-list') {

  @include e('list') {
    height: 100%;
  }

  @include e('tips') {
    font-size: 28rpx;
    text-align: center;
    padding: 50rpx;
    color: #ccc;
  }

  @include e('tips-text') {
    vertical-align: middle;
  }

  @include e('tips-image') {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
    vertical-align: middle;
  }
}

</style>
