module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src:    'script/*.js',
                dist:   'dist/scripts/main.js'
            }
        },
        jshint: {

            options: {
                jshintrc: '.jshintrc',
                ignores:['app/bower_components/**/*.js', 'app/lib/**/*.js']
            },
            all: {
                src:['Gruntfile.js', 'app/**/*.js']
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass']
            },
            js: {
                files: ['Gruntfile.js', 'scripts/*.js'],
                tasks: ['jshint']
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/css/main.css': 'sass/main.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['concat', 'sass', 'watch']);
};
