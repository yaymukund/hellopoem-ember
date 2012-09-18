module.exports = function(grunt) {

  // TODO: Minify, separate dev and production configs.

  grunt.initConfig({

    // Metadata that can be used in the rest of this file.
    pkg: '<json:package.json>',

    // Normally, we'd be able to use Grunt's `json` directive but it's
    // evaluated after the config directive is evaluated. I think this is a bug.
    paths: require('./paths'),

    // Compile ember templates.
    ember_handlebars: {
      all: {
        src: '<config:paths.template.source>',
        dest: '<config:paths.template.compile_directory>'
      }
    },

    // Concatenate all the client_files.
    concat: {
      all: {
        src: [
          '<config:paths.client>',
          '<config:paths.template.compiled>'
        ],

        dest: '<config:paths.app>'
      }
    },

    // Run tests.
    mocha: {
      all: {
        src: '<config:paths.test>',
        options: {
          ui: 'bdd',
          reporter: 'tap'
        }
      }
    },

    // Watch for changes.
    watch: {
      client: {
        files: [
          '<config:paths.client>',
          '<config:paths.template.source>'
        ],

        tasks: 'build'
      },

      test: {
        files: [
          '<config:paths.server>',
          '<config:paths.test>',
          '<config:paths.app>'
        ],

        tasks: 'mocha'
      }
    }
  });

  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['ember_handlebars', 'concat']);
  grunt.registerTask('default', ['build', 'mocha']);
};
