import { getAudioList } from '@/utils/api'
import { LIST_AUDIO_LIST, LIST_CLEAR_STATE } from '@/store/mutations-type'

const state = {
  page: 1,
  hasMore: true,
  clientDomain: '',
  audios: [],
  album: {}
}

const mutations = {
  [LIST_CLEAR_STATE] (state) {
    state.page = 1
    state.hasMore = true
    state.audios = []
    state.album = {}
    console.log('clear state')
  },

  [LIST_AUDIO_LIST] (state, { clientDomain, album, audio }) {
    album.logo = clientDomain + album.logo
    state.album = album
    if (audio.length) {
      let ad
      let newData = audio.map((al, i) => {
        ad = audio[i]
        ad.title = al.title
        ad.icon = album.logo
        // ad.url = '/pages/audio/main?id=' + al._id
        return ad
      })
      state.audios.push.apply(state.audios, newData)
    } else {
      state.hasMore = false
    }
  }
}

const actions = {
  async getAudios ({ state, commit }, { albumId }) {
    if (!state.hasMore) return

    let data = await getAudioList({albumId, page: state.page++, count: 20})
    if (data.success) {
      let clientDomain = data.result.clientDomain
      let album = data.result.album
      let audio = data.result.audio
      commit(LIST_AUDIO_LIST, {clientDomain, album, audio})
    }
  }
}

export default {
  state,
  mutations,
  actions
}
