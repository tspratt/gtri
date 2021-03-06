'use strict';

module.exports = function (grunt) {
	//require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'style.css': 'scss/style.scss'
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'./dist/{,*/}*'
					]
				}]
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '',
						dest: 'dist',
						src: [
							'app.js',
							'*.html',
							'env-config.js',
							'lib/*.*',
							'style.css'
						]
					}
				]
			}
		},
		replace: {					//environment constants replacements
			dev: {
				options: {
					patterns: [
						{json: grunt.file.readJSON('./config/dev.json')}
					]
				},
				files: [{
					expand: true,
					flatten: true,
					src: ['./config/env-config.js'],
					dest: './'
				}]
			},
			/*//included to demonstrate pattern*/
			qa: {
				options: {
					patterns: [{
						json: grunt.file.readJSON('./config/qa.json')
					}]
				},
				files: [{
					expand: true,
					flatten: true,
					src: ['./config/env-config.js'],
					dest: './'
				}]
			}
		}
	});

	grunt.registerTask('default', [
		'sass:dev',
		'replace:dev'
	]);

	//included to demonstrate pattern
	grunt.registerTask('build_qa', [
		'sass:qa',
		'replace:qa'
	]);

	grunt.registerTask('build_dist', [
		'sass:dev',
		'replace:dev',
		'clean:dist',
		'copy:dist'
	]);
};