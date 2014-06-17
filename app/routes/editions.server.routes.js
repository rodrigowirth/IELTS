'use strict';

/**
 * Module dependencies.
 */ 
var users = require('../../app/controllers/users'),
	editions = require('../../app/controllers/editions');

module.exports = function(app) {
	// Edition Routes
	app.route('/editions')
		.get(editions.list)
		.post(editions.create);

	app.route('/editions/:editionId')
		.get(editions.read)
		.put(users.requiresLogin, editions.hasAuthorization, editions.update)
		.delete(users.requiresLogin, editions.hasAuthorization, editions.delete);

	//Finish by biding the edition middleware
	app.param('editionId', editions.editionByID);
};