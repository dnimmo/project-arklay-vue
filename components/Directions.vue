<template>
  <section class="directionsContainer">
    <div class="directionsGrid">
      <action-button 
        v-for="direction in directions"
        :key="direction.room"
        :active="!showLocked(direction)"
        :class="`${direction.text.toLowerCase()} ${showLocked(direction) ? 'locked' : 'unlocked'}`"
        :text="direction.text"
        :action="
          showLocked(direction)
            ? () => attemptToOpenLockedRoomFunction()
            : () => changeRoomFunction({ roomKey: direction.room, selectedDirection: direction.text.toLowerCase() })
          "
      />
    </div>
  </section>  
</template>

<script>
import ActionButton from '~/components/ActionButton'

export default {
  props: {
    directions: {
      type: Array,
      required: true,
    },

    changeRoomFunction: {
      type: Function,
      required: true
    },

    attemptToOpenLockedRoomFunction: {
      type: Function,
      required: true
    },
  },

  components: {
    ActionButton
  },
  
  methods: {
    showLocked ({ text, room, isUnlocked }) {
      return !(room.toLowerCase() === 'entrance' || text.toLowerCase() === 'end') && !isUnlocked
    }
  }
}
</script>

<style lang="scss" scoped>
  .directionsContainer {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  .directionsGrid {
    min-height: 35vh;
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    grid-template-rows: 33.3% 33.3% 33.3%;
    justify-items: center;
    justify-content: space-evenly;
  }

  .upstairs {
    grid-column: 2;
  }
    
  .north {
    grid-column: 2;
    grid-row: 1;
  }
  
  .east {
    grid-column: 3;
    grid-row: 2;
  }
  
  .west {
    grid-column: 1;
    grid-row: 2;
    }
    
  .south {
    grid-column: 2;
    grid-row: 3;
  }
  
  .downstairs {
    grid-column: 2;
    grid-row: 3;
  }
  
  .enter {
    grid-column: 2;
    grid-row: 2;
  }
  
  .end {
    grid-column: 2;
    grid-row: 2;
  }

  .locked {
    opacity: 0.3;
  }
</style>