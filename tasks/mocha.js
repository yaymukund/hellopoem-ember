/*
 * grunt
 * https://github.com/cowboy/grunt
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Copyright (c) 2012 John K. Paul @johnkpaul
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
*/

module.exports = function(grunt) {

  // Nodejs libs.
  var path = require('path');

  // External libs.
  var Mocha = require('mocha');

  grunt.registerMultiTask('mocha', 'Run unit tests with mocha.', function() {

    var filepaths = grunt.file.expandFiles(this.file.src);
    grunt.file.clearRequireCache(filepaths);
    var paths = filepaths.map(resolveFilepaths);
    var options = this.data.options || {};

    var mocha_instance = new Mocha(options);

    paths.map(mocha_instance.addFile.bind(mocha_instance));
    mocha_instance.run(this.async());
  });

  function resolveFilepaths(filepath) {
    return path.resolve(filepath);
  }

};
