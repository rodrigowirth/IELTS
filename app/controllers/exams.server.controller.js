'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Exam = mongoose.model('Exam'),
    Applicant = mongoose.model('Applicant'),
	_ = require('lodash');

/**
* Get the error message from error object
*/
var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Exam already exists';
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
 * Create a exam
 */
exports.create = function (req, res) {    
    var exam = new Exam(req.body);
    exam.user = req.user;    

    exam.save(function (err) {

        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(exam);
        }
    });
};

/**
 * Show the current exam
 */
exports.read = function (req, res) {
    console.log(req.exam);
    res.jsonp(req.exam);
};

/**
 * Update an exam
 */
exports.update = function (req, res) {
    console.log(req.exam);
    console.log(req.body);

    var exam = req.exam;
    exam = _.assign(exam, req.body);
    
    

    exam.save(function (err) {
        if (err) {
            console.log(err);
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(exam);
        }
    });

};

/**
 * Delete an exam
 */
exports.delete = function (req, res) {    
    var exam = req.exam;

    exam.remove(function (err) {
        if (err) {            
            return res.send(400, {                
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(exam);
        }
    });
};

/**
 * List of Exams
 */
exports.list = function (req, res) {    
    Exam.find()
        .populate('user', 'displayName')
        .populate('applicant', 'name')
        .exec(function (err, exams) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(exams);
        }

    });
};

/**
* List of Exmas for an Edition
*/
exports.listByEdition = function (req, res) {
    var editionId = req.param('id');

    Exam.find({'edition' : editionId})
        .populate('applicant', 'name')
        .sort('name')
        .exec(function (err, exams) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(exams);
            }
        });
};

/**
 * Exam middleware
 */
exports.examByID = function (req, res, next, id) {
    Exam.findById(id)
        .populate('user', 'displayName')
        .populate('applicant', 'name')
        .exec(function (err, exam) {
        if (err)
            return next(err);

        if (!exam)
            return next(new Error('Failed to load exam ' + id));

        req.exam = exam;
        next();
    });
};

/**
 * Edition authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    next();
};

