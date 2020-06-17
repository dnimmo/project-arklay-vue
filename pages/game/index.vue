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
        <directions
          :directions="currentRoom.availableDirections"
          :changeRoomFunction="changeRoom"
        />
        <message 
          :text="message"
        />
        <action-button 
          text="Examine room" 
        />
        <action-button
          text="Inventory"
        />
        <div>
          <action-button
            text="Turn sound off"
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
import store, { states } from '~/store/game'


export default {
  layout: 'main',
  components: {
    RoomDescription,
    Directions,
    Message,
    ActionButton
  },
  data () {
    return {
      states
    }
  },
  store,
  methods: {
    loadRooms () {
      this.$store.dispatch('loadRooms')
    },
    changeRoom (roomKey) {
      this.$store.commit('changeRoom', roomKey)
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
    }
  },
  created () {
    this.loadRooms()
  }
}
</script>

<style lang="scss" scoped>
  .lowerHalfContainer {
    border-top: 2px solid #fafafa;
    padding-top: 20px;
    overflow: scroll;
  }
</style>