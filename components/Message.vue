<template>
  <p 
    class="message"
    :class="text !== '' ? 'animated' : 'notAnimated'"
  >
    {{ text }}
  </p>
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
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .message {
    min-height: 20px;
    padding: 0 10vw;

    &.animated {
      animation: appear 0.2s ease-in-out;
    }
  }
</style>