const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'frontend', 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'frontend', 'dist'),
    filename: 'bundle.js'
  },
  resolve:{
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join('.', 'frontend', 'src', 'index.html')
  })]
};