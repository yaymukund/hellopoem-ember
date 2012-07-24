// Precompiles Ember.js Handlebars templates into separate .js files of the
// same name.
module.exports = function(grunt) {
  var vm            = require('vm');
  var fs            = require('fs');
  var path          = require('path');

  var libPath       = __dirname + '/lib';
  var headlessEmber = fs.readFileSync(libPath + '/headless-ember.js', 'utf8');
  var emberJs       = fs.readFileSync(libPath + '/ember.js', 'utf8');

  grunt.registerMultiTask('emberTemplates', 'Precompile Ember Handlebars templates', function() {
    var files = grunt.file.expandFiles(this.file.src);
    grunt.utils._.each(files, function(file) {
      grunt.helper('precompileTemplate', file, this.dest);
    }, {dest: this.file.dest});
  });

  grunt.registerHelper('precompileTemplate', function(file, dest) {
    // Create a context with the file.
    var context = vm.createContext({
      template: fs.readFileSync(file, 'utf8')
    });

    // Load ember, headless-ly.
    vm.runInContext(headlessEmber, context, 'headless-ember.js');
    vm.runInContext(emberJs, context, 'ember.js');

    // Compile the file inside the context.
    vm.runInContext('tJs = precompileEmberHandlebars(template);', context);

    // Generate code for our new js file.
    var templateName = path.basename(file).replace(/\.hbs/, '');
    var namedTemplateJs = 'Ember.TEMPLATES["' + templateName + '"] = ' +
                          'Ember.Handlebars.template(' + context.tJs + ');';

    // Write it to a similarly-named .js file.
    var out = path.join(dest, templateName + '.js');
    grunt.file.write(out, namedTemplateJs, 'utf8');
    console.log('Precompiled "' + file + '" to "' + out + '"');
  });
};
