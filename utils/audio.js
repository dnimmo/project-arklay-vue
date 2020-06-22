// Because Vue components are encapsulated, they don't have access to `Audio`
// This is why I decided to return an audio player here, so that it can be attached the game's own state and used from there.

const audioPlayer = 
  () => {
    const bgMusic = 
      new Audio('/audio/The_Dark_Place.mp3')

    bgMusic.loop = true

    return {
      play () {
        bgMusic.play()
      },

      playSoundEffect (filepath) {
        const effect = 
          new Audio(filepath)

        effect.play()
      },

      pause () {
        bgMusic.pause();
      }
    }
  }

export default audioPlayer