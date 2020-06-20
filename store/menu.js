import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// STATES

export 
const states = {
  INITIAL_LOAD: 'INITIAL_LOAD',
  SAVE_DATA_EXISTS: 'SAVE_DATA_EXISTS',
  NO_SAVE_DATA_EXISTS: 'NO_SAVE_DATA_EXISTS',
}

// STORE

const store =
  new Vuex.Store({
    state () {
      return {
        name: states.INITIAL_LOAD,
      }
    },

    mutations: {
      notifyOfSaveData (state) {
        state.name = states.SAVE_DATA_EXISTS
      },

      notifyNoSaveDataExists (state) {
        state.name = states.NO_SAVE_DATA_EXISTS
      }
    },
    
    actions: {
      checkSaveGameData({ commit }) {
        const saveData = 
          window.localStorage.getItem('saveData')
        
        if (saveData) {
          commit('notifyOfSaveData')
        } else {
          commit('notifyNoSaveDataExists')
        }
      },

      saveUserIntention(state, { loadGame }) {
        window.localStorage.setItem('loadRequested', loadGame)
      }
    }
  })

export default store