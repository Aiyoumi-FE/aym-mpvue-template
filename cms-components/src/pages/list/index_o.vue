<!--
    Created by song on 2018-01-30
-->
<template>
    <div class="c-page">
        <div class="c-content">
                <div class="album-top">
                    <div class="album-top__img">
                        <img :src="album.logo" alt="" />
                    </div>
                    <div class="album-top__title"></div>
                    <div class="album-top__desc"></div>
                </div>
                <div class="album-box">
                    <h3 class="album-box__title">目录</h3>
                    <ol class="album-box__list">
                        <li class="album-box__item" v-for="(item, index) in audios" :key="item.index" @click="goDetail($event,item)">
                            <navigator :url="'../audio/main?id=' + item._id">
                                <div class="album-box__img">
                                    <img :src="item.icon" alt="" />
                                </div>
                                <div class="album-box__detail">
                                    <p></p>
                                    <div class="audio-box">
                                         
                                    </div>
                                </div>
                            </navigator>
                        </li>
                    </ol>
                </div>
            </scroll>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import wx from '@/utils/wx'
import { LIST_CLEAR_STATE } from '@/store/mutations-type'

export default {
    name: 'list',
    data () {
        return {
            albumId: ''
        }
    },
    filters: {
        addDoname: function (url) {
            return 'http://ketang.31i8.cn' + url
        }
    },
    computed: {
        ...mapState('list', ['audios', 'hasMore', 'album'])
    },

    methods: {
        ...mapMutations('list', {
          clearState: LIST_CLEAR_STATE
        }),
        ...mapActions('list', [
          'getAudios'
        ]),

        async getAudioList () {
          await this.getAudios({albumId: this.albumId})
        }
    },

    mounted () {
        const id = this.$root.$mp.query.id
        if (!id) {
          return wx.navigateBack()
        }
        this.albumId = id
        this.getAudioList()
    },

    async onPullDownRefresh () { // 下拉刷新
        this.clearState()
        await this.getAudioList()
        wx.stopPullDownRefresh()
    },

    onReachBottom () { // 上拉加载
        this.getAudioList()
    },

    onUnload () { // 清空状态
        this.clearState()
    }
}
</script>
<style lang="scss">
@import '../../assets/css/style.scss';
.album-top {
    background-color: #fff;
    .album-top__img {
        width: 100%;
        height: px2rem(480);
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .album-top__title {
        font-size: px2rem(36);
        font-weight: 500;
        padding: px2rem(20) px2rem(32) 0;
    }
    .album-top__desc {
        font-size: px2rem(28);
        color: #999;
        padding: 0 px2rem(32) px2rem(32);
    }
}



.album-box {
    margin-top: px2rem(24);
    background-color: #fff;
    padding: 0 px2rem(32) 0;
    h3 {
        line-height: px2rem(88);
        font-weight: 500;
    }
    .album-box__list {
        li {
            border-bottom: 1px solid #E4E4E4;
            a {
                display: flex;
                padding: px2rem(32) 0;
            }
        }
        li:first-child {
            border-top: 1px solid #E4E4E4;
        }
        .album-box__img {
            img {
                display: block;
                display: flex;
                width: px2rem(120);
                height: px2rem(120);
            }
        }
        .album-box__detail {
            flex: 1;
            width: px2rem(556);
            height: px2rem(120);
            padding: 0 0 0 px2rem(16);
            p:first-child {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}

.wrapper {
    height: 100%;
    overflow: hidden;
}

.audio-box {
    height: px2rem(60);
    margin-top: px2rem(10);
    audio {
        width: 100%;
        transform: scale(0.8);
        transform-origin: left top;
    }
}
</style>
