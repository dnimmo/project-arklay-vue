import Vue from 'vue'
import Vuex from 'vuex'
import { roomsEndpoint, itemsEndpoint } from '~/properties'

export
const states = {
  INITIAL_LOAD: 'INITIAL_LOAD',
  DISPLAYING_DIRECTIONS: 'DISPLAYING_DIRECTIONS',
  DISPLAYING_INVENTORY: 'DISPLAYING_INVENTORY',
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
        
        state.name = 
          // Only update the state's name if items have been loaded
          state.data.items 
            ? states.DISPLAYING_DIRECTIONS
            : states.INITIAL_LOAD 

        state.data = { 
          rooms,
          currentRoom: startingRoom,
          message: ''
        }
      },

      saveItems (state, items) {
        state.name = 
          // Only update the state's name if rooms have been loaded
          state.data.rooms 
            ? states.DISPLAYING_DIRECTIONS
            : states.INITIAL_LOAD 
        
        state.data = {
          items,
          inventory: {
            itemsUsed: [],
            itemsHeld: []
          }
        }
      },

      changeRoom (state, roomKey) {
        state.data.currentRoom = state.data.rooms[roomKey]
        state.data.message = ''
      },

      examineRoom (state, message) {
        state.data.message = message
      },

      openInventory (state) {
        state.name = states.DISPLAYING_INVENTORY
        state.data.message = ''
      },

      closeInventory (state) {
        state.name = states.DISPLAYING_DIRECTIONS
        state.data.message = ''
      },

      attemptToOpenEmptyInventory (state) {
        state.data.message = 'I\'m not carrying anything'
      },
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
            console.log(e, 'rooms')
          })
      },

      loadItems({ commit }) {
        fetch(itemsEndpoint)
          .then(async result => {
            const response = await result.json()

            commit('saveItems', JSON.parse(response.body))
          })
          .catch(e => {
            // TODO: Commit a different action here
            console.log(e, 'items')
          })
      }
    }
  })

export default store;