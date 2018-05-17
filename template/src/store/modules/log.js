import { LOG_AUDIO_SAVE } from '@/store/mutations-type'
import { setStorage, getStorage } from '@/utils/wechat'
import { OBJ_TYPE_ALBUM, OBJ_TYPE_AUDIO } from '@/store/obj-type'

const state = {
  audios: [],
  albums: []
}

const mutations = {
  [LOG_AUDIO_SAVE]: (state, { type, obj }) => {
    if (!obj) {
      return
    }
    if (type === OBJ_TYPE_AUDIO) {
      const audioCache = state.audios.find(v => v._id === obj._id)
      if (!audioCache) {
        state.audios.unshift(obj)
      }
      setStorage(OBJ_TYPE_AUDIO, state.audios)
    } else if (type === OBJ_TYPE_ALBUM) {
      const audioCache = state.albums.find(v => v._id === obj._id)
      if (!audioCache) {
        state.albums.unshift(obj)
      }
      setStorage(OBJ_TYPE_ALBUM, state.albums)
    }
  }
}
const actions = {
  async saveLog ({ state, commit }, { type = '', obj = {} }) {
    let storageData
    try {
      storageData = await getStorage(type)
    } catch (e) {
      console.log(e)
    }
    if (storageData) {
      let data = storageData.data
      if (type === OBJ_TYPE_AUDIO) {
        state.audios = data
      } else if (type === OBJ_TYPE_ALBUM) {
        obj.icon = obj.logo
        obj.content = obj.desc
        state.albums = data
      }
    }

    commit(LOG_AUDIO_SAVE, { type, obj })
  },
  async getLogList ({ state, commit }, { type }) {
    let storageData
    try {
      storageData = await getStorage(type)
    } catch (e) {
      console.log(e)
    }
    if (storageData) {
      let data = storageData.data
      if (type === OBJ_TYPE_AUDIO) {
        state.audios = data
      } else if (type === OBJ_TYPE_ALBUM) {
        state.albums = data
      }
    }
  }
}

export default {
  state,
  mutations,
  actions
}
