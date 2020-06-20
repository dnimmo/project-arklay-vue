module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Project Arklay : A text-adventure game you can play in your browser.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A browser-based text adventure game ' },
      
      { name: 'theme-color', content: '#708090'
      }
    ],
    link: [
      { href: "https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap", rel: "stylesheet" }
    ],
    bodyAttrs: {
      class: 'body'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

