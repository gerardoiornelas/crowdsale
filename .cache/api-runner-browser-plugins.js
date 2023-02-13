module.exports = [{
      plugin: require('../plugins/gatsby-plugin-top-layout/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../plugins/gatsby-plugin-mui-emotion/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"lostwun-portfolio","short_name":"lostwun","start_url":"/","background_color":"#03002d","display":"minimal-ui","icon":"src/images/lostwun-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"8f43ed8aa2cdaba308deb2a3efd9621d"},
    },{
      plugin: require('../gatsby-browser.ts'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
