<template>
  <button 
    class="button"
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
    &:hover {
        border-color: darkslategrey;
        color: darkslategrey;
        background-color: #fafafa;
    }
  }
</style>