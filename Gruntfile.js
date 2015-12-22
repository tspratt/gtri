'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-sass');

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
		//environment constants replacements
		replace: {
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

};