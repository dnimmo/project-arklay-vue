<template>
  <button 
    class="button"
    :class="active ? 'active' : 'inactive'"
    @click="() => action()"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    }
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

  @keyframes partialAppear {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.3;
    }
  }

  .button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: darkslategrey;
    color: #fafafa;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
    border-width: 2px;
    border-color: #fafafa;
    transition: all 0.2s;
    max-width: 50vw;
    max-height: 60px;
    font-family: inherit;

    &.active {
      animation: appear 0.4s ease-in-out;
    }

    &.inactive {
      animation: partialAppear 0.4s ease-in-out
    }

    &:hover {
        border-color: darkslategrey;
        color: darkslategrey;
        background-color: #fafafa;
    }
  }
</style>