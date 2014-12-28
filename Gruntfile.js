module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {

            options: {
                jshintrc: '.jshintrc',
                ignores:['app/bower_components/**/*.js', 'app/lib/**/*.js']
            },
            all: {
                src:['Gruntfile.js', 'server.js', 'app/**/*.js']
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass']
            },
            js: {
                files: ['Gruntfile.js', 'server.js', 'app/**/*.js'],
                tasks: ['jshint']
            }
        },
        sass: {
            dist: {
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'watch']);
};
