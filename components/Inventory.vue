<template>
  <div class="inventoryOverlay">
    <section class="inventoryContainer">
      <p>Inventory</p>
    </section>
    <action-button 
      class="closeButton"
      :action="closeFunction"
      text="X"
    />
  </div>
</template>

<script>
import ActionButton from '~/components/ActionButton'

export default {
  props: {
    closeFunction: {
      type: Function,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    ActionButton
  }
}
</script>

<style lang="scss" scoped>
  .inventoryOverlay {
    height: 65vh;
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: rgba(0,0,0,0.3);
  }

  .inventoryContainer {
    min-height: 50vh;
    position: fixed;
    bottom: 0;
    width: 100vw;
    border-top: 2px solid #fafafa;
    background-color: slategrey;
    display: grid;
  }

  .closeButton {
    position: absolute;
    top: 52vh;
    right: 2vh;
  }
</style>