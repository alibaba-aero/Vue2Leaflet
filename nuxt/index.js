
/*
    Nuxt.js module for vue2-leaflet
    Usage:
        - Install both leaflet and vue2-leaflet packages
        - Add this into your nuxt.config.js file:
        {
            modules: [
                'vue2-leaflet/nuxt'
            ]
        }
*/

const { resolve } = require('path')

module.exports = function nuxtVue2Leaflet (moduleOptions) {
  // Conditionally require leaflet original css too if not explicitly disabled
  if (moduleOptions.css !== false) {
    this.options.css.unshift('leaflet/dist/leaflet.css')
  }

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue2-leaflet.js',
    moduleOptions
  })
}

module.exports.meta = require('../package.json')
