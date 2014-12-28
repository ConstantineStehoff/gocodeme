module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    //require('grunt-contrib-concat')(grunt);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
          options: {
            // define a string to put between each file in the concatenated output
            separator: ';'
          },
          dist: {
            // the files to concatenate
            src: ['scripts/*.js', 'scripts/controllers/*.js'],
            // the location of the resulting JS file
            dest: 'dist/scripts/main.js'
          }
        },
        bower_concat:{
            all: {
                dest: 'scripts/_bower.js',
                //cssDest: 'sass/_bower.scss',
                include: [
                    'angularjs'
                ],
                bowerOptions:{
                    relative: false
                }
            }
        },
        jshint: {

            options: {
                jshintrc: '.jshintrc',
                ignores:['app/bower_components/**/*.js', 'app/lib/**/*.js']
            },
            all: {
                src:['Gruntfile.js', 'scripts/*.js']
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

    grunt.registerTask('default', ['bower_concat', 'concat', 'sass', 'watch']);
};
