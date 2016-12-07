var config = require('./conf.js').CONFIG_BUILD;

var createLoader = function (cssExtract) {
  // 定义 css 抽取
  var stylLoader = cssExtract.extract(['css', 'stylus']);
  var cssLoader = cssExtract.extract(['css']);

  var loaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.styl$/,
      exclude: /node_modules/,
      loader: stylLoader
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: cssLoader
    },
    {
      test: /\.ejs$/,
      loader: 'html?minimize=false'
    },
    {
      test: /\.tpl$/,
      exclude: /node_modules/,
      loader: 'raw-loader'
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf|swf)\??.*$/,
      exclude: /node_modules/,
      loader: 'url',
      query: {
        limit: 1000,
        name: config.staticRoot + '/assets_url/[name].[hash:7].[ext]'
      }
    }
  ];

  return loaders;
}

module.exports = createLoader;
