<template>
  <section class="directionsContainer">
    <div class="directionsGrid">
      <action-button 
        v-for="direction in directions"
        :key="direction.room"
        :class="direction.text.toLowerCase()"
        :text="direction.text"
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
    }
  },
  components: {
    ActionButton
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
</style>