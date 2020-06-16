<template>
  <div>
    <room-description 
      intro="It's dark, and cold. You're soaked through. You struggle to remember where you are, let alone how you ended up here. What were you doing again?"
      surroundings="There's a large door in front of you." 
    />
    <section class="lowerHalfContainer">
      <directions />
      <message 
        text="Some message"
      />
      <action-button 
        text="Examine room" 
      />
      <action-button
        text="Inventory"
      />
      <div>
        <action-button
          text="Turn sound off"
        />
      </div>
    </section>
  </div>
</template>

<script>
import RoomDescription from '~/components/RoomDescription'
import Directions from '~/components/Directions'
import Message from '~/components/Message'
import ActionButton from '~/components/ActionButton'

export default {
  layout: 'main',
  components: {
    RoomDescription,
    Directions,
    Message,
    ActionButton
  }
}
</script>

<style lang="scss" scoped>
  .lowerHalfContainer {
    border-top: 2px solid #fafafa;
    padding-top: 20px;
  }
</style>