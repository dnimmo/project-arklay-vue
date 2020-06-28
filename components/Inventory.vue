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
          :data-test="item.key"
        />
      </div>
      <message :text="message" />
      <action-button 
        class="closeButton"
        :action="closeFunction"
        text="X"
      />
    </section>
  </div>
</template>

<script>
import ActionButton from './ActionButton'
import Message from './Message'

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
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .inventoryOverlay {
    height: 100vh;
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: rgba(0,0,0,0.3);
    animation: appear 0.3s ease-in-out;
  }

  @keyframes slideUp {
    from {
      transform: translate3d(0, 65vh, 0)
    }
    to {
      transform: translate3d(0, 0, 0)
    }
  }

  .inventoryContainer {
    transform: translate3d(0,0,0);
    animation: slideUp 0.3s ease-in-out;
    min-height: 50vh;
    position: fixed;
    bottom: 0;
    width: 100vw;
    border-top: 2px solid #fafafa;
    background-color: slategrey;
  }

  .itemContainer {
    margin-top: 9vh;
  }

  .closeButton {
    position: absolute;
    top: 2vh;
    right: 2vh;
  }

  .message {
    min-height: 50px;
    display: block;
  }
</style>