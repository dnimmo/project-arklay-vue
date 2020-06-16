<template>
  <div class="index wrapper">
    <h1 class="index mainTitle">Project Arklay</h1>
    <p>Your head hurts. You&apos;re not sure where you are, and you definitely don&apos;t know how you got here. There&apos;s rain thrashing the ground all around you. You figure you might as well try and understand what the Hell is going on...</p>
  </div>
</template>

<style lang="scss">
  /* This is _not_ scoped on purpose in order to style the `body` tag. Until you find a better solution for this, don't use generic names here */
  .body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .index {
    &.wrapper {
      font-family: 'Source Code Pro', monospace;
      background-color:slategrey;
      color: #fafafa;
      text-align: center;
      min-height: 90vh;
      padding: 10vw;
    }

    &.mainTitle {
      padding: 10vw 0;
      margin: 0;
    }
  }
</style>

