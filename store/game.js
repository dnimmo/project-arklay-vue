import Vue from 'vue'
import Vuex from 'vuex'
import { roomsEndpoint, itemsEndpoint } from '~/properties'

Vue.use(Vuex)

// STATES

export
const states = {
  INITIAL_LOAD: 'INITIAL_LOAD',
  DISPLAYING_DIRECTIONS: 'DISPLAYING_DIRECTIONS',
  DISPLAYING_INVENTORY: 'DISPLAYING_INVENTORY',
  ERROR: 'ERROR'
}

// FUNCTIONS

const itemCanBeUsed =
  ({ item, availableDirections }) => 
      availableDirections.some(
          ({ itemsThatCanBeUsed }) => 
              itemsThatCanBeUsed 
                ? itemsThatCanBeUsed.includes(item)
                : false
      );

const itemHasBeenPickedUp =
  ({ item, inventory }) =>  
      inventory
        .itemsHeld
        .includes(item)
        || inventory
            .itemsUsed
            .includes(item.key);

const itemHasBeenUsed =
  ({ item, inventory }) => 
      inventory
        .itemsUsed
        .includes(item);

const getSurroundings =
  ({ room, inventory, items }) => {
    const itemInRoom =
      room.item

    if (
      !itemInRoom 
        && inventory.itemsUsed.length === 0
      ) {
        return room.surroundings
    }

    if (itemInRoom) {
      return (
        itemHasBeenPickedUp({ 
          item: items[itemInRoom], 
          inventory,
        }) 
          ? room.surroundingsWhenItemPickedUp 
          : room.surroundings
      )
    }

    if (
      room.surroundingsWhenItemUsed 
      && inventory.itemsUsed.length > 0
    ) {
      const itemThatHasBeenUsed =
        room
          .availableDirections
          .map(({ itemsThatCanBeUsed }) => itemsThatCanBeUsed)
          .reduce((accumulator, current) => [
            ...accumulator, ...current
          ],[])
          .find(
            itemKey => 
              itemHasBeenUsed({ item: itemKey, inventory })
          )

      return (
        itemThatHasBeenUsed
            ? room.surroundingsWhenItemUsed
            : room.surroundings
      )
    }
  }

// STORE

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
          ...state.data,
          rooms,
          currentRoom: startingRoom,
          message: '',
          lastSelectedDirection: 'start'
        }
      },

      saveItems (state, items) {
        state.name = 
          // Only update the state's name if rooms have been loaded
          state.data.rooms 
            ? states.DISPLAYING_DIRECTIONS
            : states.INITIAL_LOAD 
        
        state.data = {
          ...state.data,
          items,
          inventory: {
            itemsUsed: [],
            itemsHeld: []
          }
        }
      },

      saveError (state, error) {
        state.name = states.ERROR,
        state.data.message = error
      },

      changeRoom (state, { roomKey, selectedDirection }) {
        const newRoom = 
          state.data.rooms[roomKey]

        const { itemsUsed } = 
          state.data.inventory

        const surroundings = 
          getSurroundings({ 
            room: newRoom, 
            inventory: state.data.inventory, 
            items: state.data.items 
          })

        state.data.currentRoom = {
          ...newRoom,
          surroundings,
          availableDirections:
            newRoom.availableDirections.map(
              direction => ({
                ...direction,
                isUnlocked: 
                  direction.itemsThatCanBeUsed.every(
                    (x) =>
                        itemsUsed.includes(x)
                ),
              })
            )
        }

        state.data.message = ''
        state.data.lastSelectedDirection = 
          selectedDirection !== state.data.lastSelectedDirection 
            ? selectedDirection
            : `${selectedDirection} repeat`
      },

      attemptToOpenLockedRoom (state) {
        state.data.message = 'Seems I can\'t go this way yet...'

        if (state.data.inventory.itemsHeld.length > 0) {
          state.name = states.DISPLAYING_INVENTORY          
        } 
      },

      examineRoom (state) {
        const { currentRoom } = 
          state.data

        const { item } =
          currentRoom

        const itemToCheck =
          state.data.items[item]

        if (
          item 
          && !(
            itemHasBeenPickedUp({ item: itemToCheck, inventory: state.data.inventory }) 
            || itemHasBeenUsed({ item, inventory: state.data.inventory })
          )
        ) {
          const newItem = state.data.items[item]

          const updatedRoom = {
            ...currentRoom,
            surroundings: currentRoom.surroundingsWhenItemPickedUp
          }

          state.data.currentRoom = updatedRoom
          state.data.message = `${newItem.name} has been added to your inventory`
          state.data.inventory = {
            ...state.data.inventory, 
            itemsHeld: state.data.inventory.itemsHeld.concat(newItem)
          }
        } else {
          state.data.message = currentRoom.descriptionWhenExamined
        }
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

      attemptToUseItem (state, item) {
        const inventory = 
          state.data.inventory

        if (
          itemCanBeUsed({ 
            item: item.key, 
            availableDirections: state.data.currentRoom.availableDirections 
          })
        ) {
          const updatedItemsUsed = 
            inventory.itemsUsed.concat(item.key)

          const currentRoom = 
            state.data.currentRoom

          // update the current room to see if directions are unlocked now
          const updatedCurrentRoom = 
            {
              ...currentRoom,
              surroundings: currentRoom.surroundingsWhenItemUsed,
              availableDirections: 
                currentRoom.availableDirections.map(
                  direction => ({
                    ...direction,
                    isUnlocked: 
                      direction.itemsThatCanBeUsed.every(
                        (x) =>
                          updatedItemsUsed.includes(x)
                    ),
                  })
                )
            }

          state.name = states.DISPLAYING_DIRECTIONS
          state.data.message = item.messageWhenUsed
          state.data.inventory = {
            ...inventory,
            itemsUsed: updatedItemsUsed
          }
          state.data.currentRoom = updatedCurrentRoom 
        } else {
          state.data.message = item.messageWhenNotUsed
        }
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
            commit('saveError', `Error fetching rooms: ${e.message}`)
          })
      },

      loadItems({ commit }) {
        fetch(itemsEndpoint)
          .then(async result => {
            const response = await result.json()

            commit('saveItems', JSON.parse(response.body))
          })
          .catch(e => {
            commit('saveError', `Error fetching items: ${e.message}`)
          })
      }
    }
  })

export default store;