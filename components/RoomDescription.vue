<template>
  <div class="roomDescription">
    <p>{{ intro }}</p>
    <p>{{ surroundings }}</p>
  </div>
</template>

<script>
export default {
  props: {
    intro: {
      type: String,
      required: true
    },
    surroundings: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .roomDescription {
    min-height: 25vh;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
</style>