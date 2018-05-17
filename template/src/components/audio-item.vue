<template>
  <div class="md-audio-item">
    <view class="md-audio-item__item">
      <image class="md-audio-item__poster" mode="aspectFit" :src="audio.icon"></image>
      <view class="md-audio-item__meta">
        <text class="md-audio-item__title">{{ audio.title }}</text>
        <text class="md-audio-item__sub-title">{{ audio.content }}</text>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    audio: Object,
    default () {
      return {}
    }
  }
}
</script>

<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';

@include c('audio-item') {

  @include e('item') {
    display: flex;
    padding: 20rpx 40rpx;
    border-bottom: 1rpx solid #eee;
    cursor: pointer;
  }

  @include e('poster') {
    width: 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    background-color: #333;
  }

  @include e('meta') {
    flex: 1;
  }

  @include e('title') {
    display: block;
    margin-bottom: 15rpx;
    font-size: 32rpx;
  }

  @include e('sub-title') {
    display: block;
    margin-bottom: 15rpx;
    font-size: 22rpx;
    color: #808080;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  @include e('artists') {
    font-size: 24rpx;
    color: #999;
  }

  @include e('rating-text') {
    display: inline-block;
    width: 40rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    background-color: rgba(247, 76, 49, 0.8);
    color: #fff;
    padding: 10rpx;
    border-radius: 20rpx;
  }
}

</style>
