<template>
  <div>
    <div v-if="state === states.INITIAL_LOAD"> 
      <!-- todo: make nice loading animation here -->
      ...
    </div>
    <div v-else>
      <room-description 
        :intro="currentRoom.intro"
        :surroundings="currentRoom.surroundings" 
      />
      <section class="lowerHalfContainer">
        <div v-if="state === states.DISPLAYING_DIRECTIONS">
          <directions
            :directions="currentRoom.availableDirections"
            :changeRoomFunction="changeRoom"
          />
          <message 
            :text="message"
          />
          <action-button 
            text="Examine room"
            :action="() => examineRoom(currentRoom.descriptionWhenExamined)"
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
    loadRooms () {
      this.$store.dispatch('loadRooms')
    },

    loadItems () {
      this.$store.dispatch('loadItems')
    },

    changeRoom (roomKey) {
      this.$store.commit('changeRoom', roomKey)
    },

    examineRoom (roomKey) {
      this.$store.commit('examineRoom', roomKey)
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
      return []
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