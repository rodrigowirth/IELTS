'use strict';

module.exports = {
	db: 'mongodb://localhost/ielts-dev',
	app: {
		title: 'Tribalingua App - Development Environment'
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
	    clientID: process.env.GOOGLE_ID || '328279314354-bv2uakogpke1gfp8ud35jsrqesckiakp.apps.googleusercontent.com',
	    clientSecret: process.env.GOOGLE_SECRET || '2nqjMuEfD_D9Un7gvAgKEvvx',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};