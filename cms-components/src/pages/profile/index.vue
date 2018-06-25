<template>
  <div class="md-profile">
    <!-- <view class="md-profile__header">
      <text class="md-profile__title"></text>
    </view> -->
    <view class="md-profile__user" @click="getUserInfo">
      <image class="md-profile__user-avatar" :src="userInfo.avatarUrl" mode="aspectFit"/>
      <text class="md-profile__user-nickname"></text>
      <text :hidden="!userInfo.city">, </text>
      <text :hidden="!userInfo.city"> Thanks~ </text>
    </view>
    <navigator url="/pages/log/main">
      <button type="primary">浏览历史</button>
    </navigator>
  </div>
</template>

<script>
import { login, getUserInfo } from '@/utils/wechat'
export default {
  data () {
    return {
      title: '关于',
      userInfo: {
        wechat: 'SG',
        nickName: '八爪鱼听听',
        avatarUrl: '/static/images/logo-l.png'
      }
    }
  },

  methods: {
    async getUserInfo () {
      const data = await getUserInfo()
      this.userInfo = data.userInfo
    }
  },

  mounted () {
    login().then(res => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';

@include c('profile') {

  @include e('header') {
    display: flex;
    justify-content: center;
    border-bottom: 1rpx solid #ccc;
  }

  @include e('title') {
    padding: 40rpx;
    color: #999;
    font-size: 148rpx;
    text-align: center;
  }

  @include e('user') {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @include e('user-avatar') {
    width: 240rpx;
    border-radius: 50%;
    height: 240rpx;
    margin: 40rpx;
  }

  @include e('user-nickname') {
    color: #aaa;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }
}

</style>
