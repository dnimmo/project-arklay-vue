<template>
  <p class="message">{{ text }}</p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .message {
    min-height: 20px;
    padding: 0 10vw;
  }
</style>