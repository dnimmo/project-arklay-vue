<template>
  <div>
    <p v-if="true">This game auto-saves, so if you come back to it later you'll be able to pick up where you left off.</p>
    <!--TODO: Only display this message if save data exists-->
    <p v-if="true">Welcome back. You can either start a new game, or you can continue your previous one.</p>
    <link-button
      to="/game"
      text="Start"
    />
    <link-button
      to="/menu"
      text="Continue"
      :disabled="true"
    /> 
  </div>
</template>

<script>
import LinkButton from '~/components/LinkButton'

export default {
  layout: 'main',
  components: {
    LinkButton
  }
}
</script>