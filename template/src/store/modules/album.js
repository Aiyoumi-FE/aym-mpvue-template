import { getAlbumData } from '@/utils/api'
import { LIST_ALBUM_LIST } from '@/store/mutations-type'

const state = {
  page: 1,
  hasMore: true,
  clientDomain: '',
  albums: []
}

const mutations = {
  [LIST_ALBUM_LIST] (state, { albums }) {
    let data
    if (albums.length) {
      let newData = albums.map((album, i) => {
        data = albums[i]
        album.title = data.title
        album.content = data.desc
        album.icon = state.clientDomain + data.logo
        return album
      })
      state.albums.push.apply(state.albums, newData)
    } else {
      state.hasMore = false
    }
    console.log(state.hasMore)
  }
}

const actions = {
  async getAlbums ({state, commit}) {
    if (!state.hasMore) return
    let data = await getAlbumData({ page: state.page++, count: 20 })
    if (data.success) {
      state.clientDomain = data.result.clientDomain
      let albums = data.result.list
      commit(LIST_ALBUM_LIST, { albums })
    }
  }
}

export default {
  state,
  mutations,
  actions
}
