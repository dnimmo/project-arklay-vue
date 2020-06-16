<template>
  <section class="directionsContainer">
    <div class="directionsGrid">
      <action-button 
        class="enter"
        text="Enter"
      />
    </div>
  </section>  
</template>

<script>
import ActionButton from '~/components/ActionButton'

export default {
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