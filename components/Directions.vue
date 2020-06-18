<template>
  <section class="directionsContainer">
    <div class="directionsGrid">
      <action-button 
        v-for="direction in directions"
        :key="direction.room"
        :class="`${direction.text.toLowerCase()} ${showLocked(direction) ? 'locked' : 'unlocked'}`"
        :text="direction.text"
        :action="
          showLocked(direction)
            ? () => attemptToOpenLockedRoomFunction()
            : () => changeRoomFunction(direction.room)
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
    }
  },

  components: {
    ActionButton
  },
  
  methods: {
    showLocked ({ text, isUnlocked }) {
      return !(text.toLowerCase() === 'enter' || text.toLowerCase() === 'end') && !isUnlocked
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
    grid-template-rows: 20% 20% 20% 20% 20%;
    justify-items: center;
    justify-content: space-evenly;
  }

  .upstairs {
    grid-column: 2;
  }
    
  .north {
    grid-column: 2;
    grid-row: 2;
  }
  
  .east {
    grid-column: 3;
    grid-row: 3;
  }
  
  .west {
    grid-column: 1;
    grid-row: 3;
    }
    
  .south {
    grid-column: 2;
    grid-row: 4;
  }
  
  .downstairs {
    grid-column: 2;
    grid-row: 5;
  }
  
  .enter {
    grid-column: 2;
    grid-row: 3;
  }
  
  .end {
    grid-column: 2;
    grid-row: 3;
  }

  .locked {
    opacity: 0.3;
  }
</style>