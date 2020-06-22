<template>
  <div>
    <!-- LOADING --> 
    <div v-if="state === states.INITIAL_LOAD"> 
      <!-- todo: make nice loading animation here -->
      ...
    </div>

    <!-- ERROR -->
    <div v-else-if="state === states.ERROR">
      <p class="errorText">{{ message }}</p>
    </div>

    <!-- READY -->
    <div class="readyContainer" v-else>
      <room-description 
        :intro="currentRoom.intro"
        :surroundings="currentRoom.surroundings"
        :entryDirection="lastSelectedDirection"
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
            :active="itemsHeld.length > 0"
            :class="itemsHeld.length > 0 ? 'notEmpty' : 'empty'"
          />
          <div>
            <action-button
              :text="`${soundEnabled ? 'Disable' : 'Enable'} sound`"
              :action="toggleSound"
            />
          </div>
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
import { mapActions, mapMutations } from 'vuex'
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
    // ACTIONS
    ...mapActions([
      'saveGameData',
      'loadSaveData',
      'loadRooms',
      'loadItems',
      'toggleSound'
    ]),

    // MUTATIONS
    ...mapMutations([
      'changeRoom',
      'examineRoom',
      'openInventory',
      'closeInventory',
      'attemptToOpenEmptyInventory',
      'attemptToUseItem',
      'attemptToOpenLockedRoom',
    ]),
  },

  mounted () {
    const loadRequested =
      JSON.parse(window.localStorage.getItem('loadRequested'))

    if (loadRequested) {
      this.loadSaveData()
    } else {
      this.loadRooms()
      this.loadItems()
    }
  },

  updated () {
    this.saveGameData(this.$store.state)
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
      states, 
    }
  },

  computed: {
    lastSelectedDirection () {
      return this.$store.state.data.lastSelectedDirection
    },

    soundEnabled () {
      return this.$store.state.data.soundEnabled
    },

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
  .readyContainer {
    overflow-x: hidden;
  }

  .lowerHalfContainer {
    border-top: 2px solid #fafafa;
    padding-top: 20px;
    overflow: scroll;
  }

  .empty {
    opacity: 0.3;
  }

  .errorText {
    word-break: break-all;
  }
</style>