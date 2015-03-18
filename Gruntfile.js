module.exports = function (grunt) {
	'use strict';

	// Load all grunt tasks
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			all: ['assets/js/*.js']
		},

		uglify: {
			build: {
				src : 'assets/js/main.js',
				dest: 'assets/js/build/main.min.js'
			}
		},

		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed'
				},
				files  : [{
					expand: true,
					cwd   : 'assets/scss/',
					src   : ['*.scss'],
					dest  : 'assets/css/',
					ext   : '.css'
				}]
			}
		},

		watch: {
			css    : {
				files  : ['assets/scss/**/*.scss', 'assets/scss/*.scss'],
				tasks  : ['sass'],
				options: {
					debounceDelay: 500
				}
			},
			scripts: {
				files  : ['assets/js/*.js'],
				tasks  : ['uglify', 'jshint'],
				options: {
					spawn: false
				}
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Default task.
	grunt.registerTask( 'default', ['uglify', 'jshint'] );

	grunt.util.linefeed = '\n';
};