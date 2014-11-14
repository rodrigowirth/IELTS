'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	usersadmin = require('../../app/controllers/usersadmin');

module.exports = function (app) {
    // Edition Routes
    app.route('/usersadmin')
		.get(usersadmin.list)
		.post(usersadmin.create);

    app.route('/usersadmin/:userId')
		.get(usersadmin.read)
		.put(users.requiresLogin, usersadmin.hasAuthorization, usersadmin.update)
		.delete(users.requiresLogin, usersadmin.hasAuthorization, usersadmin.delete);

    //Finish by biding the edition middleware
    app.param('userId', usersadmin.userByID);
};