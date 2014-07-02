'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	exams = require('../../app/controllers/exams');

module.exports = function (app) {
    // Exam Routes
    app.route('/exams')
		.get(exams.list)
		.post(exams.create);

    app.route('/exams/edition/:id')
        .get(exams.listByEdition);

    app.route('/exams/:examId')
		.get(exams.read)
		.put(users.requiresLogin, exams.hasAuthorization, exams.update)
		.delete(users.requiresLogin, exams.hasAuthorization, exams.delete);

    //Finish by biding the exam middleware
    app.param('examId', exams.examByID);
};