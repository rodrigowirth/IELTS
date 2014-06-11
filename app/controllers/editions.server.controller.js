'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Edition = mongoose.model('Edition'),
	_ = require('lodash');

/**
* Get the error message from error object
*/
var getErrorMessage = function(err) {
 	var message = '';

 	if (err.code) {
 		switch (err.code) {
	 		case 11000:
	 		case 11001:
	 			message = 'Edition already exists';
	 			break;
			default:
				message = 'Something went wrong';
		}
 	} else {
 		for (var errName in err.errors) {
 			if (err.errors[errName].message)
 				message = err.errors[errName].message;
 		}
 	}

 	return message;
 };

 /**
  * Create an edition
  */
exports.create = function(req, res) {
	var edition = new Edition(req.body);
	edition.user = req.user;
	console.log(edition);
	edition.save(function(err) {
	
		if (err) {			
			return res.send(400, {				
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(edition);
		}
	});
};

/**
 * Show the current edition
 */
exports.read = function(req, res) {
	res.jsonp(req.edition);
};

/**
 * Update an edition
 */
exports.update = function(req, res) {
	var edition = req.editiion;

	edition = _.assign(edition, req.body);

	edition.save(function(err){
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(edition);
		}
	});

};

/**
 * Delete an edition
 */
exports.delete = function(req, res) 
{
	var edition = req.edition;

	edition.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(edition);
		}
	});
};

/**
 * List of Editions
 */
exports.list = function(req, res) {
	Edition.find().sort('-date').populate('user', 'displayName').exec(function(err, editions) {
		if (err){
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(editions);
		}

	});
};

/**
 * Edition middleware
 */
exports.editionByID = function(req, res, next, id)
{
	Edition.findById(id).populate('user', 'displayName').exec(function(err, edition) {
		if (err)
			return next(err);

		if (!edition)
			return next(new Error('Failed to load edition ' + id));

		req.edition = edition;
		next();
	});
};

/**
 * Edition authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	next();
};

