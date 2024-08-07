const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const { webpackEntry } = require('./compile.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entryPoints = Object.keys(webpackEntry)
const plugins = [
  ...entryPoints.map(entry => {
    return new HtmlWebpackPlugin({
      template: './index.html',
      title: entry,
      inject: true,
      filename: `${entry}/index.html`,
      chunks: [entry],
    })
  }),
  new DotenvWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
]

module.exports = merge(base, {
  stats: 'errors-warnings',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    // open: true,
    port: 8080,
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.compiler.hooks.done.tap('done', () => {
        console.log('\x1b[34m','  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\', '\x1b[0m')
        console.log('\x1b[34m',' ( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )', '\x1b[0m')
        console.log('\x1b[34m','  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <', '\x1b[0m')
        console.log('\x1b[34m','  /\\_/\\                                                          /\\_/\\', '\x1b[0m')
        console.log('\x1b[34m',' ( o.o )   ', '\x1b[33m', '________  ________  ___       ___  ________      ','\x1b[34m','( o.o )', '\x1b[0m')
        console.log('\x1b[34m','  > ^ <   ', '\x1b[33m', '|\\   ____\\|\\   __  \\|\\  \\     |\\  \\|\\   ___  \\     ','\x1b[34m','> ^ <', '\x1b[0m')
        console.log('\x1b[34m','  /\\_/\\   ', '\x1b[33m', '\\ \\  \\___|\\ \\  \\|\\  \\ \\  \\    \\ \\  \\ \\  \\\\ \\  \\    ','\x1b[34m','/\\_/\\', '\x1b[0m')
        console.log('\x1b[34m',' ( o.o )   ', '\x1b[33m', '\\ \\  \\    \\ \\  \\\\\\  \\ \\  \\    \\ \\  \\ \\  \\\\ \\  \\  ','\x1b[34m','( o.o )', '\x1b[0m')
        console.log('\x1b[34m','  > ^ <     ', '\x1b[33m', '\\ \\  \\____\\ \\  \\\\\\  \\ \\  \\____\\ \\  \\ \\  \\\\ \\  \\  ','\x1b[34m','> ^ <', '\x1b[0m')
        console.log('\x1b[34m','  /\\_/\\      ', '\x1b[33m', '\\ \\_______\\ \\_______\\ \\_______\\ \\__\\ \\__\\\\ \\__\\ ','\x1b[34m','/\\_/\\', '\x1b[0m')
        console.log('\x1b[34m',' ( o.o )      ', '\x1b[33m', '\\|_______|\\|_______|\\|_______|\\|__|\\|__| \\|__|','\x1b[34m','( o.o )', '\x1b[0m')
        console.log('\x1b[34m','  > ^ <                                                          > ^ <', '\x1b[0m')
        console.log('\x1b[34m','  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\  /\\_/\\', '\x1b[0m')
        console.log('\x1b[34m',' ( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )( o.o )', '\x1b[0m')
        console.log('\x1b[34m','  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <  > ^ <', '\x1b[0m')
        
        console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉')
        console.log(`🎉🎉🎉  共成功打包${Object.entries(webpackEntry).length}个组件，地址如下：`)
        console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉')
        let count = 1
        for (const [name] of Object.entries(webpackEntry)) {
          console.log('\x1b[33m', `${count}. ${name}:`, '\x1b[33m', `http://localhost:8080/${name}`, '\x1b[0m')
          count++
        }
      })

      return middlewares
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
              },
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    ...plugins,
  ],
})
