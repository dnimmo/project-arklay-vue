import Vue from 'vue'
import Vuex from 'vuex'
import { roomsEndpoint } from '~/properties'

export
const states = {
  INITIAL_LOAD: 'INITIAL_LOAD',
  DISPLAYING_DIRECTIONS: 'DISPLAYING_DIRECTIONS',
  ERROR: 'ERROR'
}

const store = 
  new Vuex.Store({
    state () {
      return {
        name: states.INITIAL_LOAD,
        data: {} 
      }
    },
    mutations: {
      saveRooms (state, rooms) {
        const startingRoom = rooms['START']

        state.name = states.DISPLAYING_DIRECTIONS
        state.data = { 
          rooms,
          currentRoom: startingRoom,
          message: ''
        }
      },
      changeRoom (state, roomKey) {
        state.data.currentRoom = state.data.rooms[roomKey]
      }
    },
    actions: {
      loadRooms({ commit }) {
        fetch(roomsEndpoint)
          .then(async result => {
            const response = await result.json()

            commit('saveRooms', JSON.parse(response.body))
          })
          .catch(e => {
            // TODO: Commit a different action here
            console.log(e)
          })
      }
    }
  })

export default store;