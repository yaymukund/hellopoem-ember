module.exports = function(grunt) {
  var client_files = [
    'client/application.js',
    'client/data_store.js',
    'client/models/**/*.js',
    'client/controllers/**/*_controller.js',
    'client/router.js'
  ];

  var server_files = [
    'server/*.js',
    'server/controllers/**/*.js',
    'server/models/**/*.js',
    'server/views/**/*.js'
  ];

  var template_files = ['client/templates/**/*.hbs'];
  var compiled_templates = ['client/templates/compiled/**/*.js'];
  var test_files = ['server/test/**/*.js', 'client/test/**/*.js'];

  grunt.initConfig({

    // Metadata that can be used in the rest of this file.
    pkg: '<json:package.json>',

    // Compile ember templates.
    ember_handlebars: {
      all: {
        src: template_files,
        dest: 'client/templates/compiled'
      }
    },

    // Concatenate all the client_files.
    concat: {
      all: {
        src: client_files.concat(compiled_templates),
        dest: 'server/public/vendor/<%= pkg.name %>.js'
      }
    },

    // Run tests.
    mocha: {
      all: {
        src: test_files,
        options: {
          ui: 'bdd',
          reporter: 'tap'
        }
      }
    },

    // Watch for changes.
    watch: {
      client: {
        files: client_files.concat(template_files),
        tasks: 'build'
      },

      test: {
        files: server_files.concat(test_files, client_files, compiled_templates),
        tasks: 'mocha'
      }
    }

    // TODO: Minify, separate dev and production configs.
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-ember-handlebars');

  grunt.registerTask('build', ['ember_handlebars', 'concat']);
  grunt.registerTask('default', ['build', 'mocha']);
};
