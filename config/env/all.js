'use strict';

module.exports = {
	app: {
		title: 'Tribalingua App',
		description: 'Y',
		keywords: 'Tribalingua, IELTS, Bravi'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			    'public/lib/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
			    'public/lib/jquery-ui-1.10.4.custom/js/jquery-1.10.2.js',
			    'public/lib/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js',
			    'public/lib/chartjs/Chart.min.js',
			    'public/lib/angles/angles.js',
			    'public/lib/d3/d3.min.js',
			    'public/lib/angular-charts/dist/angular-charts.min.js',
			    'public/lib/rsvp/rsvp.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};