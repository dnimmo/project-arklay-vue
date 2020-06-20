<template>
  <div>
    <div v-if="state === states.INITIAL_LOAD">
    </div>
    <div v-else class="introText">
      <p v-if="state === states.NO_SAVE_DATA_EXISTS">This game auto-saves, so if you come back to it later you'll be able to pick up where you left off.</p>
      <!--TODO: Only display this message if save data exists-->
      <p v-else-if="state === states.SAVE_DATA_EXISTS">Welcome back. You can either start a new game, or you can continue your previous one.</p>
      <link-button
        to="/game"
        text="Start"
        @click.native="startNewGame"
      />
      <link-button
        :to="state === states.NO_SAVE_DATA_EXISTS ? '/menu' : '/game'"
        text="Continue"
        :disabled="state === states.NO_SAVE_DATA_EXISTS"
        @click.native="loadGame"
      /> 
    </div>
  </div>
</template>

<script>
import store, { states } from '~/store/menu'
import LinkButton from '~/components/LinkButton'

export default {
  layout: 'main',
  store,
  components: {
    LinkButton
  },

  computed: {
    state () {
      return this.$store.state.name
    }
  },

  data () {
    return {
      states
    }
  },

  methods: {
    checkSaveGameData() {
      this.$store.dispatch('checkSaveGameData');
    },

    startNewGame() {
      this.$store.dispatch('saveUserIntention', { loadGame: false })
    },

    loadGame() {
      this.$store.dispatch('saveUserIntention', { loadGame: true })
    }
  },

  mounted () {
    this.checkSaveGameData();
  },

}
</script>

<style lang="scss" scoped>
  .introText {
    padding: 5vw;

      @media screen and (min-width:500px) {
        padding: 5vw 12vw;
      }
  }
</style>