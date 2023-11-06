const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

dotenv.config();

module.exports = (_env, argv) => {
  const isDevMode = argv.mode === 'development';
  const plugins = [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ];

  if (!isDevMode) {
    plugins.push(
      new MiniCssExtractPlugin({
        linkType: false,
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    );
  }

  return {
    devtool: isDevMode && 'eval-cheap-source-map',

    entry: './src/index.js',

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      assetModuleFilename: 'public/[name][ext]',
      clean: true,
    },

    devServer: {
      port: 3000,
      host: 'localhost',
      hot: true,
      historyApiFallback: {
        index: '/index.html',
      },
    },

    resolve: {
      alias: {
        '@': path.resolve('./src/'),
      },
    },

    plugins,

    module: {
      rules: [
        {
          test: /\.svg$/i,
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /node_modules/,

          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "_variable";',
                sassOptions: {
                  includePaths: [path.resolve(__dirname, './src/styles')],
                },
              },
            },
          ],
          include: path.join(__dirname, 'src'),
        },
      ],
    },

    optimization: {
      minimize: isDevMode ? false : true,
      minimizer: [
        new CssMinimizerPlugin({
          parallel: os.cpus().length - 1,
        }),
      ],
    },
  };
};
