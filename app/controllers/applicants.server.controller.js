'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Applicant = mongoose.model('Applicant'),
    Exam = mongoose.model('Exam'),
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
                message = 'Applicant already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a applicant
 */
exports.create = function (req, res) {
    var applicant = new Applicant(req.body);
    applicant.user = req.user;

    applicant.save(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(applicant);
        }
    });
};

/**
 * Show the current applicant
 */
exports.read = function (req, res) {
    res.jsonp(req.applicant);
};

/**
 * Update a applicant
 */
exports.update = function (req, res) {
    var applicant = req.applicant;

    applicant = _.assign(applicant, req.body);

    applicant.save(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(applicant);
        }
    });
};

/**
 * Delete an applicant
 */
exports.delete = function (req, res) {
    var applicant = req.applicant;

    Exam.find({ applicant: applicant._id })
        .remove(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            }
        });

    applicant.remove(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(applicant);
        }
    });
};

/**
 * List of Applicants
 */
exports.list = function (req, res) {
    Applicant.find().sort('-created')
        .populate('user', 'displayName')
        .exec(function (err, applicants) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(applicants);
            }
        });
};

/**
 * List of availables applicants for an edition
 */
function filterUsedApplicants(req, res, applicants, exams) {
    var filteredApplicants;
    exams.forEach(function (exam) {
        if (exams.applicant !== null) {
            applicants = applicants.filter(function (applicant) {
                return !applicant._id.equals(exam.applicant._id);
            });
        }

    });

    res.jsonp(applicants);
}

function loadExams(req, res, editionId, applicants) {
    var exams;

    Exam.find({ edition: editionId })
        .populate('applicant', '_id')
        .exec(function (err, result) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                exams = result;
                filterUsedApplicants(req, res, applicants, exams);
            }
        });
}

exports.listAvailablesForEdition = function (req, res) {
    var editionId = req.param('id');

    var applicants;

    Applicant.find()
        .sort('name')
        .exec(function (err, result) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                applicants = result;
                loadExams(res, res, editionId, applicants);
            }
        });
};

/**
 * Applicant middleware
 */
exports.applicantByID = function (req, res, next, id) {
    Applicant.findById(id).populate('user', 'displayName').exec(function (err, applicant) {
        if (err)
            return next(err);

        if (!applicant)
            return next(new Error('Failed to load article ' + id));

        req.applicant = applicant;
        next();
    });
};

/**
 * Applicant authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    next();
};