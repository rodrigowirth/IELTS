'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	applicants = require('../../app/controllers/applicants');

module.exports = function (app) {
    // Article Routes
    app.route('/applicants')
		.get(applicants.list)
		.post(users.requiresLogin, applicants.create);
    
    app.route('/applicants/edition/:id')
        .get(applicants.listAvailablesForEdition);

    app.route('/applicants/:applicantId')
		.get(applicants.read)
		.put(users.requiresLogin, applicants.hasAuthorization, applicants.update)
		.delete(users.requiresLogin, applicants.hasAuthorization, applicants.delete);    

    // Finish by binding the article middleware
    app.param('applicantId', applicants.applicantByID);
};