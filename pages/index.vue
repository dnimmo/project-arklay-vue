<template>
  <div>
    <h1 class="mainTitle">Project Arklay</h1>
    <p class="introText">Your head hurts. You&apos;re not sure where you are, and you definitely don&apos;t know how you got here. There&apos;s rain thrashing the ground all around you. You figure you might as well try and understand what the Hell is going on...</p>
    <nuxt-link
      class="button"
      to="/menu">
      Begin
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'main'
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
    
    &:hover {
        border-color: darkslategrey;
        color: darkslategrey;
        background-color: #fafafa;
    }
  }
  
</style>

