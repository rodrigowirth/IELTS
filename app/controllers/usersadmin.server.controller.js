'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),    
	_ = require('lodash');

var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'User already exists';
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

exports.create = function (req, res) {
    var user = new User(req.body);
   
    user.save(function (err) {

        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

exports.read = function (req, res) {
    res.jsonp(req.user);
};

exports.update = function (req, res) {
    var user = req.user;
    user = _.assign(user, req.body);

    user.save(function (err) {
        if (err) {
            console.log(err);
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });

};

exports.delete = function (req, res) {
    var user = req.User;

    User.find({ user: user._id })
        .remove(function (err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            }
        });

    user.remove(function (err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

exports.list = function (req, res) {
    User.find().sort('-firstName').exec(function (err, users) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(users);
        }

    });
};

exports.userByID = function (req, res, next, id) {
    User.findById(id).exec(function (err, user) {
        if (err)
            return next(err);

        if (!user)
            return next(new Error('Failed to load user ' + id));

        req.user = user;
        next();
    });
};

exports.hasAuthorization = function (req, res, next) {
    next();
};