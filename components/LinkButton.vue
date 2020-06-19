<template>
  <nuxt-link 
    class="button"
    :class="disabled ? 'disabled' : 'enabled'"
    :to="to"
  >
    {{text}}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    display: block;
    margin-top: 40px;
    width: 60vw;
    margin-right: auto;
    margin-left: auto;
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
    text-decoration: none;
    max-width: 200px;

    &:hover {
        border-color: darkslategrey;
        color: darkslategrey;
        background-color: #fafafa;
    }

    &.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }
</style>