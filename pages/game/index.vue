<template>
  <div>
    <div v-if="state === states.INITIAL_LOAD"> 
      <!-- todo: make nice loading animation here -->
      ...
    </div>
    <div v-else>
      {{ JSON.stringify($store.state.items)}}
      <room-description 
        :intro="currentRoom.intro"
        :surroundings="currentRoom.surroundings" 
      />
      <section class="lowerHalfContainer">
        <div v-if="state === states.DISPLAYING_DIRECTIONS">
          <directions
            :directions="currentRoom.availableDirections"
            :changeRoomFunction="changeRoom"
            :attemptToOpenLockedRoomFunction="attemptToOpenLockedRoom"
          />
          <message 
            :text="message"
          />
          <action-button 
            text="Examine room"
            :action="examineRoom"
          />
          <action-button
            text="Inventory"
            :action="itemsHeld.length > 0 ? openInventory : attemptToOpenEmptyInventory"
            :class="itemsHeld.length > 0 ? 'notEmpty' : 'empty'"
          />
          <!-- <div>
            <action-button
              text="Turn sound off"
            />
          </div> -->
        </div>
        <div v-else-if="state === states.DISPLAYING_INVENTORY">
          <inventory 
            :items="itemsHeld"
            :currentRoom="currentRoom"
            :closeFunction="closeInventory"
            :useItemFunction="attemptToUseItem"
            :message="message"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import RoomDescription from '~/components/RoomDescription'
import Directions from '~/components/Directions'
import Message from '~/components/Message'
import ActionButton from '~/components/ActionButton'
import Inventory from '~/components/Inventory'
import store, { states } from '~/store/game'

export default {
  layout: 'main',
  store,
  methods: {
    // Yes, I know you can use mapActions for this
    loadRooms () {
      this.$store.dispatch('loadRooms')
    },

    loadItems () {
      this.$store.dispatch('loadItems')
    },

    changeRoom (roomKey) {
      this.$store.commit('changeRoom', roomKey)
    },

    examineRoom () {
      this.$store.commit('examineRoom')
    },

    openInventory () {
      this.$store.commit('openInventory')
    },

    closeInventory () {
      this.$store.commit('closeInventory')
    },

    attemptToOpenEmptyInventory () {
      this.$store.commit('attemptToOpenEmptyInventory')
    },

    attemptToUseItem (item) {
      this.$store.commit('attemptToUseItem', item)
    },
    
    attemptToOpenLockedRoom () {
      this.$store.commit('attemptToOpenLockedRoom')
    },
  },
  created () {
    this.loadRooms()
    this.loadItems()
  },
  components: {
    RoomDescription,
    Directions,
    Message,
    ActionButton,
    Inventory
  },
  data () {
    return {
      states
    }
  },
  computed: {
    currentRoom () {
      return this.$store.state.data.currentRoom
    },

    state () {
      return this.$store.state.name
    },

    message () {
      return this.$store.state.data.message
    },

    itemsHeld () {
      const inventory =
        this.$store.state.data.inventory

      return (
        inventory.itemsHeld.filter(
          ({ key }) => 
            !inventory.itemsUsed.includes(key)
          )
        )
    }
  }
}
</script>

<style lang="scss" scoped>
  .lowerHalfContainer {
    border-top: 2px solid #fafafa;
    padding-top: 20px;
    overflow: scroll;
  }

  .empty {
    opacity: 0.3;
  }
</style>