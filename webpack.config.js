const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDebug = true;
const staticAssetName = isDebug
  ? '[path][name].[ext]?[hash:8]'
  : '[hash:8].[ext]';

module.exports = {
  context: path.resolve(__dirname, 'docs/src'),
  entry: {
    app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'docs/src'),
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: [/\.(eot|ttf|svg|woff|woff2)$/],
        loader: 'url-loader',
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunk: 2,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'docs/src/index.html'),
    }),
    new ExtractTextPlugin('docs.css?[hash:8]'),
  ]
};