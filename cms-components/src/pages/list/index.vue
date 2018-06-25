<template>
  <div class="md-list">
    <album-head :album="album"></album-head>
    <audio-list :audios="audios" :has-more="hasMore"></audio-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import wx from '@/utils/wx'
import { LIST_CLEAR_STATE } from '@/store/mutations-type'
import audioList from '@/components/audio-list'
import albumHead from '@/components/album-head'
import { OBJ_TYPE_ALBUM } from '@/store/obj-type'

export default {
  components: {
    audioList,
    albumHead
  },
  data () {
    return {
      albumId: ''
    }
  },

  computed: {
    ...mapState('list', ['audios', 'hasMore', 'album'])
  },

  methods: {
    ...mapMutations('list', {
      clearState: LIST_CLEAR_STATE
    }),
    ...mapActions('log', [
      'saveLog'
    ]),
    ...mapActions('list', [
      'getAudios'
    ]),
    async getAudioList (init) {
      await this.getAudios({albumId: this.albumId})
      if (init) {
        wx.setNavigationBarTitle({ title: this.album.title })
        this.saveLog({type: OBJ_TYPE_ALBUM, obj: this.album})
      }
    }
  },

  mounted () {
    const id = this.$root.$mp.query.id
    if (!id) {
      return wx.navigateBack()
    }
    this.albumId = id
    this.getAudioList(1)
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

