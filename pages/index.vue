<template>
  <div>
    <h1 class="mainTitle">Project Arklay</h1>
    <p class="introText">Your head hurts. You&apos;re not sure where you are, and you definitely don&apos;t know how you got here. There&apos;s rain thrashing the ground all around you. You figure you might as well try and understand what the Hell is going on...</p>
    <link-button
      class="button"
      to="/menu"
      text="Begin"
    />
  </div>
</template>

<script>
import LinkButton from '~/components/LinkButton'

export default {
  layout: 'main',
  components: {
    LinkButton,
  },
}
</script>

<style lang="scss" scoped>
  .wrapper {
    font-family: 'Source Code Pro', monospace;
    background-color:slategrey;
    color: #fafafa;
    text-align: center;
    min-height: 90vh;
    padding: 10vw;
  }

  .mainTitle {
    padding: 10vw 0;
    margin: 0;
  }

  .introText {
    padding: 5vw;

      @media screen and (min-width:500px) {
        padding: 5vw 12vw;
      }
  }
  
</style>

