<template>
  <div class="inventoryOverlay">
    <section class="inventoryContainer">
      <div
        v-for="item in items"
        :key="item.key"
        class="itemContainer"
      >
        <action-button 
          :action="() => useItemFunction(item)"
          :text="item.name"
        />
      </div>
    </section>
    <message :text="message" />
    <action-button 
      class="closeButton"
      :action="closeFunction"
      text="X"
    />
  </div>
</template>

<script>
import ActionButton from '~/components/ActionButton'
import Message from '~/components/Message'

export default {
  props: {
    closeFunction: {
      type: Function,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    useItemFunction: {
      type: Function,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  components: {
    ActionButton,
    Message
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
  }

  .itemContainer {
    margin-top: 2vh;
  }

  .closeButton {
    position: absolute;
    top: 52vh;
    right: 2vh;
  }
</style>