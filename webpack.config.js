var webpack = require('webpack');
var minimist = require('minimist');
var conf = require('./build/conf.js');
var entry = require('./build/entry.js');
var html = require('./build/html.js');
var loader = require('./build/loader.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// env 配置
var knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};
var option = minimist(process.argv.slice(2), knownOptions);

// 设置配置数据
conf.setConf({
  env: option.env
});

console.info('config is:\n--------------\n', conf.CONFIG_BUILD, '\n--------------');

var entrys = entry();

// 生成 ejs 模板插件
var htmlPlugin = html();
var webpackPlugins = [];
webpackPlugins = webpackPlugins.concat(htmlPlugin);

if (conf.CONFIG_BUILD.env == 'prod') {
  webpackPlugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  )
}

// 生成各种 loader
var cssExtract = new ExtractTextPlugin('[name]_[contenthash].css');
var loaders = loader(cssExtract);
webpackPlugins.push(cssExtract);

var webpackLoaders = [];
webpackLoaders = webpackLoaders.concat(loaders)

var webpackConfig = {
  entry: entrys,

  devtool: conf.CONFIG_BUILD.env == 'dev' ? 'eval' : false,

  cache: conf.CONFIG_BUILD.env == 'dev' ? true : false,

  output: {
    path: 'dist',
    filename: "[name]_[chunkhash].js"
  },

  plugins: webpackPlugins,

  module: {
    loaders: webpackLoaders
  }
};

module.exports = webpackConfig;
