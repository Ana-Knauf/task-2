const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {

    externals: {
      paths: PATHS
    },

    entry: {
      app: PATHS.src
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].js`,
        publicPath: ''
      },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }, {
          test: /\.pug$/,
          loaders: [{
            loader: 'pug-loader',
            options: { pretty: true }
          }]
        }, {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          exclude: [path.resolve(__dirname, '../src/fonts')],
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img',
            publicPath: '../img'
          }
      }, {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: [path.resolve(__dirname, '../src/img')],
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
            publicPath: '../fonts'
          }
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: { sourceMap: true }
                }, {
                  loader: 'resolve-url-loader'
                }, {
                  loader: 'sass-loader',
                  options: { sourceMap: true }
                }
            ]
        }
      ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({
          hash: false,
          template: `${PATHS.src}/pug/pages/index.pug`,
          filename: "./index.html",
          minify: false
        }),
        new HtmlWebpackPlugin({
          hash: false,
          template: `${PATHS.src}/pug/pages/blocks.pug`,
          filename: "./blocks.html",
          minify: false
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
            // { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: '' }
        ]
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
      ],
  };