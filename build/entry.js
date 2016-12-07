var config = require('./conf.js').CONFIG_BUILD;
var glob = require('glob');
var path = require('path');
var fs = require('fs');

/**
 * 生成所有的 entry
 */
var getEntry = function () {
  // 获取所有的 js 文件
  var files = glob.sync('src/**/*.js');

  var entrys = {};

  files.forEach(function (_file) {
    var file = path.parse(_file);
    var htmlFile = path.resolve(file.dir, file.name + '.' + config.ext);

    // 如果存在同名的 html 则将其作为一个完整的页面
    if (fs.existsSync(htmlFile)) {
      entrys[config.staticRoot + '/' + file.dir + '/' + file.name] = path.resolve(_file);
    }
  });

  return entrys;
}

module.exports = getEntry;
