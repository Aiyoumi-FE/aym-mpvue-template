import { baseURL } from '../../utils/config'
import { getAudioData } from '@/utils/api'
import { ITEM_AUDIO_DETAIL, ITEM_CLEAR_AUDIO } from '@/store/mutations-type'

const state = {
  audio: {},
  album: {},
  audioDetails: [] // 缓存详情数据
}

const mutations = {
  [ITEM_AUDIO_DETAIL]: (state, { data, match }) => {
    if (!match) {
      state.audioDetails.unshift(data)
    }
    data.audio.icon = baseURL + data.album.logo
    data.audio.url = baseURL + data.audio.url
    state.audio = data.audio
    state.album = data.album
  },
  [ITEM_CLEAR_AUDIO]: (state) => {
    state.audio = {}
    state.album = {}
  }
}

const actions = {
  async getAudio ({ state, commit }, { id }) {
    const audioDetails = state.audioDetails
    const audioCache = audioDetails.find(v => v.id === id)
    if (audioCache) {
      return commit(ITEM_AUDIO_DETAIL, {
        data: audioCache,
        match: true
      })
    }

    let audio = await getAudioData(id)
    if (!audio) return
    if (audio.success) {
      let data = audio.result
      commit(ITEM_AUDIO_DETAIL, {data, match: false})
    }
  }
}

export default {
  state,
  mutations,
  actions
}
