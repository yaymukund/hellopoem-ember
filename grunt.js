module.exports = function(grunt) {
  var files = [
    'client/templates/compiled/**/*.js',
    'client/application.js',
    'client/data_store.js',
    'client/models/**/*.js',
    'client/controllers/**/*_controller.js',
    'client/router.js'
  ];

  grunt.initConfig({

    // Metadata that can be used in the rest of this file.
    pkg: '<json:package.json>',

    // Compile ember templates.
    ember_handlebars: {
      all: {
        src: ['client/templates/**/*.hbs'],
        dest: 'client/templates/compiled'
      }
    },

    // Concatenate all the files.
    concat: {
      all: {
        src: files,
        dest: 'server/public/vendor/<%= pkg.name %>.js'
      }
    },

    // Watch for changes.
    watch: {
      client: {
        files: files.concat(['client/templates/**/*.hbs']),
        tasks: 'default'
      }
    }

    // TODO: Minify, separate dev and production configs.
  });

  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.registerTask('default', ['ember_handlebars', 'concat']);
};
