const path = require('path')
module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      // require.resolve('react-docgen-typescript-loader'),
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')

  // https://github.com/storybooks/storybook/tree/master/addons/storysource#parser
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  })

  return config
}
