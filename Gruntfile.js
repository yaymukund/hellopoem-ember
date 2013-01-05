var path = require('path');

module.exports = function(grunt) {

  var filenameWithoutExtension = function(filename) {
    return path.basename(filename, path.extname(filename));
  };

  // TODO: Minify, separate dev and production configs.

  grunt.initConfig({

    // Compile ember templates.
    handlebars: {
      options: {
        wrapped: true,
        namespace: 'Ember.TEMPLATES',
        processName: filenameWithoutExtension,
        processPartialName: filenameWithoutExtension
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
          '<%= handlebars.all.dest %>',
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
          '<%= concat.all.src %>',
          '<%= handlebars.all.src %>'
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
          '<%= concat.all.dest %>'
        ],

        tasks: ['flushredis', 'simplemocha']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-flush-redis');

  grunt.registerTask('build', ['handlebars', 'concat:server_utils', 'concat:client_utils', 'concat:client']);
  grunt.registerTask('default', ['build', 'simplemocha']);
};
