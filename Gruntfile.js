module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['<%= coffee.compile.files %>'],
      tasks: ['coffee', 'concat', 'uglify']
    },

    coffee: {
      compile: {
        files: {
          'src/main.js': 'src/main.coffee', // 1:1 compile
          'src/widget.js': 'src/widget.coffee',
          'src/engine.js': ['src/engine/*.coffee'] // compile and concat into single file
        }
      },

      compileBare: {
        options: {
          bare: true
        },
        files: {
          'src/main.js': 'src/main.coffee', // 1:1 compile
          'src/widget.js': 'src/widget.coffee',
          'src/engine.js': ['src/engine/*.coffee'] // compile and concat into single file
        }
      },

      compileJoined: {
        options: {
          join: true
        },
        files: {
          'src/main.js': 'src/main.coffee', // 1:1 compile
          'src/widget.js': 'src/widget.coffee',
          'src/engine.js': ['src/engine/*.coffee'] // compile and concat into single file
        }
      }
    },

    concat: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      'build/<%= pkg.name %>.js': ['src/*.js'],
      'build/<%= pkg.name %>-<%= pkg.version %>.js': ['src/*.js']
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },

    clean: {
      folder: ['src/*.js', 'src/*.js.map', 'src/*.src.coffee']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'clean']);
};
