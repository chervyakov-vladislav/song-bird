const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const globule = require("globule");
const fs = require("fs");

const paths = globule.find(["src/pages/pages/**/*.pug"]);

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  mode: mode,
  entry: path.join(__dirname, 'src', 'js', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[name][ext][query]",
    clean: isProd
  },
  plugins: [
    ...paths.map((path) => {
      return new HtmlWebpackPlugin({
          template: path,
          filename: `${path.split(/\/|.pug/).splice(-2, 1)}.html`,
      });
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8080,
    static: {
      directory: './src',
      watch: true
  }
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (isDev) ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
              loader: "postcss-loader",
              options: {
                  postcssOptions: {
                      plugins: [
                          [
                              "postcss-preset-env",
                              {
                                  // Options
                              },
                          ],
                      ],
                  }
              },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ogg|mp3|wav)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      '@': path.join(__dirname, 'src')
    },
  },
}