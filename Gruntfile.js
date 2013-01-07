var path = require('path');

module.exports = function(grunt) {

  // TODO: Minify, separate dev and production configs.

  grunt.initConfig({

    // Compile ember templates.
    ember_templates: {
      options: {
        templateName: function(filename) {
          return path.basename(filename, path.extname(filename));
        }
      },

      all: {
        src: 'client/templates/**/*.hbs',
        dest: 'tmp/templates.js'
      }
    },

    // Concatenate all the client_files.
    concat: {
      client_utils: {
        src: [
          'util/head.js',
          'util/shared/*.js',
          'util/client/*.js'
        ],

        dest: 'tmp/client_utils.js'
      },

      server_utils: {
        src: [
          'util/head.js',
          'util/shared/*.js',
          'util/server/*.js',
          'util/server_tail.js'
        ],

        dest: 'util/server_index.js'
      },

      client: {
        src: [
          '<%= ember_templates.all.dest %>',
          'client/application.js',
          '<%= concat.client_utils.dest %>',
          'client/models/**/*.js',
          'client/store.js',
          'client/controllers/**/*_controller.js',
          'client/router.js'
        ],

        dest: 'server/public/vendor/hellopoem.js'
      }
    },

    // Run tests.
    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'tap'
      },

      all: {
        src: [
          "server/test/**/*_test.js",
          "client/test/**/*_test.js"
        ]
      }
    },

    // Watch for changes.
    watch: {
      client: {
        files: [
          '<%= concat.client.src %>',
          '<%= concat.client_utils.src %>',
          '<%= concat.server_utils.src %>',
          '<%= ember_templates.all.src %>'
        ],

        tasks: 'build'
      },

      test: {
        files: [
          // Server files.
          "shared/*.js",
          "server/*.js",
          "server/controllers/**/*.js",
          "server/models/**/*.js",
          "server/views/**/*.js",

          '<%= simplemocha.all.src %>',
          '<%= concat.client.dest %>'
        ],

        tasks: ['flushredis', 'simplemocha']
      }
    }
  });

  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-flush-redis');

  grunt.registerTask('build', ['ember_templates', 'concat:server_utils', 'concat:client_utils', 'concat:client']);
  grunt.registerTask('default', ['build', 'simplemocha']);
};
