<template>
  <div class="page">
    <div class="page__bd">
      <audio-list :audios="albums" type="album" :has-more="hasMore"></audio-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import audioList from '@/components/audio-list'

export default {
  computed: {
    ...mapState('album', {
      albums: state => state.albums,
      hasMore: state => state.hasMore
    })
  },
  components: {
    audioList
  },
  methods: {
    ...mapActions('album', [
      'getAlbums'
    ])
  },
  created () {
    console.log('init page...')
  },
  mounted () {
    this.getAlbums()
  },
  onReachBottom () {
    this.getAlbums()
  }
}
</script>

<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';
</style>
