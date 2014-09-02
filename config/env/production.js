'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/ielts',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css'
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/jquery-ui-1.10.4.custom/js/jquery-1.10.2.js',
		    'public/lib/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min.js',
		    'public/lib/chartjs/Chart.min.js',
		    'public/lib/angles/angles.js',
		    'public/lib/d3/d3.min.js',
		    'public/lib/angular-charts/dist/angular-charts.min.js',
		    'public/lib/rsvp/rsvp.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js',
		build: {
			css: [
				'public/modules/**/css/*.css'
			],
			js: [
				'public/config.js',
				'public/application.js',
				'public/modules/*/*.js',
				'public/modules/*/*[!tests]*/*.js'
			]
		}
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
	    clientID: process.env.GOOGLE_ID || '328279314354-oskdj2cu2k6199ildi7bjdur59e38bk8.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '0htpChQEEavbyFmOs4G2ThBh',
		callbackURL: 'https://tribalingua.bravi.com.br/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};