const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var base_config = {
  entry: {
    // the key will be used as the name of the file in [name].js
    index: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = (env, argv) => {
  let config;

  if (argv.mode === 'development') {
    config = Object.assign({}, base_config, {
      mode: 'development',
      devtool: 'inline-source-map',
      watch: true,
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
      },
    });
  } else if (argv.mode === 'production') {
    config = Object.assign({}, base_config, {
      mode: 'production',
      output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
      },
    });
  }

  return config;
};
