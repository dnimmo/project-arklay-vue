<template>
  <div 
    class="roomDescription"
    :class="entryDirection"
  >
    <p :class="entryDirection.includes('repeat') ? 'repeat' : ''">
      {{ intro }}
    </p>
    <p :class="entryDirection.includes('repeat') ? 'repeat' : ''">
      {{ surroundings }}
    </p>
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
    },
    entryDirection: {
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

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translate3d(0,-3vw,0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate3d(0,3vw,0);
    }
  }

  @keyframes slideLeft {
    from {
      opacity: 0;
      transform: translate3d(3vw, 0, 0);
    }
  }

  @keyframes slideRight {
    from {
      opacity: 0;
      transform: translate3d(-3vw, 0, 0);
    }
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0);
    }
  }

  .roomDescription {
    min-height: 25vh;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding: 5vw;
    animation: appear 0.4s ease-in-out;

    &.enter {
      animation: zoomIn 0.8s ease-in-out;
    }

    /* 
    Note: 'repeat' is a class that is added 
    if the same direction is selected twice 
    in a row, in order to repeat the animation 
    */
    &.east {
      animation: slideLeft 0.4s ease-in-out;

      .repeat {
        animation: slideLeft 0.4s ease-in-out;
      }
    }

    &.west {
      animation: slideRight 0.4s ease-in-out;

      .repeat {
        animation: slideRight 0.4s ease-in-out;
      }
    }

    &.north {
      animation: slideDown 0.4s ease-in-out;

      .repeat {
        animation: slideDown 0.4s ease-in-out;
      }
    }

    &.upstairs {
      animation: slideDown 0.8s ease-in-out;

      .repeat {
        animation: slideDown 0.8s ease-in-out;
      }
    }

    &.south {
      animation: slideUp 0.4s ease-in-out;

      .repeat {
        animation: slideUp 0.4s ease-in-out;
      }
    }

    &.downstairs {
      animation: slideUp 0.8s ease-in-out;

      .repeat {
        animation: slideUp 0.8s ease-in-out;
      }
    }
  }
</style>