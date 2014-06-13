/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dev: ['.dev'],
            dist: ['dist']
        },

        jshint: {
            files: [
                'src/js/**/*.js'
            ],
            gruntfile: {
                files: {
                    gruntfile: ['Gruntfile.js']
                }
            },
            dev: {
                files: {
                    jsx: '.dev/js/**/*.js'
                }
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },

        "bower-install-simple": {
            options: {
                color:       true,
                production:  true,
                directory:   "src/bower_components"
            }
        },

        react: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['js/**/*.jsx'],
                    dest: '.dev/',
                    ext: '.js'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['js/**/*.jsx'],
                    dest: 'dest/',
                    ext: '.js'
                }]
            }
        },

        copy: {
            rootdev: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['bower_components/**', '*.*', 'css/**/*.css', 'js/**/*.js'],
                    dest: '.dev/'
                }]
            },
            root: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['bower_components/**', '*.*', 'css/**/*.css', 'js/**/*.js'],
                    dest: 'dist/'
                }]
            }
        },

        connect: {
            dev: {
                options: {
                    port: 5456,
                    hostname: 'localhost',
                    base: '.dev/',
                    livereload: true,
                    open: {
                        target: 'http://localhost:5456/',
                        appName: 'open'
                    }
                }
            }
        },

        watch: {
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile'],
                interrupt: true
            },
            jsx: {
                files: ['src/js/**/*.jsx'],
                tasks: ['react:dev', 'jshint'],
                interrupt: true
            },
            jsxcheck: {
                files: ['.dev/js/**/*.js'],
                tasks: ['jshint'],
                interrupt: true,
                livereload: false
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint'],
                interrupt: true
            },
            root: {
                files: ['src/*.*', 'src/css/**/*.css', 'src/js/**/*.js'],
                tasks: ['copy:rootdev'],
                interrupt: true
            },
            options: {
                livereload: true,
                livereloadOnError: false,
                spawn: false
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dev', [
        'bower-install-simple',
        'clean:dev',
        'jshint',
        'react:dev',
        'copy:rootdev'
    ]);

    grunt.registerTask('default', [
        'dev',
        'connect',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'bower-install-simple',
        'clean:dist',
        'jshint',
        'react:dist',
        'copy:root'
    ]);

};
