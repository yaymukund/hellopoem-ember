module.exports = function(grunt) {

  // TODO: Minify, separate dev and production configs.

  grunt.initConfig({

    // Compile ember templates.
    handlebars: {
      options: {
        wrapped: true,
        namespace: 'Ember.TEMPLATES'
      },

      all: {
        src: 'client/templates/**/*.hbs',
        dest: 'tmp/templates.js'
      }
    },

    // Concatenate all the client_files.
    concat: {
      all: {
        src: [
          'shared/util.js',
          'client/application.js',
          'client/models/**/*.js',
          'client/store.js',
          'client/controllers/**/*_controller.js',
          'client/router.js',
          '<%= handlebars.all.dest %>'
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

  grunt.registerTask('build', ['handlebars', 'concat']);
  grunt.registerTask('default', ['build', 'simplemocha']);
};
