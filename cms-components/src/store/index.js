import Vue from 'vue'
import Vuex from 'vuex'

import audio from './modules/audio'
import album from './modules/album'
import list from './modules/list'
import log from './modules/log'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    audio: {
      namespaced: true,
      ...audio
    },
    album: {
      namespaced: true,
      ...album
    },
    list: {
      namespaced: true,
      ...list
    },
    log: {
      namespaced: true,
      ...log
    }
  }
})

export default store
