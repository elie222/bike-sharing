const merge = require('webpack-merge')
// This will automatically get the dev/prod config based on process.env.NODE_ENV.
const expoConfig = require('@expo/webpack-config')

// Create a loader which can import `.obj` & `.mtl` (popular 3D model files (not popular enough to be part of the default config though... 😏))
const modelLoaderConfiguration = {
  test: /\.(obj|mtl)$/,
  use: {
    loader: 'file-loader',
  },
}

// Expo expects a function so we can pass around options.
module.exports = function(env, argv) {
  return merge(expoConfig(env, argv), {
    module: {
      rules: [modelLoaderConfiguration],
    },
    // resolve: {
    //   alias: {
    //     'react-native': 'react-native-web',
    //     'react-native-maps': 'react-native-web-maps',
    //   },
    // },
  })
}
