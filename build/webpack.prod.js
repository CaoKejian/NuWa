/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') 

module.exports = merge(base, {
  // stats: 'errors-warnings',
  mode: 'production', // 生产模式
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
      chunkFilename: '[name].chunk.css',
    }),
  ],
})
