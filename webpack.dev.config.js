let path = require('path');
let webpack = require('webpack');
let StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

let env = process.env.WEBPACK_BUILD || 'development';

let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpackDevConfig = require('./webpack.base.config')('development');
let webpackProdConfig = require('./webpack.base.config')('production');

let paths = [
  '/',
  '/components/',
  '/components/layout/',
  '/components/navs/',
  '/components/navbar/',
  '/components/breadcrumbs/',
  '/components/buttons/',
  '/components/button-group/',
  '/components/button-toolbar/',
  '/components/button-dropdown/',
  '/components/dropdowns/',
  '/components/form/',
  '/components/input-group/',
  '/components/popovers/',
  '/components/progress/',
  '/components/tooltips/',
  '/components/modals/',
  '/components/badge/',
  '/components/card/',
  '/components/tables/',
  '/components/media/',
  '/components/pagination/',
  '/components/tabs/',
  '/components/jumbotron/',
  '/components/alerts/',
  '/components/collapse/',
  '/components/carousel/',
  '/components/listgroup/',
  '/utilities/',
  '/utilities/colors/',
  '/utilities/clearfix/',
  '/404.html'
];

let config = [{
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    stats: {
      chunks: false
    }
  },
  entry: {
    main: './docs/lib/app'
  },
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'bundle.js',
    path: './build',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([{ from: './docs/static', to: 'assets' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new StaticSiteGeneratorPlugin('main', paths, {}),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('/assets/style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader?cacheDirectory'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?cacheDirectory'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      'bootstrap-css': path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
      reactstrap: path.resolve('./src')
    }
  }
}];

if (env === 'development') {
  config.push(webpackDevConfig);
  config.push(webpackProdConfig);
} else {
  config[0].plugins.push(new webpack.optimize.UglifyJsPlugin(
    {
      minimize: true,
      compress: {
        warnings: false
      },
      mangle: true
    }
  ));
}

module.exports = config;
