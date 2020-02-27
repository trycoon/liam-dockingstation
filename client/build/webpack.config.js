// Define this constant for easier usage
const isProd = process.env.NODE_ENV === 'production';
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const apiMocker = require('mocker-api');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
// eslint-disable-next-line no-unused-vars
const myIp = require('my-local-ip');

const config = {
  mode: isProd ? 'production' : 'development',

  entry: {
    // Main entry point of our app
    app: resolve(__dirname, '..', 'index.js'),
  },

  output: {
    // built files are stored in "dist"-directory in the root of the client-project (./src/client/dist).
    path: resolve(__dirname, '..', 'dist'),

    // In our case we serve assets directly from root
    publicPath: '/',

    // We add hash to filename to avoid caching issues
    filename: '[name].[hash].js',
  },

  resolve: {
    extensions: ['*', '.js'],
    modules: [resolve(__dirname, '..', '..', 'node_modules')],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '>5%',
                  debug: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss|\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'html', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      disable: !isProd,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting: https://www.codementor.io/drewpowers/high-performance-webpack-config-for-front-end-delivery-90sqic1qa#1-scope-hoisting
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '..', 'swagger'),
        to: resolve(__dirname, '..', 'dist'),
      },
      {
        from: resolve(__dirname, '..', 'favicons'),
        to: resolve(__dirname, '..', 'dist'),
      },
    ]),
    new StyleLintPlugin({
      configFile: resolve(__dirname, '..', '.stylelintrc'),
      context: resolve(__dirname, '..', 'styles'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
};

if (!isProd) {
  config.devServer = {
    contentBase: resolve(__dirname, '..', 'dist'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/ws': {
        target: `ws://localhost:8081/websocket`,
        pathRewrite: { '^/ws': '' },
        ws: true,
        secure: false,
        logLevel: 'debug',
      },
    },
    before(app) {
      // load common mock data
      //app.locals.mock = require(resolve(__dirname, '..', 'mock', 'mock-data.js'));
      // setup REST endpoints with mocked data, mock will be available in api-handlers on app.locals.mock.
      //apiMocker(app, resolve(__dirname, '..', 'mock', 'api-mocker.js'));
      // setup Websocket with mocked data
      //require(resolve(__dirname, '..', 'mock', 'socket-mocker.js'))(8081, app.locals.mock);
    },
  };
} else {
  // Add buildcheck if any resources grow too big, the embedded system has very limited space.
  config.performance = {
    hints: 'warning',
    maxEntrypointSize: 80000,
    maxAssetSize: 100000,
  };
}

module.exports = config;
