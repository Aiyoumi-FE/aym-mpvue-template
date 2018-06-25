<template>
  <div class="md-album-top">
    <div class="md-album-top__img">
        <img :src="album.logo" alt="" mode="aspectFit" />
    </div>
    <div class="md-album-top__title"></div>
    <div class="md-album-top__desc"></div>
  </div>
</template>

<script>
export default {
  props: {
    album: Object,
    default () {
      return {}
    }
  }
}
</script>
<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';

@include c('album-top') {
  background-color: #fff;
  @include e('img') {
    width: 100%;
    height: 480rpx;
    overflow: hidden;
    img {
        width: 100%;
    }
  }

  @include e('title') {
    font-size: 36rpx;
    font-weight: 500;
    padding: 20rpx 32rpx 0;
  }

  @include e('desc') {
    font-size: 28rpx;
    color: #999;
    padding: 0 32rpx 32rpx;
  }
}

</style>
